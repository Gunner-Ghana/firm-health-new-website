import { useScrollAnimation, useMultipleScrollAnimation } from '../hooks/useScrollAnimation';
import { useAppDispatch, useVolunteerState } from '../hooks/useRedux';
import { updateField, toggleSkill, resetForm, clearSubmitError, submitVolunteer } from '../store/slices/volunteerSlice';
import './VolunteerSignup.css';

function VolunteerSignup() {
  const dispatch = useAppDispatch();
  const { formData, isSubmitted, isSubmitting, submitError } = useVolunteerState();

  const [heroRef, heroVisible] = useScrollAnimation({ threshold: 0.2 });
  const [formRef, formVisible] = useScrollAnimation();
  const [infoTitleRef, infoTitleVisible] = useScrollAnimation();
  const [setOpportunityRef, visibleOpportunities] = useMultipleScrollAnimation(3);

  const skillOptions = [
    'Medical/Healthcare',
    'Teaching/Education',
    'Administration',
    'Logistics',
    'Translation',
    'IT/Technology',
    'Fundraising',
    'Marketing/Communications'
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    dispatch(updateField({ field: name, value }));
  };

  const handleSkillChange = (skill) => {
    dispatch(toggleSkill(skill));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(clearSubmitError());
    dispatch(submitVolunteer(formData));
  };

  const handleNewApplication = () => {
    dispatch(resetForm());
  };

  if (isSubmitted) {
    return (
      <div className="volunteer">
        <div className="success-message animate-scale-up">
          <h1>Thank You for Signing Up!</h1>
          <p>We have received your volunteer application. Our team will review your information and contact you within 5-7 business days.</p>
          <p>In the meantime, feel free to follow us on social media for updates on our programs and events.</p>
          <button onClick={handleNewApplication} className="submit-btn" style={{ marginTop: '1rem' }}>
            Submit Another Application
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="volunteer">
      <section
        className={`volunteer-hero ${heroVisible ? 'animate-fade-in' : 'animate-hidden'}`}
        ref={heroRef}
      >
        <h1>Become a Volunteer</h1>
        <p>Join our community of changemakers and help us bring healthcare to those who need it most.</p>
      </section>

      <section className="volunteer-content">
        <div className="volunteer-info">
          <h2
            ref={infoTitleRef}
            className={infoTitleVisible ? 'animate-fade-up' : 'animate-hidden'}
          >
            Why Volunteer With Us?
          </h2>
          <ul className={infoTitleVisible ? 'animate-fade-up' : 'animate-hidden'} style={{ transitionDelay: '100ms' }}>
            <li>Make a direct impact on communities in need</li>
            <li>Gain valuable experience in global health initiatives</li>
            <li>Work alongside dedicated professionals and like-minded individuals</li>
            <li>Flexible opportunities for both local and international involvement</li>
            <li>Receive training and support throughout your volunteer journey</li>
          </ul>

          <h2 className={infoTitleVisible ? 'animate-fade-up' : 'animate-hidden'} style={{ transitionDelay: '200ms' }}>
            Volunteer Opportunities
          </h2>
          <div className="opportunities">
            {[
              { title: 'Medical Missions', description: 'Join healthcare teams on field missions to provide direct medical care.' },
              { title: 'Community Education', description: 'Help conduct health awareness workshops and training sessions.' },
              { title: 'Remote Support', description: 'Contribute your skills from anywhere through virtual volunteering.' },
            ].map((opportunity, index) => (
              <div
                key={index}
                ref={setOpportunityRef(index)}
                className={`opportunity ${visibleOpportunities.has(index) ? 'animate-slide-right' : 'animate-hidden'}`}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <h3>{opportunity.title}</h3>
                <p>{opportunity.description}</p>
              </div>
            ))}
          </div>
        </div>

        <div
          ref={formRef}
          className={`volunteer-form-container ${formVisible ? 'animate-fade-up' : 'animate-hidden'}`}
        >
          <h2>Volunteer Application Form</h2>
          {submitError && (
            <div className="error-message" style={{ color: '#dc2626', backgroundColor: '#fef2f2', padding: '1rem', borderRadius: '0.5rem', marginBottom: '1rem' }}>
              {submitError}
            </div>
          )}
          <form onSubmit={handleSubmit} className="volunteer-form">
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="firstName">First Name *</label>
                <input
                  type="text"
                  id="firstName"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="lastName">Last Name *</label>
                <input
                  type="text"
                  id="lastName"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="email">Email Address *</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="phone">Phone Number</label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="occupation">Current Occupation *</label>
              <input
                type="text"
                id="occupation"
                name="occupation"
                value={formData.occupation}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label>Skills & Expertise (select all that apply)</label>
              <div className="skills-grid">
                {skillOptions.map(skill => (
                  <label key={skill} className="skill-checkbox">
                    <input
                      type="checkbox"
                      checked={formData.skills.includes(skill)}
                      onChange={() => handleSkillChange(skill)}
                    />
                    <span>{skill}</span>
                  </label>
                ))}
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="availability">Availability *</label>
              <select
                id="availability"
                name="availability"
                value={formData.availability}
                onChange={handleChange}
                required
              >
                <option value="">Select your availability</option>
                <option value="weekends">Weekends only</option>
                <option value="weekdays">Weekdays only</option>
                <option value="flexible">Flexible schedule</option>
                <option value="fulltime">Full-time (for missions)</option>
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="experience">Previous Volunteer Experience</label>
              <textarea
                id="experience"
                name="experience"
                rows="3"
                value={formData.experience}
                onChange={handleChange}
                placeholder="Tell us about any previous volunteer or relevant experience..."
              ></textarea>
            </div>

            <div className="form-group">
              <label htmlFor="motivation">Why do you want to volunteer with us? *</label>
              <textarea
                id="motivation"
                name="motivation"
                rows="4"
                value={formData.motivation}
                onChange={handleChange}
                required
                placeholder="Share your motivation for joining HealthFirst NGO..."
              ></textarea>
            </div>

            <button type="submit" className="submit-btn" disabled={isSubmitting}>
              {isSubmitting ? 'Submitting...' : 'Submit Application'}
            </button>
          </form>
        </div>
      </section>
    </div>
  );
}

export default VolunteerSignup;
