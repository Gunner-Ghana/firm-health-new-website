import { useScrollAnimation, useMultipleScrollAnimation } from '../hooks/useScrollAnimation';
import './AboutUs.css';

function AboutUs() {
  const [heroRef, heroVisible] = useScrollAnimation({ threshold: 0.2 });
  const [aboutRef, aboutVisible] = useScrollAnimation();
  const [setMissionVisionRef, visibleMissionVision] = useMultipleScrollAnimation(2);
  const [valuesTitleRef, valuesTitleVisible] = useScrollAnimation();
  const [setValueCardRef, visibleValueCards] = useMultipleScrollAnimation(6);
  const [collaborationTitleRef, collaborationTitleVisible] = useScrollAnimation();
  const [setCollabRef, visibleCollabs] = useMultipleScrollAnimation(6);
  const [goalsTitleRef, goalsTitleVisible] = useScrollAnimation();
  const [setGoalRef, visibleGoals] = useMultipleScrollAnimation(3);
  const [achievementsTitleRef, achievementsTitleVisible] = useScrollAnimation();
  const [setAchievementRef, visibleAchievements] = useMultipleScrollAnimation(3);
  const [sponsorsTitleRef, sponsorsTitleVisible] = useScrollAnimation();

  const coreValues = [
    {
      title: 'Compassion',
      description: 'We approach every individual with empathy and understanding, recognizing the dignity inherent in all people.',
      icon: '💚'
    },
    {
      title: 'Integrity',
      description: 'We operate with transparency and accountability in all our programs and use of resources.',
      icon: '🛡️'
    },
    {
      title: 'Collaboration',
      description: 'We believe in the power of partnerships with local communities, governments, and other organizations.',
      icon: '🤝'
    },
    {
      title: 'Sustainability',
      description: 'We focus on long-term solutions that communities can maintain and build upon independently.',
      icon: '🌱'
    },
    {
      title: 'Innovation',
      description: 'We continuously seek new and better ways to address health challenges and deliver services.',
      icon: '💡'
    },
    {
      title: 'Excellence',
      description: 'We strive for the highest standards in healthcare delivery and organizational performance.',
      icon: '⭐'
    },
  ];

  const collaborators = [
    { name: 'Ghana Health Service', logo: 'GHS' },
    { name: 'Ministry of Health', logo: 'MOH' },
    { name: 'World Health Organization', logo: 'WHO' },
    { name: 'UNICEF Ghana', logo: 'UNICEF' },
    { name: 'Red Cross Society', logo: 'RCS' },
    { name: 'Partners in Health', logo: 'PIH' },
  ];

  const goals = [
    {
      type: 'Short Term',
      period: '2026',
      icon: '🎯',
      color: '#10b981',
      items: [
        'Expand community health screening programs to 10 additional districts',
        'Train 200 new community health volunteers',
        'Launch mobile health clinic services in rural areas',
      ]
    },
    {
      type: 'Mid Term',
      period: '2027-2028',
      icon: '📈',
      color: '#3b82f6',
      items: [
        'Establish 5 permanent health centers in underserved regions',
        'Develop comprehensive maternal and child health programs',
        'Create sustainable partnerships with 20 local healthcare facilities',
      ]
    },
    {
      type: 'Long Term',
      period: '2029-2030',
      icon: '🌟',
      color: '#8b5cf6',
      items: [
        'Achieve healthcare coverage for 100,000+ beneficiaries annually',
        'Become a leading health advocacy organization in West Africa',
        'Establish an endowment fund for sustainable program funding',
      ]
    },
  ];

  const achievements = [
    {
      title: 'National Health Screening Campaign 2025',
      description: 'Successfully conducted free health screenings for over 15,000 individuals across 8 regions, detecting early signs of diabetes, hypertension, and other conditions.',
      date: 'March - June 2025',
      impact: '15,000+ screened',
      icon: '🏥'
    },
    {
      title: 'Blood Donation Drive Championship',
      description: 'Organized the largest blood donation drive in Northern Ghana, collecting over 2,500 units of blood and saving countless lives.',
      date: 'August 2025',
      impact: '2,500+ units collected',
      icon: '🩸'
    },
    {
      title: 'Health Education Radio Series',
      description: 'Launched a weekly health education program reaching over 500,000 listeners, covering topics from nutrition to disease prevention.',
      date: 'January 2025 - Present',
      impact: '500,000+ listeners',
      icon: '📻'
    },
  ];

  const sponsors = [
    { name: 'Ghana Health Service', logo: 'GHS' },
    { name: 'Ministry of Health', logo: 'MOH' },
    { name: 'WHO Ghana', logo: 'WHO' },
    { name: 'UNICEF Ghana', logo: 'UNICEF' },
    { name: 'Red Cross Ghana', logo: 'RC' },
    { name: 'Health Partners International', logo: 'HPI' },
    { name: 'African Health Foundation', logo: 'AHF' },
    { name: 'Global Health Initiative', logo: 'GHI' },
  ];

  return (
    <div className="about">
      {/* Hero Banner Section */}
      <section
        className={`about-hero ${heroVisible ? 'animate-fade-in' : 'animate-hidden'}`}
        ref={heroRef}
      >
        <div className="about-hero-background">
          <div className="about-hero-overlay"></div>
        </div>
        <div className="about-hero-content">
          <h1>About Firm Health Foundation</h1>
          <p>Dedicated to creating a healthier Ghana, one community at a time.</p>
        </div>
      </section>

      {/* About Description Section */}
      <section
        className={`about-description ${aboutVisible ? 'animate-fade-up' : 'animate-hidden'}`}
        ref={aboutRef}
      >
        <div className="about-description-content">
          <h2>Who We Are</h2>
          <p>
            Firm Health Foundation is a non-governmental organization committed to improving healthcare access
            and promoting wellness in underserved communities across Ghana. Founded in 2015, we have grown
            from a small group of passionate healthcare advocates to a leading health organization serving
            thousands of Ghanaians annually.
          </p>
          <p>
            Our approach combines direct healthcare services with community education and advocacy. We work
            closely with local communities, healthcare workers, and government agencies to create sustainable
            health solutions that address the unique challenges faced by each community we serve. Through our
            various programs, we aim to bridge the healthcare gap and ensure that quality health services
            reach those who need them most.
          </p>
        </div>
      </section>

      {/* Mission & Vision Section */}
      <section className="mission-vision">
        <div
          ref={setMissionVisionRef(0)}
          className={`mission-vision-card mission ${visibleMissionVision.has(0) ? 'animate-slide-right' : 'animate-hidden'}`}
        >
          <div className="mission-vision-icon">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.59 14.37a6 6 0 01-5.84 7.38v-4.8m5.84-2.58a14.98 14.98 0 006.16-12.12A14.98 14.98 0 009.631 8.41m5.96 5.96a14.926 14.926 0 01-5.841 2.58m-.119-8.54a6 6 0 00-7.381 5.84h4.8m2.581-5.84a14.927 14.927 0 00-2.58 5.84m2.699 2.7c-.103.021-.207.041-.311.06a15.09 15.09 0 01-2.448-2.448 14.9 14.9 0 01.06-.312m-2.24 2.39a4.493 4.493 0 00-1.757 4.306 4.493 4.493 0 004.306-1.758M16.5 9a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z" />
            </svg>
          </div>
          <h2>Our Mission</h2>
          <p>
            To improve the health and well-being of underserved communities in Ghana by providing accessible
            healthcare services, education, and sustainable health solutions that empower individuals and
            families to lead healthier, more productive lives.
          </p>
        </div>
        <div
          ref={setMissionVisionRef(1)}
          className={`mission-vision-card vision ${visibleMissionVision.has(1) ? 'animate-slide-left' : 'animate-hidden'}`}
        >
          <div className="mission-vision-icon">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
          </div>
          <h2>Our Vision</h2>
          <p>
            A Ghana where every person, regardless of their location or economic status, has access to
            quality healthcare and the knowledge to maintain their well-being. We envision thriving
            communities where health is a cornerstone of development and prosperity.
          </p>
        </div>
      </section>

      {/* Core Values Section */}
      <section className="values">
        <h2
          ref={valuesTitleRef}
          className={valuesTitleVisible ? 'animate-fade-up' : 'animate-hidden'}
        >
          Our Core Values
        </h2>
        <p className="section-subtitle">The principles that guide everything we do</p>
        <div className="values-grid">
          {coreValues.map((value, index) => (
            <div
              key={index}
              ref={setValueCardRef(index)}
              className={`value-card ${visibleValueCards.has(index) ? 'animate-scale-up' : 'animate-hidden'}`}
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              <span className="value-icon">{value.icon}</span>
              <h3>{value.title}</h3>
              <p>{value.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Collaboration Section */}
      <section className="collaboration">
        <h2
          ref={collaborationTitleRef}
          className={collaborationTitleVisible ? 'animate-fade-up' : 'animate-hidden'}
        >
          Organizations We Collaborate With
        </h2>
        <p className="section-subtitle">
          Together with our partners, we amplify our impact and reach more communities
        </p>
        <div className="collaboration-grid">
          {collaborators.map((collab, index) => (
            <div
              key={index}
              ref={setCollabRef(index)}
              className={`collaboration-card ${visibleCollabs.has(index) ? 'animate-fade-up' : 'animate-hidden'}`}
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              <div className="collab-logo">{collab.logo}</div>
              <span className="collab-name">{collab.name}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Goals Section */}
      <section className="goals">
        <h2
          ref={goalsTitleRef}
          className={goalsTitleVisible ? 'animate-fade-up' : 'animate-hidden'}
        >
          Our Goals
        </h2>
        <p className="section-subtitle">Strategic objectives driving our mission forward</p>
        <div className="goals-grid">
          {goals.map((goal, index) => (
            <div
              key={index}
              ref={setGoalRef(index)}
              className={`goal-card ${visibleGoals.has(index) ? 'animate-fade-up' : 'animate-hidden'}`}
              style={{
                transitionDelay: `${index * 150}ms`,
                '--goal-color': goal.color
              }}
            >
              <div className="goal-header">
                <span className="goal-icon">{goal.icon}</span>
                <div className="goal-badge" style={{ backgroundColor: `${goal.color}20`, color: goal.color }}>
                  {goal.period}
                </div>
              </div>
              <h3>{goal.type} Goals</h3>
              <ul className="goal-list">
                {goal.items.map((item, i) => (
                  <li key={i}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                    </svg>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* Past Activities & Achievements Section */}
      <section className="achievements">
        <h2
          ref={achievementsTitleRef}
          className={achievementsTitleVisible ? 'animate-fade-up' : 'animate-hidden'}
        >
          Past Activities & Achievements
        </h2>
        <p className="section-subtitle">Milestones that mark our journey of impact</p>
        <div className="achievements-grid">
          {achievements.map((achievement, index) => (
            <div
              key={index}
              ref={setAchievementRef(index)}
              className={`achievement-card ${visibleAchievements.has(index) ? 'animate-slide-right' : 'animate-hidden'}`}
              style={{ transitionDelay: `${index * 150}ms` }}
            >
              <div className="achievement-icon">{achievement.icon}</div>
              <div className="achievement-content">
                <span className="achievement-date">{achievement.date}</span>
                <h3>{achievement.title}</h3>
                <p>{achievement.description}</p>
                <div className="achievement-impact">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z" />
                  </svg>
                  {achievement.impact}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Sponsors Section */}
      <section className="about-sponsors">
        <h2
          ref={sponsorsTitleRef}
          className={sponsorsTitleVisible ? 'animate-fade-up' : 'animate-hidden'}
        >
          Our Partners & Sponsors
        </h2>
        <div className="sponsors-slider">
          <div className="sponsors-track">
            {[...sponsors, ...sponsors].map((sponsor, index) => (
              <div key={index} className="sponsor-item">
                <div className="sponsor-logo">{sponsor.logo}</div>
                <span className="sponsor-name">{sponsor.name}</span>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

export default AboutUs;
