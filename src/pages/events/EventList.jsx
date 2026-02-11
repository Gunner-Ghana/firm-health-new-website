import { useScrollAnimation, useMultipleScrollAnimation } from '../../hooks/useScrollAnimation';
import './EventList.css';

const events = [
  {
    id: 1,
    title: 'Dine With the Aged and Medical Outreach',
    date: '2024-12-24',
    time: '8:30 AM - 4:30 PM',
    location: 'Frontage of Gas Processing Plant, Atuabo',
    description: 'A partnership with Ghana Gas providing care, nourishment, and smiles to our elderly community members. This event combines a festive meal with comprehensive medical screening services for the aged in the Atuabo community.',
    image: '/images/events/feed-aged-event.jpg',
    type: 'feeding'
  },
  {
    id: 2,
    title: 'Quarterly Blood Donation Drive',
    date: '2018-09-10',
    time: '10:30 AM - 3:30 PM',
    location: 'St. Catholic Church, Bogoso',
    description: 'Community blood donation event partnering with the local church to save lives. This quarterly initiative brings together community members to donate blood and support local hospitals\' blood bank reserves.',
    image: '/images/events/blood-donation-event.jpg',
    type: 'donation'
  },
  {
    id: 3,
    title: 'Blood Donation Drive - Tarkwa 2023',
    date: '2023-09-29',
    time: '10:30 AM - 3:30 PM',
    location: 'Tarkwa',
    description: 'A major blood donation event partnered with local hospitals and media associations, targeting the collection of 1,000 pints of blood. Supported by Goldfields Ghana Foundation and Rotary Club of Tarkwa.',
    image: '/images/events/blood-donation-event.jpg',
    type: 'donation'
  },
  {
    id: 4,
    title: '2024 3rd Quarter Blood Donation',
    date: '2024-07-15',
    time: '10:30 AM - 3:30 PM',
    location: 'Nzulezo, Western Region',
    description: 'Third quarter blood donation drive supported by Ghana Gas in Nzulezo. This event continues the foundation\'s mission to ensure adequate blood supply for hospitals in the Western Region.',
    image: '/images/events/blood-donation-event.jpg',
    type: 'donation'
  },
  {
    id: 5,
    title: 'Drexel ICA Program 2024',
    date: '2024-03-24',
    time: '10:30 AM - 3:30 PM',
    location: 'Tarkwa, Western Region',
    description: 'The Health and Research Summer Internship Program (HRSIP) offering hands-on experience in diverse fields, from medicine to public health. Students gain clinical experience at Tarkwa Municipal Hospital and Apinto Government Hospital.',
    image: '/images/events/training-event.jpg',
    type: 'training'
  },
  {
    id: 6,
    title: 'Community Medical Screening Outreach',
    date: '2024-05-18',
    time: '8:00 AM - 4:00 PM',
    location: 'Various Communities, Western Region',
    description: 'Free comprehensive medical screening program that has served over 13,000 individuals across 20+ communities since 2016. Services include blood pressure checks, blood sugar testing, BMI assessment, and health education.',
    image: '/images/events/medical-screening-event.jpg',
    type: 'screening'
  }
];

function EventList() {
  const [heroRef, heroVisible] = useScrollAnimation({ threshold: 0.2 });
  const [setEventRef, visibleEvents] = useMultipleScrollAnimation(events.length);

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
      training: 'Training Program',
      fair: 'Health Fair',
    };
    return labels[type] || type;
  };

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };

  return (
    <div className="events-page">
      {/* Hero Section */}
      <section
        className={`events-hero ${heroVisible ? 'animate-fade-in' : 'animate-hidden'}`}
        ref={heroRef}
      >
        <div className="events-hero-overlay"></div>
        <div className="events-hero-content">
          <h1>Our Events</h1>
          <p>Join us in making a difference through our health initiatives and community programs across Ghana.</p>
        </div>
      </section>

      {/* Events Section */}
      <section className="events-section">
        <div className="events-container">
          <div className="events-intro">
            <h2>Upcoming & Past Events</h2>
            <p>
              Firm Health Ghana Foundation organizes regular health events and community outreach programs
              to bring quality healthcare services directly to underserved communities. From blood donation
              drives to medical screenings, our events have touched thousands of lives across the Western Region.
            </p>
          </div>

          <div className="events-grid">
            {events.map((event, index) => (
              <div
                key={event.id}
                ref={setEventRef(index)}
                className={`event-card ${visibleEvents.has(index) ? 'animate-fade-up' : 'animate-hidden'}`}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="event-image">
                  <img src={event.image} alt={event.title} />
                  <div
                    className="event-badge"
                    style={{ backgroundColor: getEventTypeColor(event.type) }}
                  >
                    {getEventTypeLabel(event.type)}
                  </div>
                </div>
                <div className="event-content">
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
                </div>
              </div>
            ))}
          </div>

          {/* Call to Action */}
          <div className="events-cta">
            <div className="cta-card">
              <h3>Want to Participate?</h3>
              <p>
                Join us at our next event! Whether you want to volunteer, donate blood, or receive free
                medical screening, there's a place for everyone in our community health initiatives.
              </p>
              <a href="/volunteer" className="cta-button">
                Volunteer With Us
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default EventList;
