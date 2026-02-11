import { useScrollAnimation, useMultipleScrollAnimation } from '../../hooks/useScrollAnimation';
import '../../styles/PageLayout.css';

function RadioProgramme() {
  const [heroRef, heroVisible] = useScrollAnimation({ threshold: 0.2 });
  const [introRef, introVisible] = useScrollAnimation();
  const [statsRef, statsVisible] = useScrollAnimation();
  const [setInterventionRef, visibleInterventions] = useMultipleScrollAnimation(5);

  const interventions = [
    {
      id: 1,
      title: 'Weekly Public Health Radio Program',
      year: '2025',
      description: 'An initiative by the Firm Health Ghana Foundation to educate the public on essential health topics through radio broadcasting. The program features experienced healthcare professionals and nutrition experts who provide insights into various health-related issues.',
      objective: 'Raise awareness on public health issues via interactive discussions with healthcare experts.',
      implementation: 'Airs weekly on Dynamite (88.9) FM, Tuesdays 8:30-9:15 AM with doctors and nutritionists; includes Q&A sessions with listeners.',
      impact: 'Provides credible health education and strengthens community health awareness across the Western Region.',
      icon: '📻',
      color: '#10b981',
      image: '/images/interventions/cause11.png'
    },
    {
      id: 2,
      title: 'Quarterly Blood Donation Drive',
      year: '2023',
      description: 'Collects voluntary blood donations for healthcare facilities in Tarkwa and Bogoso Municipalities to ensure stable blood supply for medical emergencies and treatments.',
      objective: 'Ensure stable blood supply for medical emergencies and treatments in local hospitals.',
      implementation: 'Quarterly events collaborating with hospitals, medical professionals, and volunteers with awareness campaigns. Target: 1,000 pints of blood annually.',
      impact: 'Saves lives by providing sustainable blood sources and raises donation awareness in the community.',
      icon: '🩸',
      color: '#ef4444',
      image: '/images/interventions/cause-5.jpg'
    },
    {
      id: 3,
      title: 'Community Medical Screening Program',
      year: '2016',
      description: 'Free medical screenings across 20+ communities, having screened over 13,000 individuals since 2016. The program provides accessible and preventive healthcare services to underserved communities.',
      objective: 'Improve community health through early disease detection and prevention.',
      implementation: 'Regular screening camps with healthcare professionals covering BP, blood sugar, urinalysis, BMI, and eye tests.',
      impact: 'Early disease detection, increased health awareness, and promotion of healthier lifestyles.',
      icon: '🏥',
      color: '#3b82f6',
      image: '/images/interventions/event-1.jpg'
    },
    {
      id: 4,
      title: '5KM Health Walk and Aerobics Session',
      year: '2018',
      description: 'Monthly fitness initiative held on the last Saturday of each month to promote physical activity and community engagement. The event encourages participation from all age groups.',
      objective: 'Promote physical activity, healthy living, and community engagement through accessible fitness programs.',
      implementation: 'Organized 5KM walks with designated routes followed by qualified aerobics instruction.',
      impact: 'Contributes to improved health, social cohesion, and overall community well-being.',
      icon: '🏃',
      color: '#f59e0b',
      image: '/images/interventions/healthwalk.png'
    },
    {
      id: 5,
      title: 'Feed the Aged and Medical Outreach',
      year: '2020',
      description: 'Combines nutritional support for the elderly with comprehensive medical screenings in rural communities. This project addresses the holistic well-being of elderly individuals within communities like Beyin.',
      objective: 'Address elderly population needs through nutrition support and medical check-ups.',
      implementation: 'Regular feeding programs with comprehensive medical screenings via healthcare providers in communities.',
      impact: 'Improved elderly well-being, early health issue detection, and increased social engagement for seniors.',
      icon: '👴',
      color: '#ec4899',
      image: '/images/interventions/feedtheaged.png'
    }
  ];

  return (
    <div className="page-container">
      {/* Hero Section */}
      <section
        className={`page-hero community-hero ${heroVisible ? 'animate-fade-in' : 'animate-hidden'}`}
        ref={heroRef}
      >
        <div className="community-hero-background"></div>
        <div className="community-hero-content">
          <h1>Community Interventions</h1>
          <p>Transforming lives through comprehensive health and wellness initiatives across Ghana.</p>
        </div>
      </section>

      <section className="page-content">
        {/* Introduction */}
        <div
          className={`intro-text ${introVisible ? 'animate-fade-up' : 'animate-hidden'}`}
          ref={introRef}
        >
          <h2 style={{ marginBottom: '1rem', color: '#1f2937', textAlign: 'center' }}>Our Impact Over The Years</h2>
          <p>
            Over the years, the foundation has engaged in a diverse range of community interventions,
            addressing various aspects of health and well-being issues. This comprehensive approach
            has and continues to have a positive and lasting impact on the communities we serve.
          </p>
        </div>

        {/* Stats Section */}
        <div
          ref={statsRef}
          className={`ci-stats-grid ${statsVisible ? 'animate-fade-up' : 'animate-hidden'}`}
        >
          <div className="ci-stat-card">
            <span className="ci-stat-number">5</span>
            <span className="ci-stat-label">Active Programs</span>
          </div>
          <div className="ci-stat-card">
            <span className="ci-stat-number">20+</span>
            <span className="ci-stat-label">Communities Reached</span>
          </div>
          <div className="ci-stat-card">
            <span className="ci-stat-number">13,000+</span>
            <span className="ci-stat-label">People Screened</span>
          </div>
          <div className="ci-stat-card">
            <span className="ci-stat-number">12+</span>
            <span className="ci-stat-label">Years of Service</span>
          </div>
        </div>

        {/* All Interventions */}
        <div className="ci-interventions-list">
          {interventions.map((intervention, index) => (
            <div
              key={intervention.id}
              ref={setInterventionRef(index)}
              className={`ci-intervention-card ${visibleInterventions.has(index) ? 'animate-fade-up' : 'animate-hidden'}`}
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              {/* Card Header with Image */}
              <div className="ci-card-top">
                <div className="ci-card-image">
                  <img src={intervention.image} alt={intervention.title} />
                  <div className="ci-card-image-overlay" style={{ background: `linear-gradient(135deg, ${intervention.color}ee 0%, ${intervention.color}99 100%)` }}>
                    <span className="ci-overlay-number">#{intervention.id}</span>
                    <span className="ci-overlay-icon">{intervention.icon}</span>
                  </div>
                </div>
                <div className="ci-card-title-area">
                  <span className="ci-year-badge" style={{ background: intervention.color }}>
                    Started {intervention.year}
                  </span>
                  <h3>{intervention.title}</h3>
                  <p className="ci-card-desc">{intervention.description}</p>
                </div>
              </div>

              {/* Details Grid */}
              <div className="ci-details-grid">
                <div className="ci-detail-box">
                  <div className="ci-detail-header">
                    <div className="ci-detail-icon objective">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
                      </svg>
                    </div>
                    <h4>Objective</h4>
                  </div>
                  <p>{intervention.objective}</p>
                </div>

                <div className="ci-detail-box">
                  <div className="ci-detail-header">
                    <div className="ci-detail-icon implementation">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M11.42 15.17L17.25 21A2.652 2.652 0 0021 17.25l-5.877-5.877M11.42 15.17l2.496-3.03c.317-.384.74-.626 1.208-.766M11.42 15.17l-4.655 5.653a2.548 2.548 0 11-3.586-3.586l6.837-5.63m5.108-.233c.55-.164 1.163-.188 1.743-.14a4.5 4.5 0 004.486-6.336l-3.276 3.277a3.004 3.004 0 01-2.25-2.25l3.276-3.276a4.5 4.5 0 00-6.336 4.486c.091 1.076-.071 2.264-.904 2.95l-.102.085m-1.745 1.437L5.909 7.5H4.5L2.25 3.75l1.5-1.5L7.5 4.5v1.409l4.26 4.26m-1.745 1.437l1.745-1.437m6.615 8.206L15.75 15.75M4.867 19.125h.008v.008h-.008v-.008z" />
                      </svg>
                    </div>
                    <h4>Implementation</h4>
                  </div>
                  <p>{intervention.implementation}</p>
                </div>

                <div className="ci-detail-box impact-box">
                  <div className="ci-detail-header">
                    <div className="ci-detail-icon impact">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="#10b981">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18L9 11.25l4.306 4.307a11.95 11.95 0 015.814-5.519l2.74-1.22m0 0l-5.94-2.28m5.94 2.28l-2.28 5.941" />
                      </svg>
                    </div>
                    <h4>Impact</h4>
                  </div>
                  <p>{intervention.impact}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

export default RadioProgramme;
