import { useScrollAnimation, useMultipleScrollAnimation } from '../../hooks/useScrollAnimation';
import '../../styles/PageLayout.css';

function RadioProgramme() {
  const [heroRef, heroVisible] = useScrollAnimation({ threshold: 0.2 });
  const [introRef, introVisible] = useScrollAnimation();
  const [statsRef, statsVisible] = useScrollAnimation();
  const [setInterventionRef, visibleInterventions] = useMultipleScrollAnimation(6);

  const interventions = [
    {
      id: 1,
      title: 'Weekly Public Health Radio Program',
      year: '2025',
      description: 'The Weekly Public Health Radio Program is an initiative by the Firm Health Ghana Foundation to educate the public on essential health topics, promote wellness, and encourage healthy lifestyles. The program features experienced healthcare professionals and nutrition experts who provide insights into various health-related issues.',
      objective: 'Raise awareness on public health issues and provide reliable health information to the public through interactive discussions and expert insights.',
      implementation: 'The program airs weekly on Dynamite (88.9) FM every Tuesday from 8:30 AM – 9:15 AM, featuring resource persons such as doctors, nutritionists, and health professionals to discuss various health topics. Listeners engage through Q&A sessions, where experts provide professional advice and recommendations.',
      impact: 'The program provides credible and practical health education, encourages healthy living through discussions on nutrition, wellness, and preventive healthcare, and strengthens community health awareness.',
      icon: '📻',
      color: '#10b981',
      image: 'https://images.unsplash.com/photo-1478737270239-2f02b77fc618?w=800&q=80'
    },
    {
      id: 2,
      title: 'Quarterly Blood Donation Drive',
      year: '2023',
      description: 'The primary aim of organizing the quarterly blood donation drives is to facilitate the collection of donated blood from voluntary individuals to supply safe and sufficient blood and blood products to healthcare facilities in the Tarkwa and Bogoso Municipalities.',
      objective: 'Contribute to the local healthcare system by ensuring a stable blood supply for medical emergencies and treatments.',
      implementation: 'Organize quarterly blood donation events, collaborating with local hospitals, medical professionals, and volunteers. Conduct awareness campaigns before each drive. Target: 1,000 pints of blood annually (250 pints per quarter).',
      impact: 'Saving lives by providing a sustainable and accessible blood source, while raising awareness about the importance of blood donation.',
      icon: '🩸',
      color: '#ef4444',
      image: 'https://images.unsplash.com/photo-1615461066841-6116e61058f4?w=800&q=80'
    },
    {
      id: 3,
      title: 'Weekly Radio Program - Apɔwmudzen Mmr3 Nie',
      year: '2013',
      description: 'Dubbed "Apɔwmudzen Mmr3 Nie" (Firm Health Hour), this flagship program is aired every Wednesday morning on Dynamite FM (88.9) between 8:30 am – 9:30 am. The program is anchored by Dr Joseph Darko (Medical Superintendent, New Government Hospital, Bogoso).',
      objective: 'Raise awareness, disseminate information, and educate the community on health, education, social issues, and community development.',
      implementation: 'Host weekly radio programs featuring expert guests, community leaders, and informative content. Encourage audience participation through call-ins, surveys, or social media interaction.',
      impact: 'Increased knowledge and awareness among community members, fostering a sense of unity and empowerment.',
      icon: '🎙️',
      color: '#8b5cf6',
      image: 'https://images.unsplash.com/photo-1590602847861-f357a9332bbc?w=800&q=80'
    },
    {
      id: 4,
      title: 'Community Medical Screening Program',
      year: '2016',
      description: 'The primary goal is to enhance community health and well-being by providing accessible and preventive healthcare services. Over the years, the foundation has visited over 20 communities across the country and screened over 13,000 individuals.',
      objective: 'Improve community health by early detection and prevention of diseases through regular medical screenings.',
      implementation: 'Conduct regular medical screening camps in collaboration with healthcare professionals. Tests include: BP tests, blood sugar level tests, urinalysis tests, eye tests, and more.',
      impact: 'Early detection of health issues, increased health awareness, and promotion of a healthier lifestyle within the community.',
      icon: '🏥',
      color: '#3b82f6',
      image: 'https://images.unsplash.com/photo-1631815588090-d4bfec5b1ccb?w=800&q=80'
    },
    {
      id: 5,
      title: '5KM Health Walk and Aerobics Session',
      year: '2018',
      description: 'The 5KM Health Walk and Aerobics Session is a fantastic initiative to promote physical activity, fitness, and community well-being. This event is observed on the last Saturday of every month.',
      objective: 'Promote physical activity, community engagement, and overall well-being.',
      implementation: 'Organize 5KM health walks with a designated route. Follow up with an aerobics session led by qualified instructors. Encourage participation from all age groups.',
      impact: 'Contributes to the overall health, social cohesion, and well-being of the community.',
      icon: '🏃',
      color: '#f59e0b',
      image: 'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=800&q=80'
    },
    {
      id: 6,
      title: 'Feed the Aged and Medical Outreach',
      year: 'Ongoing',
      description: 'A community initiative combining nutritional support for elderly individuals with medical screenings to assess and address their health needs. This project addresses the holistic well-being of elderly individuals within the Beyin community.',
      objective: 'Address the needs of the elderly population by providing nutritional support and medical check-ups.',
      implementation: 'Organize regular feeding programs for the elderly, along with comprehensive medical screenings. Collaborate with healthcare providers and nutritionists to tailor support to individual needs.',
      impact: 'Improved well-being for the elderly population, early detection of health issues, and social engagement for this demographic.',
      icon: '👴',
      color: '#ec4899',
      image: 'https://images.unsplash.com/photo-1581579438747-104c53d7fbc4?w=800&q=80'
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
            <span className="ci-stat-number">6</span>
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
