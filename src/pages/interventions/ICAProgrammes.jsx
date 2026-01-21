import { useState } from 'react';
import { useScrollAnimation, useMultipleScrollAnimation } from '../../hooks/useScrollAnimation';
import '../../styles/PageLayout.css';

function ICAProgrammes() {
  const [heroRef, heroVisible] = useScrollAnimation({ threshold: 0.2 });
  const [introRef, introVisible] = useScrollAnimation();
  const [accordionTitleRef, accordionTitleVisible] = useScrollAnimation();
  const [setAccordionRef, visibleAccordions] = useMultipleScrollAnimation(8);
  const [outlineTitleRef, outlineTitleVisible] = useScrollAnimation();
  const [setDayRef, visibleDays] = useMultipleScrollAnimation(9);
  const [openAccordion, setOpenAccordion] = useState(null);

  const toggleAccordion = (index) => {
    setOpenAccordion(openAccordion === index ? null : index);
  };

  const processes = [
    {
      title: 'Visa Application Requirements',
      content: 'To participate in the ICA Programme, international volunteers need to obtain the appropriate visa. Required documents include: a valid passport with at least 6 months validity, completed visa application form, passport-sized photographs, proof of accommodation, return flight tickets, and a letter of invitation from Firm Health Foundation. We provide comprehensive support throughout the visa application process.',
      icon: '📋'
    },
    {
      title: 'Travel & Flight Arrangements',
      content: 'Participants are responsible for booking their flights to Ghana. We recommend arriving at Kotoka International Airport (ACC) in Accra. Our team will provide airport pickup services for all registered participants. We can also assist with flight recommendations and group booking discounts for teams traveling together.',
      icon: '✈️'
    },
    {
      title: 'Accommodation & Logistics',
      content: 'Comfortable accommodation is arranged for all participants throughout the programme duration. Lodging includes shared rooms with basic amenities, daily meals (breakfast, lunch, and dinner), and transportation to all programme locations. All accommodation facilities are vetted for safety and comfort.',
      icon: '🏨'
    },
    {
      title: 'Health & Safety Protocols',
      content: 'Participant safety is our top priority. All participants must have valid travel insurance covering medical emergencies. We recommend vaccinations for Yellow Fever (mandatory), Hepatitis A & B, Typhoid, and Malaria prophylaxis. Our team includes trained first-aid responders, and we maintain partnerships with local healthcare facilities for emergencies.',
      icon: '🏥'
    },
    {
      title: 'Registration & Payment Process',
      content: 'Registration opens 3 months before each programme cycle. The registration process includes: online application submission, document verification, payment of programme fees (covering accommodation, meals, local transport, and programme materials), and confirmation of participation. Early bird discounts are available for registrations completed 2 months in advance.',
      icon: '💳'
    },
    {
      title: 'Pre-Departure Orientation',
      content: 'All registered participants receive a comprehensive pre-departure orientation package including: cultural sensitivity training materials, packing guidelines, local customs and etiquette guide, emergency contact information, detailed programme itinerary, and a virtual orientation session one week before departure.',
      icon: '📚'
    },
    {
      title: 'On-Ground Support & Coordination',
      content: 'Upon arrival, participants are assigned to coordination teams led by experienced programme officers. Support includes: 24/7 emergency contact line, daily briefings and debriefings, local SIM cards for communication, translation services where needed, and continuous guidance throughout all activities.',
      icon: '🤝'
    },
    {
      title: 'Certification & Post-Programme',
      content: 'Upon successful completion of the programme, participants receive: Certificate of Participation from Firm Health Foundation, detailed reference letter upon request, access to our alumni network, opportunities for future programmes, and documentation of volunteer hours for academic or professional credit purposes.',
      icon: '🎓'
    },
  ];

  const programOutline = [
    {
      day: 1,
      title: 'Arrival & Orientation',
      activities: [
        'Airport pickup and transfer to accommodation',
        'Welcome dinner and team introductions',
        'Programme overview and expectations',
        'Distribution of programme materials',
        'Rest and acclimatization'
      ]
    },
    {
      day: 2,
      title: 'Cultural Immersion & Training',
      activities: [
        'Ghanaian cultural orientation session',
        'Local language basics (Twi/Ga phrases)',
        'Community health worker training',
        'Medical protocols and safety briefing',
        'Team building activities'
      ]
    },
    {
      day: 3,
      title: 'Community Health Screening',
      activities: [
        'Travel to partner community',
        'Setup of health screening stations',
        'Blood pressure and glucose testing',
        'BMI assessment and health counseling',
        'Distribution of health education materials'
      ]
    },
    {
      day: 4,
      title: 'Maternal & Child Health Focus',
      activities: [
        'Prenatal care sessions for expectant mothers',
        'Child nutrition assessment',
        'Vaccination awareness campaign',
        'Distribution of maternal health kits',
        'One-on-one health consultations'
      ]
    },
    {
      day: 5,
      title: 'Health Education Outreach',
      activities: [
        'School health education programme',
        'Interactive disease prevention workshops',
        'Hygiene and sanitation demonstrations',
        'Distribution of hygiene supplies',
        'Community feedback session'
      ]
    },
    {
      day: 6,
      title: 'Medical Outreach Day',
      activities: [
        'Full-scale medical outreach',
        'General consultations and referrals',
        'Eye screening and reading glasses distribution',
        'Dental health awareness',
        'Medication distribution for common ailments'
      ]
    },
    {
      day: 7,
      title: 'Mental Health & Wellness',
      activities: [
        'Mental health awareness sessions',
        'Stress management workshops',
        'Youth mentorship programme',
        'Community leaders engagement',
        'Support group facilitation'
      ]
    },
    {
      day: 8,
      title: 'Sustainability & Handover',
      activities: [
        'Training of community health volunteers',
        'Handover of medical supplies',
        'Documentation and reporting',
        'Community appreciation ceremony',
        'Cultural exchange evening'
      ]
    },
    {
      day: 9,
      title: 'Reflection & Departure',
      activities: [
        'Programme reflection and feedback session',
        'Certificate presentation ceremony',
        'Group photo and documentation',
        'Farewell lunch',
        'Airport transfers for departing participants'
      ]
    },
  ];

  return (
    <div className="page-container">
      <section
        className={`page-hero ica-hero ${heroVisible ? 'animate-fade-in' : 'animate-hidden'}`}
        ref={heroRef}
      >
        <div className="ica-hero-background"></div>
        <div className="ica-hero-content">
          <h1>ICA Programmes</h1>
          <p>Integrated Community Action programmes bringing comprehensive healthcare to underserved communities.</p>
        </div>
      </section>

      <section className="page-content">
        {/* Programme Description */}
        <div
          className={`intro-text ${introVisible ? 'animate-fade-up' : 'animate-hidden'}`}
          ref={introRef}
        >
          <h2 style={{ marginBottom: '1rem', color: '#1f2937' }}>About the ICA Programme</h2>
          <p>
            The Integrated Community Action (ICA) Programme is Firm Health Foundation's flagship
            initiative that brings together volunteers, healthcare professionals, and community
            members to deliver comprehensive healthcare services to underserved communities across Ghana.
          </p>
          <p>
            This intensive 9-day programme combines medical outreach, health education, and
            community engagement to create lasting impact. Participants gain hands-on experience
            in community health while contributing to meaningful change. The programme runs
            quarterly and welcomes both local and international volunteers who share our passion
            for accessible healthcare.
          </p>
          <p>
            Since its inception in 2018, the ICA Programme has served over 50,000 beneficiaries
            across 8 regions of Ghana, trained 500+ community health volunteers, and partnered
            with 15 healthcare organizations to expand our reach and impact.
          </p>
        </div>

        {/* Process Accordions */}
        <div className="content-section">
          <h2
            ref={accordionTitleRef}
            className={`section-title ${accordionTitleVisible ? 'animate-fade-up' : 'animate-hidden'}`}
          >
            Programme Processes & Requirements
          </h2>
          <p className="section-subtitle">Everything you need to know before joining the ICA Programme</p>

          <div className="accordion-container">
            {processes.map((process, index) => (
              <div
                key={index}
                ref={setAccordionRef(index)}
                className={`accordion-item ${visibleAccordions.has(index) ? 'animate-fade-up' : 'animate-hidden'} ${openAccordion === index ? 'active' : ''}`}
                style={{ transitionDelay: `${index * 80}ms` }}
              >
                <button
                  className="accordion-header"
                  onClick={() => toggleAccordion(index)}
                >
                  <div className="accordion-title">
                    <span className="accordion-icon">{process.icon}</span>
                    <span>{process.title}</span>
                  </div>
                  <svg
                    className={`accordion-arrow ${openAccordion === index ? 'rotated' : ''}`}
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={2}
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                  </svg>
                </button>
                <div className={`accordion-content ${openAccordion === index ? 'open' : ''}`}>
                  <p>{process.content}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 9-Day Programme Outline */}
        <div className="content-section">
          <h2
            ref={outlineTitleRef}
            className={`section-title ${outlineTitleVisible ? 'animate-fade-up' : 'animate-hidden'}`}
          >
            9-Day Programme Outline
          </h2>
          <p className="section-subtitle">A comprehensive journey of service, learning, and impact</p>

          <div className="programme-timeline">
            {programOutline.map((day, index) => (
              <div
                key={index}
                ref={setDayRef(index)}
                className={`timeline-item ${visibleDays.has(index) ? 'animate-slide-right' : 'animate-hidden'}`}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <div className="timeline-marker">
                  <span className="day-number">Day {day.day}</span>
                </div>
                <div className="timeline-content">
                  <h3>{day.title}</h3>
                  <ul>
                    {day.activities.map((activity, idx) => (
                      <li key={idx}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        {activity}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Call to Action */}
        <div className="ica-cta">
          <h3>Ready to Make a Difference?</h3>
          <p>Join our next ICA Programme and be part of the change in community healthcare.</p>
          <a href="/volunteer" className="ica-cta-btn">
            Register Now
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
            </svg>
          </a>
        </div>
      </section>
    </div>
  );
}

export default ICAProgrammes;
