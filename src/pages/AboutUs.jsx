import { useMemo } from 'react';
import { useScrollAnimation, useMultipleScrollAnimation } from '../hooks/useScrollAnimation';
import { usePublishedSponsors } from '../hooks/useSponsorDB';
import sponsor2 from '../assets/sponsors/2.png';
import sponsor5 from '../assets/sponsors/5.png';
import sponsor6 from '../assets/sponsors/6.png';
import sponsorGhanaGas from '../assets/sponsors/Ghanagas1.jpg';
import sponsor7 from '../assets/sponsors/7.png';
import sponsor8 from '../assets/sponsors/8.png';
import sponsor9 from '../assets/sponsors/9.png';
import './AboutUs.css';

function AboutUs() {
  const [heroRef, heroVisible] = useScrollAnimation({ threshold: 0.2 });
  const [aboutRef, aboutVisible] = useScrollAnimation();
  const [setMissionVisionRef, visibleMissionVision] = useMultipleScrollAnimation(2);
  const [valuesTitleRef, valuesTitleVisible] = useScrollAnimation();
  const [setValueCardRef, visibleValueCards] = useMultipleScrollAnimation(6);
  const [collaborationTitleRef, collaborationTitleVisible] = useScrollAnimation();
  const [setCollabRef, visibleCollabs] = useMultipleScrollAnimation(18);
  const [goalsTitleRef, goalsTitleVisible] = useScrollAnimation();
  const [setGoalRef, visibleGoals] = useMultipleScrollAnimation(3);
  const [achievementsTitleRef, achievementsTitleVisible] = useScrollAnimation();
  const [setAchievementRef, visibleAchievements] = useMultipleScrollAnimation(4);
  const [sponsorsTitleRef, sponsorsTitleVisible] = useScrollAnimation();

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
    const dynamic = (dbSponsors || []).map(s => ({ name: s.name, image: s.image }));
    return [...staticSponsors, ...dynamic];
  }, [dbSponsors]);

  const coreValues = [
    {
      title: 'Wellness',
      description: 'We believe in the importance of comprehensive wellness that encompasses physical, mental, emotional, and social well-being.',
      icon: '💚'
    },
    {
      title: 'Empowerment',
      description: 'We empower individuals to take control of their health by providing them with the information and tools they need to make informed decisions.',
      icon: '💪'
    },
    {
      title: 'Equity',
      description: 'We advocate for equitable access to wellness resources and services, ensuring that underserved and marginalized communities are not left behind.',
      icon: '⚖️'
    },
    {
      title: 'Collaboration',
      description: 'We collaborate with partners, organizations, and communities to create a collective impact on wellness advocacy.',
      icon: '🤝'
    },
    {
      title: 'Education',
      description: 'We provide educational programs and resources to raise awareness about the importance of wellness and self-care.',
      icon: '📚'
    },
    {
      title: 'Flexibility & Innovation',
      description: 'Embrace flexibility and innovation in wellness advocacy, adapting to changing needs for effective outcomes.',
      icon: '💡'
    },
  ];

  const collaborators = [
    { name: 'National Youth Authority Ghana', abbr: 'NYA' },
    { name: 'Ghana Kidney Foundation', abbr: 'GKF' },
    { name: 'Apinto Government Hospital', abbr: 'AGH' },
    { name: 'Fiaseman Rural Bank PLC', abbr: 'FRB' },
    { name: 'National Blood Service', abbr: 'NBS' },
    { name: 'Drexel University', abbr: 'DU' },
    { name: 'University Of Pennsylvania', abbr: 'UPenn' },
    { name: 'New Government Hospital, Bogoso', abbr: 'NGH' },
    { name: 'Tarkwa Community Hospital', abbr: 'TCH' },
    { name: 'Precious Minerals Marketing Co.', abbr: 'PMMC' },
    { name: 'Gold Fields Ghana Foundation', abbr: 'GFGF' },
    { name: 'Rotary Club of Tarkwa', abbr: 'RC' },
    { name: 'Bogoso Government Hospital', abbr: 'BGH' },
    { name: 'Health Spring Pharmacy', abbr: 'HSP' },
    { name: 'Nephro Ghana Limited', abbr: 'NGL' },
    { name: 'Mobik Energy', abbr: 'ME' },
    { name: 'Classic Christken Limited', abbr: 'CCL' },
    { name: 'Intertek Ghana Limited', abbr: 'IGL' },
  ];

  const goals = [
    {
      type: 'Short Term',
      period: '0-3 Years',
      icon: '🎯',
      color: '#10b981',
      items: [
        'Increase public awareness in the Tarkwa-Nsuaem municipality and beyond of key public health and wellness issues through radio and social media outreach.',
        'Engage with local communities through workshops, seminars, and events to educate and empower individuals about wellness practices.',
        'Establish partnerships with local organizations, healthcare providers, and community leaders to amplify the impact of wellness initiatives.',
        'Secure short-term funding and resources to support initial advocacy campaigns and wellness programs.',
      ]
    },
    {
      type: 'Medium Term',
      period: '3-6 Years',
      icon: '📈',
      color: '#3b82f6',
      items: [
        'Expand wellness programs to reach a larger and more diverse audience, focusing on both municipal and district communities.',
        'Enhance organizational capacity by providing training to staff, volunteers, and community members involved in advocacy and wellness initiatives.',
        'Implement robust monitoring and evaluation systems to assess the effectiveness of programs and advocacy efforts.',
        'Collaborate with other NGOs, government bodies, and international organizations to address wellness issues comprehensively.',
      ]
    },
    {
      type: 'Long Term',
      period: '6+ Years',
      icon: '🌟',
      color: '#8b5cf6',
      items: [
        'Achieve sustainable and long-lasting changes in policies, practices, and societal attitudes towards wellness and mental health.',
        'Establish the NGO as a key player in national discussions and policies related to wellness and advocacy.',
        'Contribute to global conversations on wellness by sharing best practices, research findings, and successful advocacy strategies.',
        'Invest in research initiatives and innovative approaches to continuously improve wellness programs and advocacy strategies.',
        'Foster a culture of wellness, resilience, and empowerment within communities, promoting long-term positive behavioral changes.',
      ]
    },
  ];

  const achievements = [
    {
      title: 'Public Health Radio Education Program',
      description: 'Broadcasting on Dynamite FM (88.9) under the title "Wapɔwmu dzen yɛ hɛn Dadwen" (Your Health, Our Concern). The program has been running since March 2013 to present, reaching thousands of listeners with vital health information.',
      date: 'March 2013 - Present',
      impact: 'Ongoing weekly broadcasts',
      icon: '📻'
    },
    {
      title: 'Community Health Screenings',
      description: 'Conducted extensive screening activities for over 15,000 individuals across numerous locations including University of Mines & Technology, Tarkwa, Huni-Valley, Dzodze in Volta Region, Konfoase in Sekondi-Takoradi, Tarkwa Local Prisons, Ampain Refugee Camp, Nzulezu, Atuabo, and Axim.',
      date: '2013 - 2020',
      impact: '15,000+ individuals screened',
      icon: '🏥'
    },
    {
      title: 'Monthly Health Walk (FIRMWalk)',
      description: 'A 5-kilometer walking initiative that commenced in May 2016, designed to encourage physical activity, build community connections, and promote healthier lifestyles among residents.',
      date: 'May 2016 - Present',
      impact: 'Monthly community engagement',
      icon: '🚶'
    },
    {
      title: 'Annual Blood Donation Exercise',
      description: 'Initiated in 2022 as part of ongoing community well-being enhancement efforts, organizing blood donation drives to support local blood banks and save lives.',
      date: '2022 - Present',
      impact: 'Annual blood drives',
      icon: '🩸'
    },
  ];

  return (
    <div className="about">
      {/* Hero Banner Section */}
      <section
        className={`about-hero ${heroVisible ? 'animate-fade-in' : 'animate-hidden'}`}
        ref={heroRef}
      >
        <div className="about-hero-background">
          <div className="about-hero-overlay"></div>
        </div>
        <div className="about-hero-content">
          <h1>About Firm Health Ghana Foundation</h1>
          <p>Promoting holistic wellness through advocacy, education, and community engagement.</p>
        </div>
      </section>

      {/* About Description Section */}
      <section
        className={`about-description ${aboutVisible ? 'animate-fade-up' : 'animate-hidden'}`}
        ref={aboutRef}
      >
        <div className="about-description-content">
          <h2>Who We Are</h2>
          <p>
            Firm Health Ghana Foundation is committed to promoting holistic wellness through advocacy,
            education, and community engagement. Our mission is to empower individuals and communities
            to prioritize their physical, mental, and emotional well-being.
          </p>
          <p>
            Our approach combines direct healthcare services with community education and advocacy. We work
            closely with local communities, healthcare workers, and government agencies to create sustainable
            health solutions. Through our various programs including health screenings, radio education, and
            community outreach, we aim to ensure that quality health resources reach those who need them most.
          </p>
        </div>
      </section>

      {/* Mission & Vision Section */}
      <section className="mission-vision">
        <div
          ref={setMissionVisionRef(0)}
          className={`mission-vision-card mission ${visibleMissionVision.has(0) ? 'animate-slide-right' : 'animate-hidden'}`}
        >
          <div className="mission-vision-icon">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.59 14.37a6 6 0 01-5.84 7.38v-4.8m5.84-2.58a14.98 14.98 0 006.16-12.12A14.98 14.98 0 009.631 8.41m5.96 5.96a14.926 14.926 0 01-5.841 2.58m-.119-8.54a6 6 0 00-7.381 5.84h4.8m2.581-5.84a14.927 14.927 0 00-2.58 5.84m2.699 2.7c-.103.021-.207.041-.311.06a15.09 15.09 0 01-2.448-2.448 14.9 14.9 0 01.06-.312m-2.24 2.39a4.493 4.493 0 00-1.757 4.306 4.493 4.493 0 004.306-1.758M16.5 9a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z" />
            </svg>
          </div>
          <h2>Our Mission</h2>
          <p>
            Firm Health Ghana Foundation is committed to promoting holistic wellness through advocacy,
            education, and community engagement. Our mission is to empower individuals and communities
            to prioritize their physical, mental, and emotional well-being.
          </p>
        </div>
        <div
          ref={setMissionVisionRef(1)}
          className={`mission-vision-card vision ${visibleMissionVision.has(1) ? 'animate-slide-left' : 'animate-hidden'}`}
        >
          <div className="mission-vision-icon">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
          </div>
          <h2>Our Vision</h2>
          <p>
            We envision a world where every person has access to the resources, knowledge, and support
            they need to lead healthy and fulfilling lives.
          </p>
        </div>
      </section>

      {/* Core Values Section */}
      <section className="values">
        <h2
          ref={valuesTitleRef}
          className={valuesTitleVisible ? 'animate-fade-up' : 'animate-hidden'}
        >
          Our Core Values
        </h2>
        <p className="section-subtitle">The principles that guide everything we do</p>
        <div className="values-grid">
          {coreValues.map((value, index) => (
            <div
              key={index}
              ref={setValueCardRef(index)}
              className={`value-card ${visibleValueCards.has(index) ? 'animate-scale-up' : 'animate-hidden'}`}
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              <span className="value-icon">{value.icon}</span>
              <h3>{value.title}</h3>
              <p>{value.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Collaboration Section */}
      <section className="collaboration">
        <h2
          ref={collaborationTitleRef}
          className={collaborationTitleVisible ? 'animate-fade-up' : 'animate-hidden'}
        >
          Organizations We Collaborate With
        </h2>
        <p className="section-subtitle">
          Together with our partners, we amplify our impact and reach more communities
        </p>
        <div className="collaboration-grid">
          {collaborators.map((collab, index) => (
            <div
              key={index}
              ref={setCollabRef(index)}
              className={`collaboration-card ${visibleCollabs.has(index) ? 'animate-fade-up' : 'animate-hidden'}`}
              style={{ transitionDelay: `${index * 50}ms` }}
            >
              <div className="collab-logo">{collab.abbr}</div>
              <span className="collab-name">{collab.name}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Goals Section */}
      <section className="goals">
        <h2
          ref={goalsTitleRef}
          className={goalsTitleVisible ? 'animate-fade-up' : 'animate-hidden'}
        >
          Our Goals
        </h2>
        <p className="section-subtitle">Strategic objectives driving our mission forward</p>
        <div className="goals-grid">
          {goals.map((goal, index) => (
            <div
              key={index}
              ref={setGoalRef(index)}
              className={`goal-card ${visibleGoals.has(index) ? 'animate-fade-up' : 'animate-hidden'}`}
              style={{
                transitionDelay: `${index * 150}ms`,
                '--goal-color': goal.color
              }}
            >
              <div className="goal-header">
                <span className="goal-icon">{goal.icon}</span>
                <div className="goal-badge" style={{ backgroundColor: `${goal.color}20`, color: goal.color }}>
                  {goal.period}
                </div>
              </div>
              <h3>{goal.type} Goals</h3>
              <ul className="goal-list">
                {goal.items.map((item, i) => (
                  <li key={i}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                    </svg>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* Past Activities & Achievements Section */}
      <section className="achievements">
        <h2
          ref={achievementsTitleRef}
          className={achievementsTitleVisible ? 'animate-fade-up' : 'animate-hidden'}
        >
          Past Activities & Achievements
        </h2>
        <p className="section-subtitle">Milestones that mark our journey of impact</p>
        <div className="achievements-grid">
          {achievements.map((achievement, index) => (
            <div
              key={index}
              ref={setAchievementRef(index)}
              className={`achievement-card ${visibleAchievements.has(index) ? 'animate-slide-right' : 'animate-hidden'}`}
              style={{ transitionDelay: `${index * 150}ms` }}
            >
              <div className="achievement-icon">{achievement.icon}</div>
              <div className="achievement-content">
                <span className="achievement-date">{achievement.date}</span>
                <h3>{achievement.title}</h3>
                <p>{achievement.description}</p>
                <div className="achievement-impact">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z" />
                  </svg>
                  {achievement.impact}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Sponsors Section */}
      <section className="about-sponsors">
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
    </div>
  );
}

export default AboutUs;
