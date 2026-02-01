import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import AboutUs from './pages/AboutUs';
import VolunteerSignup from './pages/VolunteerSignup';
import Blogs from './pages/Blogs';
import BlogPost from './pages/BlogPost';
import Gallery from './pages/Gallery';
// Management Pages
import Board from './pages/management/Board';
import Teams from './pages/management/Teams';
import ManagementVolunteers from './pages/management/Volunteers';
import Organogram from './pages/management/Organogram';
// Interventions Pages
import ICAProgrammes from './pages/interventions/ICAProgrammes';
import RadioProgramme from './pages/interventions/RadioProgramme';
import BloodDonation from './pages/interventions/BloodDonation';
import MedicalScreening from './pages/interventions/MedicalScreening';
import FeedTheAged from './pages/interventions/FeedTheAged';
// Events Pages
import EventList from './pages/events/EventList';
// Admin Pages
import AdminLogin from './pages/AdminLogin';
import AdminOverview from './pages/admin/AdminOverview';
import AdminVolunteers from './pages/admin/AdminVolunteers';
import AdminBlogs from './pages/admin/AdminBlogs';
import AdminEvents from './pages/admin/AdminEvents';
import AdminInterventions from './pages/admin/AdminInterventions';
import AdminPhotos from './pages/admin/AdminPhotos';
import AdminMembers from './pages/admin/AdminMembers';
import AdminSponsors from './pages/admin/AdminSponsors';
// Dynamic Intervention Detail
import InterventionDetail from './pages/interventions/InterventionDetail';
import './App.css';

function AppContent() {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith('/admin');
  const isAdminDashboard = isAdminRoute && location.pathname !== '/admin';

  return (
    <div className="app">
      {!isAdminDashboard && <Navbar />}
      <main className={isAdminDashboard ? 'admin-page' : ''}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/volunteer" element={<VolunteerSignup />} />
          <Route path="/blogs" element={<Blogs />} />
          <Route path="/blog/:slug" element={<BlogPost />} />

          {/* Management Routes */}
          <Route path="/management/board" element={<Board />} />
          <Route path="/management/teams" element={<Teams />} />
          <Route path="/management/volunteers" element={<ManagementVolunteers />} />
          <Route path="/management/organogram" element={<Organogram />} />

          {/* Interventions Routes - Static pages */}
          <Route path="/interventions/ica-programmes" element={<ICAProgrammes />} />
          <Route path="/interventions/community-interventions" element={<RadioProgramme />} />
          <Route path="/interventions/blood-donation" element={<BloodDonation />} />
          <Route path="/interventions/medical-screening" element={<MedicalScreening />} />
          <Route path="/interventions/feed-the-aged" element={<FeedTheAged />} />
          {/* Dynamic Intervention Detail */}
          <Route path="/interventions/:slug" element={<InterventionDetail />} />

          {/* Events Routes */}
          <Route path="/events" element={<EventList />} />

          {/* Gallery Route */}
          <Route path="/gallery" element={<Gallery />} />

          {/* Admin Routes */}
          <Route path="/admin" element={<AdminLogin />} />
          <Route path="/admin/dashboard" element={<AdminOverview />} />
          <Route path="/admin/volunteers" element={<AdminVolunteers />} />
          <Route path="/admin/blogs" element={<AdminBlogs />} />
          <Route path="/admin/events" element={<AdminEvents />} />
          <Route path="/admin/interventions" element={<AdminInterventions />} />
          <Route path="/admin/photos" element={<AdminPhotos />} />
          <Route path="/admin/members" element={<AdminMembers />} />
          <Route path="/admin/sponsors" element={<AdminSponsors />} />
        </Routes>
      </main>
      {!isAdminDashboard && <Footer />}
    </div>
  );
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;
