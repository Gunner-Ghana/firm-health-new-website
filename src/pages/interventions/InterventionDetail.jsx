import { useParams, Link } from 'react-router-dom';
import { useInterventionBySlug } from '../../hooks/useInterventionDB';
import { useScrollAnimation } from '../../hooks/useScrollAnimation';
import '../../styles/PageLayout.css';
import './InterventionDetail.css';

function InterventionDetail() {
  const { slug } = useParams();
  const intervention = useInterventionBySlug(slug);
  const [heroRef, heroVisible] = useScrollAnimation({ threshold: 0.2 });
  const [contentRef, contentVisible] = useScrollAnimation();

  if (intervention === undefined) {
    return (
      <div className="page-container">
        <div className="loading-state">
          <div className="loading-spinner"></div>
          <p>Loading...</p>
        </div>
      </div>
    );
  }

  if (!intervention) {
    return (
      <div className="page-container">
        <div className="not-found-state">
          <h1>Intervention Not Found</h1>
          <p>The intervention you're looking for doesn't exist or has been removed.</p>
          <Link to="/" className="back-btn">
            Back to Home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="page-container">
      {/* Hero Section */}
      <section
        className={`intervention-detail-hero ${heroVisible ? 'animate-fade-in' : 'animate-hidden'}`}
        ref={heroRef}
      >
        <div
          className="intervention-detail-hero-bg"
          style={{
            backgroundImage: intervention.image ? `url(${intervention.image})` : undefined,
            backgroundColor: !intervention.image ? intervention.color : undefined
          }}
        >
          <div
            className="intervention-detail-hero-overlay"
            style={{ background: `linear-gradient(135deg, ${intervention.color}ee 0%, ${intervention.color}cc 100%)` }}
          ></div>
        </div>
        <div className="intervention-detail-hero-content">
          <h1>{intervention.title}</h1>
          <p>{intervention.description}</p>
        </div>
      </section>

      {/* Content Section */}
      <section className="page-content">
        <div
          ref={contentRef}
          className={`intervention-detail-content ${contentVisible ? 'animate-fade-up' : 'animate-hidden'}`}
        >
          {intervention.content ? (
            <div className="intervention-detail-body">
              {intervention.content.split('\n').map((paragraph, index) => (
                paragraph.trim() && <p key={index}>{paragraph}</p>
              ))}
            </div>
          ) : (
            <div className="intervention-detail-body">
              <p>{intervention.description}</p>
            </div>
          )}

          <div className="intervention-detail-cta">
            <h3>Want to get involved?</h3>
            <p>Join us in making a difference through this program.</p>
            <Link to="/volunteer" className="volunteer-btn" style={{ backgroundColor: intervention.color }}>
              Become a Volunteer
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
              </svg>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

export default InterventionDetail;
