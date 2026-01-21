import { useScrollAnimation } from '../../hooks/useScrollAnimation';
import '../../styles/PageLayout.css';

function Organogram() {
  const [heroRef, heroVisible] = useScrollAnimation({ threshold: 0.2 });
  const [chartRef, chartVisible] = useScrollAnimation();

  return (
    <div className="page-container">
      <section
        className={`page-hero ${heroVisible ? 'animate-fade-in' : 'animate-hidden'}`}
        ref={heroRef}
      >
        <h1>Organizational Structure</h1>
        <p>Understanding how our teams work together to achieve our mission.</p>
      </section>

      <section className="page-content">
        <div
          className={`organogram-container ${chartVisible ? 'animate-fade-up' : 'animate-hidden'}`}
          ref={chartRef}
        >
          <div className="organogram">
            {/* Level 1 - Board */}
            <div className="org-level">
              <div className="org-node primary">
                <h4>Board of Directors</h4>
                <p>Strategic Oversight</p>
              </div>
            </div>

            <div className="org-connector"></div>

            {/* Level 2 - Executive Director */}
            <div className="org-level">
              <div className="org-node primary">
                <h4>Executive Director</h4>
                <p>Dr. Amelia Johnson</p>
              </div>
            </div>

            <div className="org-connector"></div>

            {/* Level 3 - Department Heads */}
            <div className="org-connector-horizontal"></div>
            <div className="org-level">
              <div className="org-node">
                <h4>Medical Director</h4>
                <p>Healthcare Programs</p>
              </div>
              <div className="org-node">
                <h4>Operations Director</h4>
                <p>Logistics & Admin</p>
              </div>
              <div className="org-node">
                <h4>Programs Director</h4>
                <p>Community Initiatives</p>
              </div>
            </div>

            <div className="org-connector"></div>

            {/* Level 4 - Teams */}
            <div className="org-connector-horizontal"></div>
            <div className="org-level">
              <div className="org-node">
                <h4>Medical Team</h4>
                <p>Clinical Staff</p>
              </div>
              <div className="org-node">
                <h4>Outreach Team</h4>
                <p>Community Workers</p>
              </div>
              <div className="org-node">
                <h4>Education Team</h4>
                <p>Trainers</p>
              </div>
              <div className="org-node">
                <h4>Support Team</h4>
                <p>Admin & Logistics</p>
              </div>
            </div>

            <div className="org-connector"></div>

            {/* Level 5 - Volunteers */}
            <div className="org-level">
              <div className="org-node" style={{ minWidth: '300px' }}>
                <h4>Volunteers</h4>
                <p>Medical, Community & Support Volunteers</p>
              </div>
            </div>
          </div>
        </div>

        <div className="content-section" style={{ marginTop: '4rem' }}>
          <h2 className="section-title">How We Work</h2>
          <div className="feature-list">
            <div className="feature-item">
              <div className="feature-icon">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div className="feature-content">
                <h4>Clear Accountability</h4>
                <p>Each level has defined responsibilities and reporting structures.</p>
              </div>
            </div>
            <div className="feature-item">
              <div className="feature-icon">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 21L3 16.5m0 0L7.5 12M3 16.5h13.5m0-13.5L21 7.5m0 0L16.5 12M21 7.5H7.5" />
                </svg>
              </div>
              <div className="feature-content">
                <h4>Cross-Team Collaboration</h4>
                <p>Teams work together seamlessly to deliver integrated services.</p>
              </div>
            </div>
            <div className="feature-item">
              <div className="feature-icon">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
                </svg>
              </div>
              <div className="feature-content">
                <h4>Agile Decision Making</h4>
                <p>Empowered teams can make quick decisions in the field.</p>
              </div>
            </div>
            <div className="feature-item">
              <div className="feature-icon">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 18v-5.25m0 0a6.01 6.01 0 001.5-.189m-1.5.189a6.01 6.01 0 01-1.5-.189m3.75 7.478a12.06 12.06 0 01-4.5 0m3.75 2.383a14.406 14.406 0 01-3 0M14.25 18v-.192c0-.983.658-1.823 1.508-2.316a7.5 7.5 0 10-7.517 0c.85.493 1.509 1.333 1.509 2.316V18" />
                </svg>
              </div>
              <div className="feature-content">
                <h4>Volunteer Integration</h4>
                <p>Volunteers are valued members of our organizational family.</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Organogram;
