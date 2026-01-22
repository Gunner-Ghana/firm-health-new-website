import { useState, useEffect } from 'react';
import { useScrollAnimation, useMultipleScrollAnimation } from '../../hooks/useScrollAnimation';
import { useTeamMembers } from '../../hooks/useMemberDB';
import '../../styles/PageLayout.css';

function Teams() {
  const [heroRef, heroVisible] = useScrollAnimation({ threshold: 0.2 });
  const [introRef, introVisible] = useScrollAnimation();
  const [selectedMember, setSelectedMember] = useState(null);

  const managementTeam = useTeamMembers();
  const [setMemberRef, visibleMembers] = useMultipleScrollAnimation(managementTeam?.length || 7);

  // Handle body overflow when modal opens/closes
  useEffect(() => {
    if (selectedMember) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [selectedMember]);

  const openModal = (member) => {
    setSelectedMember(member);
  };

  const closeModal = () => {
    setSelectedMember(null);
  };

  return (
    <div className="page-container">
      <section
        className={`page-hero team-hero ${heroVisible ? 'animate-fade-in' : 'animate-hidden'}`}
        ref={heroRef}
      >
        <div className="team-hero-background"></div>
        <div className="team-hero-content">
          <h1>Management Team</h1>
          <p>Meet the dedicated professionals driving our mission to bring quality healthcare to communities in need.</p>
        </div>
      </section>

      <section className="page-content">
        <div
          className={`intro-text ${introVisible ? 'animate-fade-up' : 'animate-hidden'}`}
          ref={introRef}
        >
          <p>
            Our Management Team consists of experienced professionals who bring diverse expertise
            and a shared passion for improving healthcare access in Ghana. They work tirelessly
            to ensure our programs are effective, sustainable, and truly impactful.
          </p>
          <p>
            Each team member plays a crucial role in our day-to-day operations, from program
            implementation to financial stewardship, ensuring that we deliver on our promise
            to the communities we serve.
          </p>
        </div>

        <div className="content-section">
          <h2 className="section-title">Our Leadership Team</h2>
          <p className="section-subtitle">Experienced professionals committed to excellence in healthcare delivery</p>
          {managementTeam && managementTeam.length > 0 ? (
            <div className="board-grid">
              {managementTeam.map((member, index) => (
                <div
                  key={member.id}
                  ref={setMemberRef(index)}
                  className={`board-card ${visibleMembers.has(index) ? 'animate-scale-up' : 'animate-hidden'}`}
                  style={{ transitionDelay: `${index * 100}ms` }}
                >
                  <div className="board-card-image-wrapper">
                    {member.image ? (
                      <img
                        src={member.image}
                        alt={member.name}
                        className="board-card-image"
                      />
                    ) : (
                      <div className="board-card-placeholder">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1} stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
                        </svg>
                      </div>
                    )}
                    <div className="board-card-image-overlay"></div>
                  </div>
                  <div className="board-card-content">
                    <h3>{member.name}</h3>
                    <p className="board-card-role">{member.role}</p>
                    <p className="board-card-position">{member.position}</p>
                    <a href={`mailto:${member.email}`} className="board-card-email">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                      </svg>
                      {member.email}
                    </a>
                    <p className="board-card-bio">{member.shortBio}</p>
                    <button
                      className="board-card-btn"
                      onClick={() => openModal(member)}
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
            <div className="empty-state-message">
              <p>No team members have been added yet.</p>
            </div>
          )}
        </div>
      </section>

      {/* Biography Modal */}
      {selectedMember && (
        <div className="board-modal-overlay" onClick={closeModal}>
          <div className="board-modal" onClick={(e) => e.stopPropagation()}>
            <button className="board-modal-close" onClick={closeModal}>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            <div className="board-modal-content">
              <div className="board-modal-header">
                <img
                  src={selectedMember.image}
                  alt={selectedMember.name}
                  className="board-modal-image"
                />
                <div className="board-modal-info">
                  <h2>{selectedMember.name}</h2>
                  <p className="board-modal-role">{selectedMember.role}</p>
                  <p className="board-modal-position">{selectedMember.position}</p>
                  <a href={`mailto:${selectedMember.email}`} className="board-modal-email">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                    </svg>
                    {selectedMember.email}
                  </a>
                </div>
              </div>
              <div className="board-modal-body">
                <h3>Biography</h3>
                <p>{selectedMember.fullBio}</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Teams;
