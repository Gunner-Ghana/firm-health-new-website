import { useScrollAnimation, useMultipleScrollAnimation } from '../../hooks/useScrollAnimation';
import { useUpcomingEvents } from '../../hooks/useEventDB';
import '../../styles/PageLayout.css';
import './EventList.css';

function EventList() {
  const [heroRef, heroVisible] = useScrollAnimation({ threshold: 0.2 });
  const events = useUpcomingEvents();
  const [setEventRef, visibleEvents] = useMultipleScrollAnimation(events?.length || 6);

  const getEventTypeColor = (type) => {
    const colors = {
      screening: '#10b981',
      donation: '#ef4444',
      workshop: '#3b82f6',
      feeding: '#f59e0b',
      training: '#8b5cf6',
      fair: '#ec4899',
    };
    return colors[type] || '#10b981';
  };

  const getEventTypeLabel = (type) => {
    const labels = {
      screening: 'Health Screening',
      donation: 'Blood Donation',
      workshop: 'Workshop',
      feeding: 'Feed the Aged',
      training: 'Training',
      fair: 'Health Fair',
    };
    return labels[type] || type;
  };

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };

  return (
    <div className="page-container">
      <section
        className={`page-hero ${heroVisible ? 'animate-fade-in' : 'animate-hidden'}`}
        ref={heroRef}
        style={{ background: 'linear-gradient(135deg, #7c3aed 0%, #8b5cf6 50%, #a78bfa 100%)' }}
      >
        <h1>Upcoming Events</h1>
        <p>Join us at our upcoming health initiatives and community programs.</p>
      </section>

      <section className="page-content">
        {!events || events.length === 0 ? (
          <div className="events-empty-state">
            <div className="empty-icon">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" />
              </svg>
            </div>
            <h3>No Upcoming Events</h3>
            <p>Check back soon for new events and health initiatives in your community.</p>
          </div>
        ) : (
          <div className="events-grid">
            {events.map((event, index) => (
              <div
                key={event.id}
                ref={setEventRef(index)}
                className={`event-card glass-card ${visibleEvents.has(index) ? 'animate-fade-up' : 'animate-hidden'}`}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <div className="event-type-badge" style={{ backgroundColor: `${getEventTypeColor(event.type)}20`, color: getEventTypeColor(event.type) }}>
                  {getEventTypeLabel(event.type)}
                </div>
                <h3>{event.title}</h3>
                <div className="event-details">
                  <div className="event-detail">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" />
                    </svg>
                    <span>{formatDate(event.date)}</span>
                  </div>
                  <div className="event-detail">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span>{event.time}</span>
                  </div>
                  <div className="event-detail">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                    </svg>
                    <span>{event.location}</span>
                  </div>
                </div>
                <p className="event-description">{event.description}</p>
                <button className="event-btn" style={{ backgroundColor: getEventTypeColor(event.type) }}>
                  Learn More
                </button>
              </div>
            ))}
          </div>
        )}

        <div className="content-section" style={{ marginTop: '4rem', textAlign: 'center' }}>
          <div className="info-card" style={{ display: 'inline-block', maxWidth: '600px', padding: '2.5rem' }}>
            <h3 style={{ marginBottom: '1rem' }}>Want to stay updated?</h3>
            <p style={{ marginBottom: '1.5rem' }}>
              Follow us on social media or check back regularly for updates on our upcoming events
              and health initiatives.
            </p>
            <a
              href="/volunteer"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
                padding: '0.875rem 1.75rem',
                background: 'linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%)',
                color: 'white',
                borderRadius: '50px',
                fontWeight: '600',
                textDecoration: 'none',
              }}
            >
              Volunteer at Events
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" style={{ width: '18px', height: '18px' }}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
              </svg>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}

export default EventList;
