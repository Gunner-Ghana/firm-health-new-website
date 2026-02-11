import { useScrollAnimation, useMultipleScrollAnimation } from '../hooks/useScrollAnimation';
import '../styles/PageLayout.css';
import './ReportDownload.css';

function ReportDownload() {
  const [heroRef, heroVisible] = useScrollAnimation({ threshold: 0.2 });
  const [setCardRef, visibleCards] = useMultipleScrollAnimation(3);

  const reports = [
    {
      title: '2024 3rd Quarter Blood Donation Report',
      description: 'Report on the third quarter blood donation drive supported by Ghana Gas in Nzulezo, Western Region. Documents the collection results, community participation, and impact on local hospital blood supply.',
      date: 'Q3 2024',
      category: 'Blood Donation',
      color: '#ef4444',
      fileName: 'Blood_Donation_Report_Q3_2024.pdf'
    },
    {
      title: '2023 Blood Donation Report',
      description: 'Comprehensive report on the 2023 blood donation campaign supported by Goldfields Ghana Foundation and Rotary Club of Tarkwa. Covers the drive targeting 1,000 units of blood and its outcomes.',
      date: '2023',
      category: 'Blood Donation',
      color: '#ef4444',
      fileName: 'Blood_Donation_Report_2023.pdf'
    },
    {
      title: '2024 Drexel ICA Report',
      description: 'Detailed report on the Drexel University ICA (Intensive Clinical Attachment) Program held in Tarkwa. Documents the Health and Research Summer Internship Program experiences and outcomes.',
      date: '2024',
      category: 'ICA Programme',
      color: '#10b981',
      fileName: 'Drexel_ICA_Report_2024.pdf'
    }
  ];

  return (
    <div className="page-container">
      <section
        className={`page-hero ${heroVisible ? 'animate-fade-in' : 'animate-hidden'}`}
        ref={heroRef}
        style={{ background: 'linear-gradient(135deg, #1e40af 0%, #3b82f6 50%, #60a5fa 100%)' }}
      >
        <h1>Download Reports</h1>
        <p>Access our published reports and documentation on foundation programs and initiatives.</p>
      </section>

      <section className="page-content">
        <div className="reports-grid">
          {reports.map((report, index) => (
            <div
              key={index}
              ref={setCardRef(index)}
              className={`report-card glass-card ${visibleCards.has(index) ? 'animate-fade-up' : 'animate-hidden'}`}
              style={{ transitionDelay: `${index * 150}ms` }}
            >
              <div className="report-card-header">
                <span className="report-category" style={{ backgroundColor: `${report.color}15`, color: report.color }}>
                  {report.category}
                </span>
                <span className="report-date">{report.date}</span>
              </div>

              <div className="report-icon">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
                </svg>
              </div>

              <h3>{report.title}</h3>
              <p>{report.description}</p>

              <a
                href={`/reports/${report.fileName}`}
                download
                className="report-download-btn"
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" />
                </svg>
                Download PDF
              </a>
            </div>
          ))}
        </div>

        <div className="content-section" style={{ marginTop: '3rem', textAlign: 'center' }}>
          <div className="info-card" style={{ display: 'inline-block', maxWidth: '600px', padding: '2.5rem' }}>
            <h3 style={{ marginBottom: '1rem' }}>Need More Information?</h3>
            <p style={{ marginBottom: '1.5rem' }}>
              For additional reports or specific documentation, please contact us directly.
              We are happy to share information about our programs and impact.
            </p>
            <a
              href="/contact"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
                padding: '0.875rem 1.75rem',
                background: 'linear-gradient(135deg, #3b82f6 0%, #1e40af 100%)',
                color: 'white',
                borderRadius: '50px',
                fontWeight: '600',
                textDecoration: 'none',
              }}
            >
              Contact Us
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

export default ReportDownload;
