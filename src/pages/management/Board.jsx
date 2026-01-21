import { useState, useEffect } from 'react';
import { useScrollAnimation, useMultipleScrollAnimation } from '../../hooks/useScrollAnimation';
import '../../styles/PageLayout.css';

function Board() {
  const [heroRef, heroVisible] = useScrollAnimation({ threshold: 0.2 });
  const [introRef, introVisible] = useScrollAnimation();
  const [setMemberRef, visibleMembers] = useMultipleScrollAnimation(7);
  const [selectedMember, setSelectedMember] = useState(null);

  const boardMembers = [
    {
      name: 'Dr. Amelia Johnson',
      role: 'Chairperson',
      position: 'Board Chair',
      email: 'a.johnson@firmhealth.org',
      image: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=400&h=400&fit=crop&crop=face',
      shortBio: 'Over 25 years of experience in public health policy and administration.',
      fullBio: 'Dr. Amelia Johnson brings over 25 years of distinguished experience in public health policy and administration. She has served as a senior advisor to multiple government health agencies and has been instrumental in shaping health policies that have benefited millions. Her expertise spans healthcare systems management, policy development, and strategic planning. Dr. Johnson holds a PhD in Public Health from Harvard University and an MD from Johns Hopkins. She has published extensively on healthcare accessibility and equity, and her work has been recognized with numerous awards including the Global Health Leadership Award in 2023.'
    },
    {
      name: 'Prof. Michael Chen',
      role: 'Vice Chairperson',
      position: 'Deputy Board Chair',
      email: 'm.chen@firmhealth.org',
      image: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=400&h=400&fit=crop&crop=face',
      shortBio: 'Leading researcher in community health and epidemiology.',
      fullBio: 'Professor Michael Chen is a world-renowned researcher in community health and epidemiology. Currently serving as the Head of Epidemiology at the University of Ghana, he has led groundbreaking research on disease prevention in Sub-Saharan Africa. His work on malaria prevention strategies has been adopted by WHO as a model for community-based health interventions. Prof. Chen has authored over 150 peer-reviewed publications and has mentored dozens of doctoral students who now lead health initiatives worldwide. He received his doctorate from Oxford University and has been a Fulbright Scholar.'
    },
    {
      name: 'Sarah Williams',
      role: 'Secretary',
      position: 'Board Secretary',
      email: 's.williams@firmhealth.org',
      image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=400&fit=crop&crop=face',
      shortBio: 'Expert in non-profit governance and organizational development.',
      fullBio: 'Sarah Williams is an expert in non-profit governance and organizational development with over 18 years of experience in the sector. She has helped establish governance frameworks for numerous health-focused NGOs across Africa and has been a consultant for the World Bank on institutional capacity building. Sarah holds an MBA from INSEAD and a Master\'s in Non-Profit Management from Columbia University. She is a certified governance professional and regularly speaks at international conferences on best practices in NGO management. Her commitment to transparency and accountability has been instrumental in building trust with our stakeholders.'
    },
    {
      name: 'Dr. James Okonkwo',
      role: 'Treasurer',
      position: 'Chief Financial Steward',
      email: 'j.okonkwo@firmhealth.org',
      image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&h=400&fit=crop&crop=face',
      shortBio: 'Financial expert with background in healthcare economics.',
      fullBio: 'Dr. James Okonkwo is a distinguished financial expert with specialized knowledge in healthcare economics. With a PhD in Health Economics from the London School of Economics, he has spent over 20 years analyzing healthcare financing models and developing sustainable funding strategies for health organizations. Previously, he served as the CFO of a major teaching hospital and has consulted for international health organizations including UNICEF and the Global Fund. Dr. Okonkwo\'s expertise ensures that our financial resources are managed with the highest standards of integrity and efficiency, maximizing the impact of every donation we receive.'
    },
    {
      name: 'Mary Thompson',
      role: 'Board Member',
      position: 'Community Relations Director',
      email: 'm.thompson@firmhealth.org',
      image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&h=400&fit=crop&crop=face',
      shortBio: 'Community advocate with 15 years in volunteer coordination.',
      fullBio: 'Mary Thompson is a passionate community advocate who has dedicated 15 years to volunteer coordination and community engagement. She pioneered the community health volunteer program that now operates in over 50 districts across Ghana. Mary\'s grassroots approach to health education has earned her recognition from the Ministry of Health and several community excellence awards. She holds a degree in Social Work from the University of Ghana and has completed advanced training in community mobilization. Her deep connections with local communities ensure that our programs are culturally appropriate and community-driven.'
    },
    {
      name: 'Dr. Robert Martinez',
      role: 'Board Member',
      position: 'International Partnerships Lead',
      email: 'r.martinez@firmhealth.org',
      image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face',
      shortBio: 'Specialist in global health initiatives and partnerships.',
      fullBio: 'Dr. Robert Martinez is a specialist in global health initiatives and international partnerships. With experience spanning five continents, he has facilitated collaborations between health organizations, governments, and private sector entities. Dr. Martinez previously served as the Regional Director for Health Partnerships at the African Development Bank and has been instrumental in securing multi-million dollar funding for health initiatives. He holds an MD from the University of Barcelona and a Master\'s in Global Health from Duke University. His extensive network and diplomatic skills have opened doors for numerous partnerships that have expanded our reach and impact.'
    },
    {
      name: 'Dr. Nana Ama Asante',
      role: 'Board Member',
      position: 'Medical Advisory Chair',
      email: 'n.asante@firmhealth.org',
      image: 'https://images.unsplash.com/photo-1594824476967-48c8b964273f?w=400&h=400&fit=crop&crop=face',
      shortBio: 'Renowned physician specializing in maternal and child health.',
      fullBio: 'Dr. Nana Ama Asante is a renowned physician specializing in maternal and child health with over 22 years of clinical and research experience. She currently serves as the Head of Obstetrics and Gynecology at Korle Bu Teaching Hospital, Ghana\'s largest medical facility. Dr. Asante has been at the forefront of reducing maternal mortality rates in Ghana through innovative community-based interventions. She has received the Presidential Award for Excellence in Healthcare and has been featured in international medical journals for her pioneering work. Her clinical expertise ensures that our health programs meet the highest medical standards and address the most pressing health needs of the communities we serve.'
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
        className={`page-hero board-hero ${heroVisible ? 'animate-fade-in' : 'animate-hidden'}`}
        ref={heroRef}
      >
        <div className="board-hero-background"></div>
        <div className="board-hero-content">
          <h1>Board of Directors</h1>
          <p>Meet the dedicated leaders guiding our mission to bring healthcare to communities in need.</p>
        </div>
      </section>

      <section className="page-content">
        <div
          className={`intro-text ${introVisible ? 'animate-fade-up' : 'animate-hidden'}`}
          ref={introRef}
        >
          <p>
            Our Board of Directors comprises distinguished professionals from diverse backgrounds,
            united by a shared commitment to improving global health outcomes. They provide strategic
            oversight and ensure our organization remains true to its mission while adapting to
            evolving healthcare challenges.
          </p>
          <p>
            Each board member brings unique expertise and perspectives, contributing to our
            comprehensive approach to community health initiatives. Together, they guide our
            policies, approve major initiatives, and ensure accountability in all our operations.
          </p>
        </div>

        <div className="content-section">
          <h2 className="section-title">Our Leadership</h2>
          <p className="section-subtitle">Dedicated professionals committed to transforming healthcare access</p>
          <div className="board-grid">
            {boardMembers.map((member, index) => (
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

export default Board;
