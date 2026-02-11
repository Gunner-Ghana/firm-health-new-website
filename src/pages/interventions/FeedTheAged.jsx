import { useScrollAnimation, useMultipleScrollAnimation } from '../../hooks/useScrollAnimation';
import '../../styles/PageLayout.css';

function FeedTheAged() {
  const [heroRef, heroVisible] = useScrollAnimation({ threshold: 0.2 });
  const [introRef, introVisible] = useScrollAnimation();
  const [setActivityRef, visibleActivities] = useMultipleScrollAnimation(4);

  const activities = [
    {
      title: 'Nutritious Meals',
      description: 'Providing balanced, culturally appropriate meals designed to meet the nutritional needs of elderly individuals.',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 8.25v-1.5m0 1.5c-1.355 0-2.697.056-4.024.166C6.845 8.51 6 9.473 6 10.608v2.513m6-4.87c1.355 0 2.697.055 4.024.165C17.155 8.51 18 9.473 18 10.608v2.513m-3-4.87v-1.5m-6 1.5v-1.5m12 9.75l-1.5.75a3.354 3.354 0 01-3 0 3.354 3.354 0 00-3 0 3.354 3.354 0 01-3 0 3.354 3.354 0 00-3 0 3.354 3.354 0 01-3 0L3 16.5m15-3.38a48.474 48.474 0 00-6-.37c-2.032 0-4.034.125-6 .37m12 0c.39.049.777.102 1.163.16 1.07.16 1.837 1.094 1.837 2.175v5.17c0 .62-.504 1.124-1.125 1.124H4.125A1.125 1.125 0 013 20.625v-5.17c0-1.08.768-2.014 1.837-2.174A47.78 47.78 0 016 13.12M12.265 3.11a.375.375 0 11-.53 0L12 2.845l.265.265zm-3 0a.375.375 0 11-.53 0L9 2.845l.265.265zm6 0a.375.375 0 11-.53 0L15 2.845l.265.265z" />
        </svg>
      ),
    },
    {
      title: 'Health Monitoring',
      description: 'Regular health checks during meal distribution to monitor the wellbeing of our elderly beneficiaries.',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
        </svg>
      ),
    },
    {
      title: 'Social Engagement',
      description: 'Creating opportunities for elderly individuals to socialize, share stories, and maintain community connections.',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z" />
        </svg>
      ),
    },
    {
      title: 'Home Visits',
      description: 'For those unable to attend communal feeding, we deliver meals and provide companionship through home visits.',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
        </svg>
      ),
    },
  ];

  return (
    <div className="page-container">
      <section
        className={`page-hero ${heroVisible ? 'animate-fade-in' : 'animate-hidden'}`}
        ref={heroRef}
        style={{
          background: 'linear-gradient(135deg, rgba(217, 119, 6, 0.85) 0%, rgba(245, 158, 11, 0.8) 50%, rgba(251, 191, 36, 0.85) 100%), url("/images/interventions/feedtheaged.png") center/cover no-repeat'
        }}
      >
        <h1>Feed the Aged and Medical Outreach</h1>
        <p>Honoring our elders through nutrition, care, and comprehensive medical support.</p>
      </section>

      <section className="page-content">
        <div
          className={`intro-text ${introVisible ? 'animate-fade-up' : 'animate-hidden'}`}
          ref={introRef}
        >
          <p>
            The Feed the Aged initiative is our commitment to ensuring that elderly members of our
            communities do not go hungry. Many elderly individuals live alone, face mobility
            challenges, or lack the resources to prepare nutritious meals regularly.
          </p>
          <p>
            Beyond providing food, this programme addresses the social isolation that many elderly
            people experience. Our volunteers don't just deliver meals – they offer companionship,
            check on wellbeing, and help connect seniors with additional support services when needed.
          </p>
        </div>

        <div className="stats-section">
          <div className="stat-item">
            <p className="stat-number" style={{ color: '#f59e0b' }}>500+</p>
            <p className="stat-label">Elderly Served</p>
          </div>
          <div className="stat-item">
            <p className="stat-number" style={{ color: '#f59e0b' }}>50K+</p>
            <p className="stat-label">Meals Provided</p>
          </div>
          <div className="stat-item">
            <p className="stat-number" style={{ color: '#f59e0b' }}>12</p>
            <p className="stat-label">Communities</p>
          </div>
          <div className="stat-item">
            <p className="stat-number" style={{ color: '#f59e0b' }}>100+</p>
            <p className="stat-label">Volunteers</p>
          </div>
        </div>

        <div className="content-section">
          <h2 className="section-title">Programme Activities</h2>
          <div className="cards-grid">
            {activities.map((activity, index) => (
              <div
                key={index}
                ref={setActivityRef(index)}
                className={`info-card ${visibleActivities.has(index) ? 'animate-fade-up' : 'animate-hidden'}`}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <div
                  className="info-card-icon"
                  style={{ background: 'linear-gradient(135deg, rgba(245, 158, 11, 0.15) 0%, rgba(245, 158, 11, 0.08) 100%)' }}
                >
                  <div style={{ color: '#f59e0b' }}>{activity.icon}</div>
                </div>
                <h3>{activity.title}</h3>
                <p>{activity.description}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="content-section" style={{ textAlign: 'center' }}>
          <div className="info-card" style={{ display: 'inline-block', maxWidth: '600px', padding: '2.5rem' }}>
            <h3 style={{ marginBottom: '1rem' }}>How You Can Help</h3>
            <p style={{ marginBottom: '1.5rem' }}>
              Your support can make a significant difference in the lives of elderly community members.
              Whether through volunteering your time, donating food items, or contributing financially,
              every bit of help counts.
            </p>
            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
              <a
                href="/volunteer"
                style={{
                  padding: '0.75rem 1.5rem',
                  background: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)',
                  color: 'white',
                  borderRadius: '50px',
                  fontWeight: '600',
                  textDecoration: 'none',
                }}
              >
                Volunteer Now
              </a>
              <a
                href="/about"
                style={{
                  padding: '0.75rem 1.5rem',
                  background: 'rgba(245, 158, 11, 0.1)',
                  color: '#d97706',
                  borderRadius: '50px',
                  fontWeight: '600',
                  textDecoration: 'none',
                }}
              >
                Learn More
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default FeedTheAged;
