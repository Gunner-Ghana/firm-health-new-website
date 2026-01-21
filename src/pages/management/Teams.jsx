import { useState, useEffect } from 'react';
import { useScrollAnimation, useMultipleScrollAnimation } from '../../hooks/useScrollAnimation';
import '../../styles/PageLayout.css';

function Teams() {
  const [heroRef, heroVisible] = useScrollAnimation({ threshold: 0.2 });
  const [introRef, introVisible] = useScrollAnimation();
  const [setMemberRef, visibleMembers] = useMultipleScrollAnimation(7);
  const [selectedMember, setSelectedMember] = useState(null);

  const managementTeam = [
    {
      name: 'Dr. Kwame Mensah',
      role: 'Executive Director',
      position: 'Chief Executive Officer',
      email: 'k.mensah@firmhealth.org',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face',
      shortBio: 'Visionary leader with 18 years in healthcare management and public health administration.',
      fullBio: 'Dr. Kwame Mensah is a visionary leader with 18 years of experience in healthcare management and public health administration. As Executive Director, he oversees all operations and strategic initiatives of Firm Health Foundation. Dr. Mensah previously served as the Regional Health Director for the Greater Accra Region, where he implemented transformative health programs that reduced maternal mortality by 40%. He holds an MD from the University of Ghana Medical School and an MPH from the London School of Hygiene & Tropical Medicine. His leadership philosophy centers on community empowerment and sustainable healthcare solutions.'
    },
    {
      name: 'Abena Osei-Bonsu',
      role: 'Director of Programs',
      position: 'Head of Program Development',
      email: 'a.osei-bonsu@firmhealth.org',
      image: 'https://images.unsplash.com/photo-1589156280159-27698a70f29e?w=400&h=400&fit=crop&crop=face',
      shortBio: 'Expert in designing and implementing community health programs across rural Ghana.',
      fullBio: 'Abena Osei-Bonsu leads the design and implementation of all health programs at Firm Health Foundation. With over 15 years of experience in program development, she has successfully launched initiatives that have reached over 200,000 beneficiaries. Abena specializes in maternal and child health programs and has been instrumental in establishing partnerships with local health facilities. She holds a Master\'s in Public Health from Johns Hopkins University and is a certified Project Management Professional. Her innovative approach to community engagement has been recognized by USAID and the Ghana Health Service.'
    },
    {
      name: 'Samuel Adjei',
      role: 'Finance Manager',
      position: 'Head of Finance & Administration',
      email: 's.adjei@firmhealth.org',
      image: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400&h=400&fit=crop&crop=face',
      shortBio: 'Certified accountant ensuring transparent financial management and donor compliance.',
      fullBio: 'Samuel Adjei manages all financial operations, budgeting, and compliance at Firm Health Foundation. As a Chartered Accountant with expertise in non-profit financial management, he ensures that every cedi is accounted for and maximized for impact. Samuel has over 12 years of experience in financial management, including 8 years with international NGOs. He has successfully managed budgets exceeding $5 million and has maintained clean audit records throughout his tenure. Samuel holds an MBA in Finance from the Ghana Institute of Management and Public Administration and is a member of the Institute of Chartered Accountants Ghana.'
    },
    {
      name: 'Dr. Esi Forson',
      role: 'Medical Director',
      position: 'Chief Medical Officer',
      email: 'e.forson@firmhealth.org',
      image: 'https://images.unsplash.com/photo-1551836022-deb4988cc6c0?w=400&h=400&fit=crop&crop=face',
      shortBio: 'Physician leading clinical programs and ensuring quality healthcare delivery standards.',
      fullBio: 'Dr. Esi Forson serves as the Medical Director, overseeing all clinical programs and ensuring the highest standards of healthcare delivery. A graduate of the Kwame Nkrumah University of Science and Technology Medical School, she completed her residency in Family Medicine and has additional training in Tropical Medicine. Dr. Forson has worked in rural healthcare for over 16 years and has trained hundreds of community health workers. She developed our clinical protocols and quality assurance frameworks that have become models for other NGOs. Her research on community-based healthcare has been published in several international journals.'
    },
    {
      name: 'Kofi Asante',
      role: 'Operations Manager',
      position: 'Head of Operations & Logistics',
      email: 'k.asante@firmhealth.org',
      image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&h=400&fit=crop&crop=face',
      shortBio: 'Logistics expert managing field operations and supply chain for health programs.',
      fullBio: 'Kofi Asante manages all field operations, logistics, and supply chain functions for Firm Health Foundation. With a background in supply chain management and 14 years of experience in humanitarian logistics, he ensures that medical supplies and equipment reach even the most remote communities. Kofi previously worked with Médecins Sans Frontières and the World Food Programme, managing complex logistics operations in challenging environments. He holds a degree in Supply Chain Management from the University of Ghana Business School and certifications in Humanitarian Logistics from the Fritz Institute. His efficiency improvements have reduced operational costs by 25% while expanding our reach.'
    },
    {
      name: 'Adwoa Poku',
      role: 'Communications Manager',
      position: 'Head of Communications & PR',
      email: 'a.poku@firmhealth.org',
      image: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=400&h=400&fit=crop&crop=face',
      shortBio: 'Communications strategist amplifying our impact stories and stakeholder engagement.',
      fullBio: 'Adwoa Poku leads all communications, public relations, and digital engagement strategies for Firm Health Foundation. With over 10 years of experience in nonprofit communications, she has transformed our storytelling approach and significantly increased our visibility. Adwoa manages our media relations, social media presence, and donor communications. She previously worked as a journalist covering health issues in West Africa and later transitioned to communications roles with UNICEF and the African Union. She holds a Master\'s in Strategic Communications from the University of Westminster and has won multiple awards for her health communication campaigns.'
    },
    {
      name: 'Yaw Boateng',
      role: 'HR & Volunteer Coordinator',
      position: 'Head of Human Resources',
      email: 'y.boateng@firmhealth.org',
      image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop&crop=face',
      shortBio: 'HR professional managing talent acquisition and volunteer programs across all regions.',
      fullBio: 'Yaw Boateng oversees human resources management and volunteer coordination at Firm Health Foundation. He manages recruitment, training, and development of staff, as well as our network of over 500 volunteers across Ghana. Yaw has 11 years of experience in HR management, with a specialization in nonprofit organizations. He has developed comprehensive volunteer management systems and training programs that have been adopted by partner organizations. Yaw holds a degree in Human Resource Management from the University of Cape Coast and professional certifications from the Society for Human Resource Management. His people-centered approach has resulted in high staff retention rates and an engaged volunteer community.'
    },
  ];

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
          <div className="board-grid">
            {managementTeam.map((member, index) => (
              <div
                key={index}
                ref={setMemberRef(index)}
                className={`board-card ${visibleMembers.has(index) ? 'animate-scale-up' : 'animate-hidden'}`}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <div className="board-card-image-wrapper">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="board-card-image"
                  />
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
