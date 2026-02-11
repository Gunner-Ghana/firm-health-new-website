import { useState, useEffect } from 'react';
import '../../styles/PageLayout.css';

const boardMembers = [
  {
    id: 1,
    name: 'Prof. Jerry S. Y. Kuma',
    role: 'Board Chairman',
    position: 'Board Chairman',
    image: '/images/board/prof1.png',
    email: 'j.kumafirmhealth@gmail.com',
    shortBio: 'Former Vice Chancellor of University of Mines and Technology (2012-2020) and Professor of Environmental Hydrogeology.',
    fullBio: 'Former Vice Chancellor of University of Mines and Technology (2012-2020) and recently Rector of Perez University College. Professor of Environmental Hydrogeology and Geophysics holding degrees from University of Ghana (BSc, 1985), ITC Netherlands (PG Dip and MSc, 1990-1991), and University of Newcastle (PhD, 2002). Recipient of Queens Anniversary Prize (2005), Nobles International Award (2013), Africa Education Leadership Award (2015), and ESQR Gold Award (2016). Fellow of multiple professional institutions including Ghana Institution of Geoscientists.'
  },
  {
    id: 2,
    name: 'Engr. Dr. Sylvester Akpah',
    role: 'Board Member',
    position: 'Chief Executive Officer',
    image: '/images/board/member1.jpg',
    email: 's.akpahfirmhealth@gmail.com',
    shortBio: 'CEO with six years NGO management experience and 2018 Mandela Washington Fellow.',
    fullBio: 'Chief Executive Officer with six years NGO management experience leading 15 staff. Lecturer at UMaT in Computer Science specializing in network infrastructure deployment, wireless security, software engineering, and web technologies. Holds MSc and BSc in Information Technology. 2018 Mandela Washington Fellow and Western Regional Coordinator for Operation Smile Ghana.'
  },
  {
    id: 3,
    name: 'Mrs. Florence Ansere-Bioh',
    role: 'Board Member',
    position: 'Community Affairs and Public Relations Manager',
    image: '/images/board/florence.jpg',
    email: 'f.anserefirmhealth@gmail.com',
    shortBio: 'Community Affairs and Public Relations Manager at Gold Fields Tarkwa Mine with 12+ years experience.',
    fullBio: 'Community Affairs and Public Relations Manager at Gold Fields, Tarkwa Mine with 12+ years mining industry experience across multiple companies. Former Rural Sociologist at CSIR Crops Research Institute. Masters of Philosophy and Bachelor of Arts in Sociology from University of Ghana. Expertise in community relations and communication, exploring local people\'s perspectives, land access and use.'
  },
  {
    id: 4,
    name: 'Mr. K.T. Oppong-Kyekyeku',
    role: 'Board Member',
    position: 'Mining Industry Lawyer',
    image: '/images/board/oppongk.jpg',
    email: 'k.twumasifirmhealth@gmail.com',
    shortBio: 'Mining industry lawyer with 7+ years at Ghana\'s Minerals Commission.',
    fullBio: 'Mining industry lawyer with 7+ years at Ghana\'s Minerals Commission. Involved in formulating key mining legislation including Ghana Integrated Aluminium Development Corporation Act (2018) and Minerals and Mining Regulations (2018-2020). Served on mining-focused committees and taught Environmental Law as adjunct lecturer at Lancaster University Ghana (2019-2020).'
  },
  {
    id: 5,
    name: 'Mr. Kwabena Barning',
    role: 'Board Member',
    position: 'Chief Technical Officer',
    image: '/images/board/barning.jpg',
    email: 'k.barningfirmhealth@gmail.com',
    shortBio: 'Chief Technical Officer with 28 years corporate experience across sub-Saharan Africa.',
    fullBio: 'Chief Technical Officer overseeing Business Development and Research. Brings 28 years corporate experience across sub-Saharan Africa with SGS, including Vice President role (2018-19). Managed regional operations in French West Africa and Tropical Southern Africa. Holds MBA from University of Leicester (2008) and BSc Chemistry with Geology from University of Ghana (1992).'
  },
  {
    id: 6,
    name: 'Dr. Joseph Darko',
    role: 'Board Member',
    position: 'Director of Medical Services',
    image: '/images/board/darko.png',
    email: 'j.darkofirmhealth@gmail.com',
    shortBio: 'Director of Medical Services and Medical Superintendent of Government Hospital, Bogoso.',
    fullBio: 'Director of Medical Services for Firm Health Ghana Foundation and Medical Superintendent of Government Hospital, Bogoso. MBChB from University of Ghana Medical School and MPH from University of Liverpool. Awarded Grand Medal by Ghana for COVID-19 emergency response leadership. Led management of Ghana\'s first Marburg Virus Disease survivor in 2022.'
  },
  {
    id: 7,
    name: 'Mr. Michael Fynn Hammond',
    role: 'Secretary',
    position: 'Assistant Registrar, UMaT',
    image: '/images/board/michael.jpg',
    email: 'm.hammondfirmhealth@gmail.com',
    shortBio: 'Assistant Registrar at UMaT and YALI Fellow selected from over 2,000 applicants.',
    fullBio: 'Assistant Registrar at UMaT holding MBA (HRM) and Bachelor of Education (Management) from University of Cape Coast. Selected among 119 participants from 2,000+ applicants for YALI\'s fifth cohort (2016). Member of Weducate Initiative focused on empowering northern Ghana communities.'
  }
];

function Board() {
  const [selectedMember, setSelectedMember] = useState(null);

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
      <section className="page-hero board-hero">
        <div className="board-hero-background"></div>
        <div className="board-hero-content">
          <h1>The Board</h1>
          <p>Meet Our Board</p>
        </div>
      </section>

      <section className="page-content">
        <div className="intro-text">
          <p>
            Firm Health Ghana Foundation is a voluntary, non-governmental and humanitarian
            organization committed to enhancing wellness through proactive advocacy efforts.
          </p>
          <p>
            Our Board of Directors comprises distinguished professionals from diverse backgrounds,
            united by a shared commitment to improving health outcomes in Ghana. They provide strategic
            oversight and ensure our organization remains true to its mission while adapting to
            evolving healthcare challenges.
          </p>
        </div>

        <div className="content-section">
          <h2 className="section-title">Meet Our Board</h2>
          <p className="section-subtitle">Distinguished professionals guiding our mission</p>

          <div className="board-grid">
            {boardMembers.map((member) => (
              <div key={member.id} className="board-card">
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
                  {member.email && (
                    <a href={`mailto:${member.email}`} className="board-card-email">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                      </svg>
                      {member.email}
                    </a>
                  )}
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
                {selectedMember.image ? (
                  <img
                    src={selectedMember.image}
                    alt={selectedMember.name}
                    className="board-modal-image"
                  />
                ) : (
                  <div className="board-modal-placeholder">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1} stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
                    </svg>
                  </div>
                )}
                <div className="board-modal-info">
                  <h2>{selectedMember.name}</h2>
                  <p className="board-modal-role">{selectedMember.role}</p>
                  <p className="board-modal-position">{selectedMember.position}</p>
                  {selectedMember.email && (
                    <a href={`mailto:${selectedMember.email}`} className="board-modal-email">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                      </svg>
                      {selectedMember.email}
                    </a>
                  )}
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

export default Board;
