import { useVolunteerCount } from '../../hooks/useVolunteerDB';
import { useBlogCount } from '../../hooks/useBlogDB';
import AdminLayout from '../../components/AdminLayout';
import './AdminOverview.css';

function AdminOverview() {
  const volunteerCount = useVolunteerCount();
  const blogCount = useBlogCount();

  return (
    <AdminLayout>
      <div className="admin-overview">
        <div className="overview-header">
          <h1>Dashboard</h1>
          <p>Welcome back! Here's an overview of your site.</p>
        </div>

        <div className="stats-grid">
          <div className="stat-card glass-card">
            <div className="stat-icon volunteers">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" />
              </svg>
            </div>
            <div className="stat-content">
              <h3>Total Volunteers</h3>
              <p className="stat-number">{volunteerCount ?? 0}</p>
            </div>
          </div>

          <div className="stat-card glass-card">
            <div className="stat-icon blogs">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 7.5h1.5m-1.5 3h1.5m-7.5 3h7.5m-7.5 3h7.5m3-9h3.375c.621 0 1.125.504 1.125 1.125V18a2.25 2.25 0 01-2.25 2.25M16.5 7.5V18a2.25 2.25 0 002.25 2.25M16.5 7.5V4.875c0-.621-.504-1.125-1.125-1.125H4.125C3.504 3.75 3 4.254 3 4.875V18a2.25 2.25 0 002.25 2.25h13.5M6 7.5h3v3H6v-3z" />
              </svg>
            </div>
            <div className="stat-content">
              <h3>Total Blog Posts</h3>
              <p className="stat-number">{blogCount ?? 0}</p>
            </div>
          </div>
        </div>

        <div className="quick-actions glass-card">
          <h2>Quick Actions</h2>
          <div className="actions-grid">
            <a href="/admin/volunteers" className="action-card">
              <span className="action-icon">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 7.5v3m0 0v3m0-3h3m-3 0h-3m-2.25-4.125a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zM4 19.235v-.11a6.375 6.375 0 0112.75 0v.109A12.318 12.318 0 0110.374 21c-2.331 0-4.512-.645-6.374-1.766z" />
                </svg>
              </span>
              <span>View Volunteers</span>
            </a>
            <a href="/admin/blogs" className="action-card">
              <span className="action-icon">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                </svg>
              </span>
              <span>Create Blog Post</span>
            </a>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}

export default AdminOverview;
