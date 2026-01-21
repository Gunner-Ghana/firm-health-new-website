import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthState } from '../hooks/useRedux';
import AdminSidebar from './AdminSidebar';
import './AdminLayout.css';

function AdminLayout({ children }) {
  const { isAuthenticated } = useAuthState();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/admin');
    }
  }, [isAuthenticated, navigate]);

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="admin-layout">
      <AdminSidebar />
      <main className="admin-main">
        {children}
      </main>
    </div>
  );
}

export default AdminLayout;
