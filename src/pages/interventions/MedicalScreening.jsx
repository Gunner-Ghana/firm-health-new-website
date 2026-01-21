import { useScrollAnimation, useMultipleScrollAnimation } from '../../hooks/useScrollAnimation';
import '../../styles/PageLayout.css';

function MedicalScreening() {
  const [heroRef, heroVisible] = useScrollAnimation({ threshold: 0.2 });
  const [introRef, introVisible] = useScrollAnimation();
  const [setServiceRef, visibleServices] = useMultipleScrollAnimation(6);

  const services = [
    {
      title: 'Blood Pressure Check',
      description: 'Quick and accurate blood pressure monitoring to identify hypertension risks.',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
        </svg>
      ),
    },
    {
      title: 'Blood Sugar Testing',
      description: 'Diabetes screening through random and fasting blood glucose tests.',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 3.104v5.714a2.25 2.25 0 01-.659 1.591L5 14.5M9.75 3.104c-.251.023-.501.05-.75.082m.75-.082a24.301 24.301 0 014.5 0m0 0v5.714c0 .597.237 1.17.659 1.591L19.8 15.3M14.25 3.104c.251.023.501.05.75.082M19.8 15.3l-1.57.393A9.065 9.065 0 0112 15a9.065 9.065 0 00-6.23.693L5 14.5m14.8.8l1.402 1.402c1.232 1.232.65 3.318-1.067 3.611A48.309 48.309 0 0112 21c-2.773 0-5.491-.235-8.135-.687-1.718-.293-2.3-2.379-1.067-3.61L5 14.5" />
        </svg>
      ),
    },
    {
      title: 'Vision Screening',
      description: 'Basic eye examinations and referrals for corrective treatments when needed.',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      ),
    },
    {
      title: 'BMI Assessment',
      description: 'Body mass index calculations with personalized nutrition and exercise advice.',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z" />
        </svg>
      ),
    },
    {
      title: 'Malaria Testing',
      description: 'Rapid diagnostic tests for malaria with immediate treatment for positive cases.',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
        </svg>
      ),
    },
    {
      title: 'General Consultation',
      description: 'One-on-one consultations with healthcare professionals for health concerns.',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
        </svg>
      ),
    },
  ];

  return (
    <div className="page-container">
      <section
        className={`page-hero ${heroVisible ? 'animate-fade-in' : 'animate-hidden'}`}
        ref={heroRef}
      >
        <h1>Community Medical Screening</h1>
        <p>Free health screenings bringing preventive healthcare directly to your community.</p>
      </section>

      <section className="page-content">
        <div
          className={`intro-text ${introVisible ? 'animate-fade-up' : 'animate-hidden'}`}
          ref={introRef}
        >
          <p>
            Our Community Medical Screening programme brings essential health services to underserved
            areas where access to healthcare facilities is limited. Through regular screening events,
            we help identify health issues early, enabling timely intervention and treatment.
          </p>
          <p>
            All screenings are conducted by qualified healthcare professionals and are completely
            free of charge. We believe that everyone deserves access to preventive healthcare,
            regardless of their economic circumstances.
          </p>
        </div>

        <div className="stats-section">
          <div className="stat-item">
            <p className="stat-number">25K+</p>
            <p className="stat-label">People Screened</p>
          </div>
          <div className="stat-item">
            <p className="stat-number">100+</p>
            <p className="stat-label">Screening Events</p>
          </div>
          <div className="stat-item">
            <p className="stat-number">30+</p>
            <p className="stat-label">Communities Reached</p>
          </div>
          <div className="stat-item">
            <p className="stat-number">3000+</p>
            <p className="stat-label">Referrals Made</p>
          </div>
        </div>

        <div className="content-section">
          <h2 className="section-title">Screening Services</h2>
          <p className="section-subtitle">Comprehensive health checks available at every screening event.</p>
          <div className="cards-grid">
            {services.map((service, index) => (
              <div
                key={index}
                ref={setServiceRef(index)}
                className={`info-card ${visibleServices.has(index) ? 'animate-fade-up' : 'animate-hidden'}`}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <div className="info-card-icon">{service.icon}</div>
                <h3>{service.title}</h3>
                <p>{service.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

export default MedicalScreening;
