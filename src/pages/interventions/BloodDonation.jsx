import { useScrollAnimation, useMultipleScrollAnimation } from '../../hooks/useScrollAnimation';
import '../../styles/PageLayout.css';

function BloodDonation() {
  const [heroRef, heroVisible] = useScrollAnimation({ threshold: 0.2 });
  const [introRef, introVisible] = useScrollAnimation();
  const [setStepRef, visibleSteps] = useMultipleScrollAnimation(4);

  const donationProcess = [
    {
      step: '1',
      title: 'Registration',
      description: 'Complete a simple registration form with your basic information and medical history.',
    },
    {
      step: '2',
      title: 'Health Screening',
      description: 'Quick health check including blood pressure, hemoglobin levels, and general wellness assessment.',
    },
    {
      step: '3',
      title: 'Donation',
      description: 'The actual donation takes only 8-10 minutes. Our trained staff ensure your comfort throughout.',
    },
    {
      step: '4',
      title: 'Refreshments',
      description: 'Enjoy complimentary refreshments while you rest for 10-15 minutes before leaving.',
    },
  ];

  return (
    <div className="page-container">
      <section
        className={`page-hero ${heroVisible ? 'animate-fade-in' : 'animate-hidden'}`}
        ref={heroRef}
        style={{ background: 'linear-gradient(135deg, #dc2626 0%, #ef4444 50%, #f87171 100%)' }}
      >
        <h1>Quarterly Blood Donation</h1>
        <p>Saving lives one donation at a time through our regular blood donation drives.</p>
      </section>

      <section className="page-content">
        <div
          className={`intro-text ${introVisible ? 'animate-fade-up' : 'animate-hidden'}`}
          ref={introRef}
        >
          <p>
            Every three months, HealthFirst NGO organizes community blood donation drives to address
            the critical shortage of blood supplies in local healthcare facilities. Blood transfusions
            save millions of lives every year, and your donation can make the difference between life
            and death for someone in need.
          </p>
          <p>
            Our blood donation events are conducted in partnership with certified blood banks and
            follow strict international safety standards. Whether you're a first-time donor or a
            regular contributor, we welcome you to join this life-saving initiative.
          </p>
        </div>

        <div className="stats-section">
          <div className="stat-item">
            <p className="stat-number" style={{ color: '#ef4444' }}>5000+</p>
            <p className="stat-label">Units Collected</p>
          </div>
          <div className="stat-item">
            <p className="stat-number" style={{ color: '#ef4444' }}>15K+</p>
            <p className="stat-label">Lives Impacted</p>
          </div>
          <div className="stat-item">
            <p className="stat-number" style={{ color: '#ef4444' }}>40+</p>
            <p className="stat-label">Drives Completed</p>
          </div>
          <div className="stat-item">
            <p className="stat-number" style={{ color: '#ef4444' }}>10</p>
            <p className="stat-label">Partner Hospitals</p>
          </div>
        </div>

        <div className="content-section">
          <h2 className="section-title">Donation Process</h2>
          <p className="section-subtitle">Simple, safe, and takes less than an hour of your time.</p>
          <div className="cards-grid">
            {donationProcess.map((item, index) => (
              <div
                key={index}
                ref={setStepRef(index)}
                className={`info-card ${visibleSteps.has(index) ? 'animate-fade-up' : 'animate-hidden'}`}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <div
                  className="info-card-icon"
                  style={{ background: 'linear-gradient(135deg, rgba(239, 68, 68, 0.15) 0%, rgba(239, 68, 68, 0.08) 100%)' }}
                >
                  <span style={{ color: '#ef4444', fontWeight: '700', fontSize: '1.25rem' }}>{item.step}</span>
                </div>
                <h3>{item.title}</h3>
                <p>{item.description}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="content-section">
          <h2 className="section-title">Who Can Donate?</h2>
          <div className="feature-list">
            <div className="feature-item">
              <div className="feature-icon" style={{ background: 'rgba(239, 68, 68, 0.1)' }}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="#ef4444">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div className="feature-content">
                <h4>Age 18-65 years</h4>
                <p>Healthy individuals within this age range are eligible to donate.</p>
              </div>
            </div>
            <div className="feature-item">
              <div className="feature-icon" style={{ background: 'rgba(239, 68, 68, 0.1)' }}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="#ef4444">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div className="feature-content">
                <h4>Minimum 50kg weight</h4>
                <p>For your safety, donors should weigh at least 50 kilograms.</p>
              </div>
            </div>
            <div className="feature-item">
              <div className="feature-icon" style={{ background: 'rgba(239, 68, 68, 0.1)' }}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="#ef4444">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div className="feature-content">
                <h4>Good general health</h4>
                <p>No recent illness, infections, or chronic health conditions.</p>
              </div>
            </div>
            <div className="feature-item">
              <div className="feature-icon" style={{ background: 'rgba(239, 68, 68, 0.1)' }}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="#ef4444">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div className="feature-content">
                <h4>56 days since last donation</h4>
                <p>Allow your body to fully recover between donations.</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default BloodDonation;
