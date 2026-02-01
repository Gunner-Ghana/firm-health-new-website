import { useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { useScrollAnimation, useMultipleScrollAnimation } from '../hooks/useScrollAnimation';
import { usePublishedInterventions } from '../hooks/useInterventionDB';
import { useUpcomingEvents } from '../hooks/useEventDB';
import { usePublishedPhotos } from '../hooks/usePhotoDB';
import { usePublishedSponsors } from '../hooks/useSponsorDB';
import sponsor2 from '../assets/sponsors/2.png';
import sponsor5 from '../assets/sponsors/5.png';
import sponsor6 from '../assets/sponsors/6.png';
import sponsorGhanaGas from '../assets/sponsors/Ghanagas1.jpg';
import sponsor7 from '../assets/sponsors/7.png';
import sponsor8 from '../assets/sponsors/8.png';
import sponsor9 from '../assets/sponsors/9.png';
import './HomePage.css';

function HomePage() {
  const [heroRef, heroVisible] = useScrollAnimation({ threshold: 0.2 });
  const [impactTitleRef, impactTitleVisible] = useScrollAnimation();
  const [setImpactCardRef, visibleImpactCards] = useMultipleScrollAnimation(3);
  const [donateRef, donateVisible] = useScrollAnimation();
  const [interventionsTitleRef, interventionsTitleVisible] = useScrollAnimation();
  const [donorRef, donorVisible] = useScrollAnimation();
  const [galleryTitleRef, galleryTitleVisible] = useScrollAnimation();
  const [eventsTitleRef, eventsTitleVisible] = useScrollAnimation();
  const [sponsorsTitleRef, sponsorsTitleVisible] = useScrollAnimation();

  // Lightbox state
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentImage, setCurrentImage] = useState(0);

  const dbInterventions = usePublishedInterventions();
  const [setInterventionRef, visibleInterventions] = useMultipleScrollAnimation(dbInterventions?.length || 5);

  const dbEvents = useUpcomingEvents();
  const [setEventRef, visibleEvents] = useMultipleScrollAnimation(dbEvents?.length || 3);

  const dbPhotos = usePublishedPhotos();
  const [setGalleryRef, visibleGalleryItems] = useMultipleScrollAnimation(dbPhotos?.length || 8);

  const donor = {
    name: 'Intertek Ghana Limited',
    description: 'Intertek Ghana Limited has been our primary supporter, helping us reach more communities and transform lives through their generous contributions to our health initiatives.',
    logo: '/intertek-logo.png'
  };

  const dbSponsors = usePublishedSponsors();

  const staticSponsors = [
    { name: 'Sponsor', image: sponsor6 },
    { name: 'Sponsor', image: sponsor5 },
    { name: 'Sponsor', image: sponsor2 },
    { name: 'Ghana Gas', image: sponsorGhanaGas },
    { name: 'Sponsor', image: sponsor7 },
    { name: 'Sponsor', image: sponsor8 },
    { name: 'Sponsor', image: sponsor9 },
  ];

  const allSponsors = useMemo(() => {
    const dynamic = (dbSponsors || []).map(s => ({ name: s.name, image: s.image, website: s.website }));
    return [...staticSponsors, ...dynamic];
  }, [dbSponsors]);

  // Handle body overflow when lightbox opens/closes
  useEffect(() => {
    if (lightboxOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [lightboxOpen]);

  const openLightbox = (index) => {
    setCurrentImage(index);
    setLightboxOpen(true);
  };

  const closeLightbox = () => {
    setLightboxOpen(false);
  };

  const nextImage = () => {
    if (dbPhotos && dbPhotos.length > 0) {
      setCurrentImage((prev) => (prev + 1) % dbPhotos.length);
    }
  };

  const prevImage = () => {
    if (dbPhotos && dbPhotos.length > 0) {
      setCurrentImage((prev) => (prev - 1 + dbPhotos.length) % dbPhotos.length);
    }
  };

  const getEventColor = (type) => {
    const colors = { screening: '#10b981', donation: '#ef4444', fair: '#8b5cf6' };
    return colors[type] || '#10b981';
  };

  return (
    <div className="home">
      {/* Hero Section */}
      <section className={`hero ${heroVisible ? 'animate-fade-in' : 'animate-hidden'}`} ref={heroRef}>
        <div className="hero-background">
          <div className="hero-image-overlay"></div>
        </div>
        <div className="hero-content">
          <h1>Empowering Health Advocacy: Comprehensive Support for a Healthier Tomorrow</h1>
          <p>Firm Health Ghana is dedicated to improving healthcare access and promoting wellness in underserved communities across Ghana.</p>
          <div className="hero-buttons">
            <Link to="/volunteer" className="btn btn-primary">Join Us</Link>
            <a
              href="https://vimeo.com/1010887945"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-video"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.348a1.125 1.125 0 010 1.971l-11.54 6.347a1.125 1.125 0 01-1.667-.985V5.653z" />
              </svg>
              Watch Video
            </a>
          </div>
        </div>
      </section>

      {/* Impact Section */}
      <section className="impact">
        <h2
          ref={impactTitleRef}
          className={impactTitleVisible ? 'animate-fade-up' : 'animate-hidden'}
        >
          Our Impact
        </h2>
        <div className="impact-grid">
          {[
            { number: '30,000+', label: 'Ghanaians Served' },
            { number: '100+', label: 'Medical Camps' },
            { number: '500+', label: 'Volunteers' },
          ].map((item, index) => (
            <div
              key={index}
              ref={setImpactCardRef(index)}
              className={`impact-card ${visibleImpactCards.has(index) ? 'animate-fade-up' : 'animate-hidden'}`}
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              <h3>{item.number}</h3>
              <p>{item.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Donate Section */}
      <section
        className={`donate-section ${donateVisible ? 'animate-fade-in' : 'animate-hidden'}`}
        ref={donateRef}
      >
        <div className="donate-content">
          <div className="donate-icon">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
            </svg>
          </div>
          <h2>Support Our Mission</h2>
          <p>Your donation helps us reach more communities and save more lives. Every contribution makes a difference.</p>
          <a
            href="https://paystack.com/pay/firmhealthghana"
            target="_blank"
            rel="noopener noreferrer"
            className="donate-btn"
          >
            Donate Money
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
            </svg>
          </a>
        </div>
      </section>

      {/* Interventions Section */}
      <section className="interventions-section">
        <h2
          ref={interventionsTitleRef}
          className={interventionsTitleVisible ? 'animate-fade-up' : 'animate-hidden'}
        >
          Our Interventions
        </h2>
        <p className="section-subtitle">Transforming lives through comprehensive health and wellness initiatives across Ghana.</p>
        {dbInterventions && dbInterventions.length > 0 ? (
          <div className="interventions-grid">
            {dbInterventions.map((intervention, index) => (
              <div
                key={intervention.id}
                ref={setInterventionRef(index)}
                className={`intervention-card ${visibleInterventions.has(index) ? 'animate-fade-up' : 'animate-hidden'}`}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <div className="intervention-image">
                  {intervention.image ? (
                    <img src={intervention.image} alt={intervention.title} />
                  ) : (
                    <div className="intervention-placeholder" style={{ backgroundColor: intervention.color || '#10b981' }}></div>
                  )}
                  <div className="intervention-overlay" style={{ background: `linear-gradient(135deg, ${intervention.color || '#10b981'}dd 0%, ${intervention.color || '#10b981'}99 100%)` }}></div>
                </div>
                <div className="intervention-content">
                  <h3>{intervention.title}</h3>
                  <p>{intervention.description}</p>
                  <Link to={`/interventions/${intervention.slug}`} className="intervention-btn" style={{ backgroundColor: intervention.color || '#10b981' }}>
                    Learn More
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                    </svg>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="empty-state-card">
            <div className="empty-state-icon">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
              </svg>
            </div>
            <h3>No Interventions Added Yet</h3>
            <p>Our intervention programs will be displayed here once they are added. Check back soon to learn about our health initiatives.</p>
          </div>
        )}
      </section>

      {/* Featured Donor Section */}
      <section
        className={`featured-donor-section ${donorVisible ? 'animate-fade-in' : 'animate-hidden'}`}
        ref={donorRef}
      >
        <div className="featured-donor-content">
          <div className="featured-donor-badge">Our Valued Partner</div>
          <div className="featured-donor-logo">
            <img src={donor.logo} alt={donor.name} />
          </div>
          <h2>{donor.name}</h2>
          <p>{donor.description}</p>
          <div className="donor-gratitude">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
            </svg>
            <span>Thank you for your continued support</span>
          </div>
        </div>
      </section>

      {/* Photo Gallery Section */}
      <section className="gallery-section">
        <h2
          ref={galleryTitleRef}
          className={galleryTitleVisible ? 'animate-fade-up' : 'animate-hidden'}
        >
          Photo Gallery
        </h2>
        <p className="section-subtitle">Moments captured from our health initiatives and community programs.</p>
        {dbPhotos && dbPhotos.length > 0 ? (
          <div className="gallery-grid">
            {dbPhotos.map((photo, index) => (
              <div
                key={photo.id}
                ref={setGalleryRef(index)}
                className={`gallery-item ${visibleGalleryItems.has(index) ? 'animate-scale-up' : 'animate-hidden'}`}
                style={{ transitionDelay: `${index * 75}ms` }}
                onClick={() => openLightbox(index)}
              >
                <img src={photo.image} alt={photo.title} className="gallery-image" />
                <div className="gallery-overlay">
                  <span className="gallery-category">{photo.category}</span>
                  <h4>{photo.title}</h4>
                  <span className="gallery-zoom">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607zM10.5 7.5v6m3-3h-6" />
                    </svg>
                  </span>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="empty-state-card">
            <div className="empty-state-icon">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
              </svg>
            </div>
            <h3>No Photos Added Yet</h3>
            <p>Our photo gallery will be displayed here once photos are added. Check back soon to see moments from our health initiatives.</p>
          </div>
        )}
      </section>

      {/* Lightbox */}
      {lightboxOpen && dbPhotos && dbPhotos.length > 0 && (
        <div className="lightbox" onClick={closeLightbox}>
          <button className="lightbox-close" onClick={closeLightbox}>×</button>
          <button className="lightbox-prev" onClick={(e) => { e.stopPropagation(); prevImage(); }}>‹</button>
          <div className="lightbox-content" onClick={(e) => e.stopPropagation()}>
            <img src={dbPhotos[currentImage].image} alt={dbPhotos[currentImage].title} className="lightbox-image" />
            <div className="lightbox-info">
              <span className="lightbox-category">{dbPhotos[currentImage].category}</span>
              <h3>{dbPhotos[currentImage].title}</h3>
              <p>{currentImage + 1} / {dbPhotos.length}</p>
            </div>
          </div>
          <button className="lightbox-next" onClick={(e) => { e.stopPropagation(); nextImage(); }}>›</button>
        </div>
      )}

      {/* Events Section */}
      <section className="events-section">
        <h2
          ref={eventsTitleRef}
          className={eventsTitleVisible ? 'animate-fade-up' : 'animate-hidden'}
        >
          Our Events
        </h2>
        <p className="section-subtitle">Join us at our upcoming health initiatives and community programs.</p>
        {dbEvents && dbEvents.length > 0 ? (
          <>
            <div className="events-grid">
              {dbEvents.slice(0, 3).map((event, index) => (
                <div
                  key={event.id}
                  ref={setEventRef(index)}
                  className={`event-card ${visibleEvents.has(index) ? 'animate-fade-up' : 'animate-hidden'}`}
                  style={{ transitionDelay: `${index * 100}ms` }}
                >
                  <div className="event-badge" style={{ backgroundColor: `${getEventColor(event.type)}20`, color: getEventColor(event.type) }}>
                    {event.type ? event.type.charAt(0).toUpperCase() + event.type.slice(1) : 'Event'}
                  </div>
                  <h3>{event.title}</h3>
                  <div className="event-details">
                    <div className="event-detail">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" />
                      </svg>
                      <span>{new Date(event.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
                    </div>
                    <div className="event-detail">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                      </svg>
                      <span>{event.location}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="events-cta">
              <Link to="/events" className="view-events-btn">
                View All Events
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                </svg>
              </Link>
            </div>
          </>
        ) : (
          <div className="empty-state-card">
            <div className="empty-state-icon">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" />
              </svg>
            </div>
            <h3>No Upcoming Events</h3>
            <p>There are no upcoming events scheduled at the moment. Check back soon for our health initiatives and community programs.</p>
          </div>
        )}
      </section>

      {/* Sponsors Section */}
      <section className="sponsors-section">
        <h2
          ref={sponsorsTitleRef}
          className={sponsorsTitleVisible ? 'animate-fade-up' : 'animate-hidden'}
        >
          Our Partners & Sponsors
        </h2>
        <div className="sponsors-slider">
          <div className="sponsors-track">
            {[...allSponsors, ...allSponsors].map((sponsor, index) => (
              <div key={index} className="sponsor-item">
                {sponsor.image ? (
                  <img src={sponsor.image} alt={sponsor.name} className="sponsor-logo-img" />
                ) : (
                  <div className="sponsor-logo">{sponsor.name.substring(0, 3).toUpperCase()}</div>
                )}
                <span className="sponsor-name">{sponsor.name}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta">
        <h2>Make a Difference Today</h2>
        <p>Your time and skills can help transform lives. Join our team of dedicated volunteers.</p>
        <Link to="/volunteer" className="btn btn-primary">Become a Volunteer</Link>
      </section>
    </div>
  );
}

export default HomePage;
