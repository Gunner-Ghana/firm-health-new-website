import { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { useScrollAnimation, useMultipleScrollAnimation } from '../hooks/useScrollAnimation';
import { useUpcomingEvents } from '../hooks/useEventDB';
import { usePublishedSponsors } from '../hooks/useSponsorDB';
import sponsor2 from '../assets/sponsors/2.png';
import sponsor5 from '../assets/sponsors/5.png';
import sponsor6 from '../assets/sponsors/6.png';
import sponsorGhanaGas from '../assets/sponsors/Ghanagas1.jpg';
import sponsor7 from '../assets/sponsors/7.png';
import sponsor8 from '../assets/sponsors/8.png';
import sponsor9 from '../assets/sponsors/9.png';
import './HomePage.css';

// Static data defined outside component — no recreation on every render
const GALLERY_PHOTOS = [
  { id: 'g1', src: '/images/gallery/thumbs/p1.jpg', alt: 'Community Health Outreach' },
  { id: 'g2', src: '/images/gallery/thumbs/p2.jpg', alt: 'Medical Screening' },
  { id: 'g3', src: '/images/gallery/thumbs/g3.jpg', alt: 'Blood Donation Drive' },
  { id: 'g4', src: '/images/gallery/thumbs/p3.jpg', alt: 'Feed the Aged' },
];

const DONOR = {
  name: 'Intertek Ghana Limited',
  description: 'Intertek Ghana Limited has been our primary supporter, helping us reach more communities and transform lives through their generous contributions to our health initiatives.',
  logo: sponsor8,
};

const STATIC_SPONSORS = [
  { id: 's1', image: sponsor6 },
  { id: 's2', image: sponsor5 },
  { id: 's3', image: sponsor2 },
  { id: 's4', image: sponsorGhanaGas },
  { id: 's5', image: sponsor7 },
  { id: 's6', image: sponsor8 },
  { id: 's7', image: sponsor9 },
];

const EVENT_COLORS = { screening: '#10b981', donation: '#ef4444', fair: '#8b5cf6' };
const getEventColor = (type) => EVENT_COLORS[type] || '#10b981';

function HomePage() {
  const [impactTitleRef, impactTitleVisible] = useScrollAnimation();
  const [setImpactCardRef, visibleImpactCards] = useMultipleScrollAnimation(3);
  const [donateRef, donateVisible] = useScrollAnimation();
  const [donorRef, donorVisible] = useScrollAnimation();
  const [galleryTitleRef, galleryTitleVisible] = useScrollAnimation();
  const [setGalleryRef, visibleGalleryItems] = useMultipleScrollAnimation(4);
  const [eventsTitleRef, eventsTitleVisible] = useScrollAnimation();
  const [sponsorsTitleRef, sponsorsTitleVisible] = useScrollAnimation();

  const dbEvents = useUpcomingEvents();
  const [setEventRef, visibleEvents] = useMultipleScrollAnimation(dbEvents?.length || 3);

  const dbSponsors = usePublishedSponsors();
  const allSponsors = useMemo(() => {
    const dynamic = (dbSponsors || []).map((s, i) => ({ id: `db-${s.id || i}`, name: s.name, image: s.image }));
    return [...STATIC_SPONSORS, ...dynamic];
  }, [dbSponsors]);

  return (
    <div className="home">
      {/* Hero Section — always visible, animates in via CSS */}
      <section className="hero">
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
              aria-label="Watch Video (opens in new tab)"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" aria-hidden="true">
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
              key={item.label}
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
          <div className="donate-icon" aria-hidden="true">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" aria-hidden="true">
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
            aria-label="Donate money (opens in new tab)"
          >
            Donate Money
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
            </svg>
          </a>
        </div>
      </section>

      {/* Featured Donor Section */}
      <section
        className={`featured-donor-section ${donorVisible ? 'animate-fade-in' : 'animate-hidden'}`}
        ref={donorRef}
      >
        <div className="featured-donor-content">
          <div className="featured-donor-badge">Our Valued Partner</div>
          <div className="featured-donor-logo">
            <img src={DONOR.logo} alt={DONOR.name} />
          </div>
          <h2>{DONOR.name}</h2>
          <p>{DONOR.description}</p>
          <div className="donor-gratitude">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
            </svg>
            <span>Thank you for your continued support</span>
          </div>
        </div>
      </section>

      {/* Photo Gallery Section */}
      <section className="hp-gallery-section">
        <h2
          ref={galleryTitleRef}
          className={galleryTitleVisible ? 'animate-fade-up' : 'animate-hidden'}
        >
          Photo Gallery
        </h2>
        <p className="section-subtitle">Moments captured from our health initiatives and community programs.</p>
        <div className="hp-gallery-grid">
          {GALLERY_PHOTOS.map((photo, index) => (
            <Link
              key={photo.id}
              to="/gallery"
              ref={setGalleryRef(index)}
              className={`hp-gallery-item ${visibleGalleryItems.has(index) ? 'animate-scale-up' : 'animate-hidden'}`}
              style={{ transitionDelay: `${index * 80}ms` }}
              aria-label={`${photo.alt} — view gallery`}
            >
              <img
                src={photo.src}
                alt={photo.alt}
                loading="lazy"
                decoding="async"
                className="hp-gallery-img"
              />
              <div className="hp-gallery-overlay" aria-hidden="true">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
                </svg>
              </div>
            </Link>
          ))}
        </div>
        <div className="hp-gallery-cta">
          <Link to="/gallery" className="view-gallery-btn">
            View All Photos
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
            </svg>
          </Link>
        </div>
      </section>

      {/* Events Section — only shown when there are upcoming events */}
      {dbEvents && dbEvents.length > 0 && (
        <section className="events-section">
          <h2
            ref={eventsTitleRef}
            className={eventsTitleVisible ? 'animate-fade-up' : 'animate-hidden'}
          >
            Our Events
          </h2>
          <p className="section-subtitle">Join us at our upcoming health initiatives and community programs.</p>
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
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" />
                    </svg>
                    <span>{new Date(event.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
                  </div>
                  <div className="event-detail">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" aria-hidden="true">
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
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
              </svg>
            </Link>
          </div>
        </section>
      )}

      {/* Sponsors Section */}
      <section className="sponsors-section">
        <h2
          ref={sponsorsTitleRef}
          className={sponsorsTitleVisible ? 'animate-fade-up' : 'animate-hidden'}
        >
          Our Partners & Sponsors
        </h2>
        <div className="sponsors-slider">
          <div className="sponsors-track" aria-hidden="true">
            {[...allSponsors, ...allSponsors].map((sponsor, index) => (
              <div key={`${sponsor.id}-${index}`} className="sponsor-item">
                {sponsor.image ? (
                  <img src={sponsor.image} alt={sponsor.name || 'Sponsor'} className="sponsor-logo-img" />
                ) : (
                  <div className="sponsor-logo">{(sponsor.name || '').substring(0, 3).toUpperCase()}</div>
                )}
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
