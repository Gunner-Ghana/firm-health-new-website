import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import logo from '../assets/logo.png';
import './Navbar.css';

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const location = useLocation();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
    setActiveDropdown(null);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
    setActiveDropdown(null);
  };

  const toggleDropdown = (dropdown) => {
    setActiveDropdown(activeDropdown === dropdown ? null : dropdown);
  };

  const handleMouseEnter = (dropdown) => {
    if (window.innerWidth > 768) {
      setActiveDropdown(dropdown);
    }
  };

  const handleMouseLeave = () => {
    if (window.innerWidth > 768) {
      setActiveDropdown(null);
    }
  };

  // Interventions menu: 5 static items only
  const interventionItems = [
    { path: '/interventions/ica-programmes', label: 'ICA Programme' },
    { path: '/interventions/community-interventions', label: 'Community Interventions' },
    { path: '/interventions/blood-donation', label: 'Blood Donation' },
    { path: '/interventions/medical-screening', label: 'Medical Screening' },
    { path: '/interventions/feed-the-aged', label: 'Feed the Aged' },
  ];

  const dropdownMenus = {
    management: {
      label: 'Management',
      items: [
        { path: '/management/board', label: 'Board' },
        { path: '/management/teams', label: 'Teams' },
        { path: '/management/volunteers', label: 'Volunteers' },
        { path: '/management/organogram', label: 'Organogram' },
      ]
    },
    interventions: {
      label: 'Interventions',
      items: interventionItems
    },
    events: {
      label: 'Events',
      items: [
        { path: '/events', label: 'Event List' },
        { path: '/reports', label: 'Download Reports' },
      ]
    }
  };

  const isDropdownActive = (key) => {
    return dropdownMenus[key].items.some(item => location.pathname.startsWith(item.path));
  };

  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <Link to="/" onClick={closeMenu} className="brand-link">
          <img src={logo} alt="Firm Health Ghana Foundation" className="navbar-logo" />
          <span className="brand-text">Firm Health Ghana</span>
        </Link>
      </div>

      <button
        className={`hamburger ${isMenuOpen ? 'active' : ''}`}
        onClick={toggleMenu}
        aria-label="Toggle menu"
      >
        <span></span>
        <span></span>
        <span></span>
      </button>

      <ul className={`navbar-links ${isMenuOpen ? 'active' : ''}`}>
        <li>
          <Link
            to="/"
            className={location.pathname === '/' ? 'active' : ''}
            onClick={closeMenu}
          >
            Home
          </Link>
        </li>
        <li>
          <Link
            to="/about"
            className={location.pathname === '/about' ? 'active' : ''}
            onClick={closeMenu}
          >
            About Us
          </Link>
        </li>

        {/* Management Dropdown */}
        <li
          className="dropdown"
          onMouseEnter={() => handleMouseEnter('management')}
          onMouseLeave={handleMouseLeave}
        >
          <button
            className={`dropdown-trigger ${isDropdownActive('management') ? 'active' : ''}`}
            onClick={() => toggleDropdown('management')}
          >
            Management
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className={activeDropdown === 'management' ? 'rotate' : ''}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
            </svg>
          </button>
          <ul className={`dropdown-menu ${activeDropdown === 'management' ? 'show' : ''}`}>
            {dropdownMenus.management.items.map((item) => (
              <li key={item.path}>
                <Link
                  to={item.path}
                  className={location.pathname === item.path ? 'active' : ''}
                  onClick={closeMenu}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </li>

        {/* Interventions Dropdown */}
        <li
          className="dropdown"
          onMouseEnter={() => handleMouseEnter('interventions')}
          onMouseLeave={handleMouseLeave}
        >
          <button
            className={`dropdown-trigger ${isDropdownActive('interventions') ? 'active' : ''}`}
            onClick={() => toggleDropdown('interventions')}
          >
            Interventions
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className={activeDropdown === 'interventions' ? 'rotate' : ''}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
            </svg>
          </button>
          <ul className={`dropdown-menu ${activeDropdown === 'interventions' ? 'show' : ''}`}>
            {dropdownMenus.interventions.items.map((item) => (
              <li key={item.path}>
                <Link
                  to={item.path}
                  className={location.pathname === item.path ? 'active' : ''}
                  onClick={closeMenu}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </li>

        {/* Events Dropdown */}
        <li
          className="dropdown"
          onMouseEnter={() => handleMouseEnter('events')}
          onMouseLeave={handleMouseLeave}
        >
          <button
            className={`dropdown-trigger ${isDropdownActive('events') ? 'active' : ''}`}
            onClick={() => toggleDropdown('events')}
          >
            Events
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className={activeDropdown === 'events' ? 'rotate' : ''}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
            </svg>
          </button>
          <ul className={`dropdown-menu ${activeDropdown === 'events' ? 'show' : ''}`}>
            {dropdownMenus.events.items.map((item) => (
              <li key={item.path}>
                <Link
                  to={item.path}
                  className={location.pathname === item.path ? 'active' : ''}
                  onClick={closeMenu}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </li>

        <li>
          <Link
            to="/gallery"
            className={location.pathname === '/gallery' ? 'active' : ''}
            onClick={closeMenu}
          >
            Gallery
          </Link>
        </li>
        <li>
          <Link
            to="/volunteer"
            className={location.pathname === '/volunteer' ? 'active' : ''}
            onClick={closeMenu}
          >
            Volunteer
          </Link>
        </li>
        <li>
          <Link
            to="/blogs"
            className={location.pathname.startsWith('/blog') ? 'active' : ''}
            onClick={closeMenu}
          >
            Blogs
          </Link>
        </li>
        <li>
          <Link
            to="/contact"
            className={location.pathname === '/contact' ? 'active' : ''}
            onClick={closeMenu}
          >
            Contact
          </Link>
        </li>
      </ul>

      {isMenuOpen && <div className="navbar-overlay" onClick={closeMenu}></div>}
    </nav>
  );
}

export default Navbar;
