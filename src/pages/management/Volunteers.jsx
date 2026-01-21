import { useState, useEffect } from 'react';
import { useScrollAnimation, useMultipleScrollAnimation } from '../../hooks/useScrollAnimation';
import { useApprovedVolunteers } from '../../hooks/useVolunteerDB';
import '../../styles/PageLayout.css';

function Volunteers() {
  const [heroRef, heroVisible] = useScrollAnimation({ threshold: 0.2 });
  const [introRef, introVisible] = useScrollAnimation();
  const approvedVolunteers = useApprovedVolunteers();
  const [setMemberRef, visibleMembers] = useMultipleScrollAnimation(approvedVolunteers?.length || 10);
  const [selectedVolunteer, setSelectedVolunteer] = useState(null);

  // Handle body overflow when modal opens/closes
  useEffect(() => {
    if (selectedVolunteer) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [selectedVolunteer]);

  const openModal = (volunteer) => {
    setSelectedVolunteer(volunteer);
  };

  const closeModal = () => {
    setSelectedVolunteer(null);
  };

  // Generate initials from name
  const getInitials = (firstName, lastName) => {
    return `${firstName?.charAt(0) || ''}${lastName?.charAt(0) || ''}`.toUpperCase();
  };

  // Generate a short bio from biography or fallback data
  const getShortBio = (volunteer) => {
    if (volunteer.biography) {
      return volunteer.biography.length > 100
        ? volunteer.biography.substring(0, 100) + '...'
        : volunteer.biography;
    }
    if (volunteer.experience) {
      return volunteer.experience.length > 100
        ? volunteer.experience.substring(0, 100) + '...'
        : volunteer.experience;
    }
    return `${volunteer.availability} volunteer with skills in ${volunteer.skills?.join(', ') || 'various areas'}.`;
  };

  // Get full bio from biography field or fallback
  const getFullBio = (volunteer) => {
    if (volunteer.biography) {
      return volunteer.biography;
    }
    let bio = '';
    if (volunteer.experience) {
      bio += volunteer.experience;
    }
    if (volunteer.motivation) {
      bio += (bio ? '\n\n' : '') + volunteer.motivation;
    }
    if (volunteer.skills && volunteer.skills.length > 0) {
      bio += (bio ? '\n\n' : '') + `Skills: ${volunteer.skills.join(', ')}.`;
    }
    return bio || `${volunteer.firstName} is a dedicated volunteer contributing to our mission.`;
  };

  return (
    <div className="page-container">
      <section
        className={`page-hero volunteer-hero ${heroVisible ? 'animate-fade-in' : 'animate-hidden'}`}
        ref={heroRef}
      >
        <div className="volunteer-hero-background"></div>
        <div className="volunteer-hero-content">
          <h1>Volunteers</h1>
          <p>Meet the dedicated individuals who make our mission possible through their selfless service.</p>
        </div>
      </section>

      <section className="page-content">
        <div
          className={`intro-text ${introVisible ? 'animate-fade-up' : 'animate-hidden'}`}
          ref={introRef}
        >
          <p>
            Our volunteers are the backbone of Firm Health Foundation. From medical professionals
            donating their expertise to community members helping with outreach, every volunteer
            contributes to our collective impact on community health across Ghana.
          </p>
          <p>
            We provide comprehensive training, ongoing support, and meaningful opportunities for
            volunteers to make a real difference in the lives of those we serve.
          </p>
        </div>

        <div className="content-section">
          <h2 className="section-title">Our Volunteers</h2>
          <p className="section-subtitle">Dedicated individuals making healthcare accessible to all</p>

          {approvedVolunteers && approvedVolunteers.length > 0 ? (
            <div className="board-grid">
              {approvedVolunteers.map((volunteer, index) => (
                <div
                  key={volunteer.id}
                  ref={setMemberRef(index)}
                  className={`board-card ${visibleMembers.has(index) ? 'animate-scale-up' : 'animate-hidden'}`}
                  style={{ transitionDelay: `${index * 100}ms` }}
                >
                  <div className="board-card-image-wrapper">
                    {volunteer.profileImage ? (
                      <img
                        src={volunteer.profileImage}
                        alt={`${volunteer.firstName} ${volunteer.lastName}`}
                        className="board-card-image"
                      />
                    ) : (
                      <div className="volunteer-placeholder-image">
                        <span className="volunteer-placeholder-initials">
                          {getInitials(volunteer.firstName, volunteer.lastName)}
                        </span>
                      </div>
                    )}
                    <div className="board-card-image-overlay"></div>
                  </div>
                  <div className="board-card-content">
                    <h3>{volunteer.firstName} {volunteer.lastName}</h3>
                    <p className="board-card-role">{volunteer.occupation || 'Volunteer'}</p>
                    <p className="board-card-position">{volunteer.availability} Availability</p>
                    <a href={`mailto:${volunteer.email}`} className="board-card-email">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                      </svg>
                      {volunteer.email}
                    </a>
                    <p className="board-card-bio">{getShortBio(volunteer)}</p>
                    <button
                      className="board-card-btn"
                      onClick={() => openModal(volunteer)}
                    >
                      See Biography
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                      </svg>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="empty-volunteers-state">
              <div className="empty-volunteers-icon">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z" />
                </svg>
              </div>
              <h3>No Volunteers Yet</h3>
              <p>Volunteer profiles will appear here once they are approved and made visible.</p>
            </div>
          )}
        </div>
      </section>

      {/* Biography Modal */}
      {selectedVolunteer && (
        <div className="board-modal-overlay" onClick={closeModal}>
          <div className="board-modal" onClick={(e) => e.stopPropagation()}>
            <button className="board-modal-close" onClick={closeModal}>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            <div className="board-modal-content">
              <div className="board-modal-header">
                {selectedVolunteer.profileImage ? (
                  <img
                    src={selectedVolunteer.profileImage}
                    alt={`${selectedVolunteer.firstName} ${selectedVolunteer.lastName}`}
                    className="board-modal-image"
                  />
                ) : (
                  <div className="volunteer-modal-placeholder">
                    <span>{getInitials(selectedVolunteer.firstName, selectedVolunteer.lastName)}</span>
                  </div>
                )}
                <div className="board-modal-info">
                  <h2>{selectedVolunteer.firstName} {selectedVolunteer.lastName}</h2>
                  <p className="board-modal-role">{selectedVolunteer.occupation || 'Volunteer'}</p>
                  <p className="board-modal-position">{selectedVolunteer.availability} Availability</p>
                  <a href={`mailto:${selectedVolunteer.email}`} className="board-modal-email">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                    </svg>
                    {selectedVolunteer.email}
                  </a>
                </div>
              </div>
              <div className="board-modal-body">
                <h3>Biography</h3>
                <p style={{ whiteSpace: 'pre-line' }}>{getFullBio(selectedVolunteer)}</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Volunteers;
