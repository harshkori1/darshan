import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X, ChevronDown, User, Shield, Building2, LogOut } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const ModernNav = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [loginDropdownOpen, setLoginDropdownOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { user, role, logout, isAuthenticated } = useAuth();

  const isLoggedIn = isAuthenticated();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (loginDropdownOpen && !event.target.closest('.login-dropdown-container')) {
        setLoginDropdownOpen(false);
      }
    };
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, [loginDropdownOpen]);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Temples', path: '/temples' },
    { name: 'My Bookings', path: '/bookings' },
    { name: 'About', path: '/about' },
    { name: 'Contact', path: '/contact' },
  ];

  const loginOptions = [
    { name: 'User Login', path: '/login', role: 'user', icon: User },
    { name: 'Admin Login', path: '/login', role: 'admin', icon: Shield },
    { name: 'Organizer Login', path: '/login', role: 'organizer', icon: Building2 },
  ];

  const handleLoginClick = (option) => {
    // Store the selected role in localStorage for the login page to use
    localStorage.setItem('selectedRole', option.role);
    navigate(option.path);
    setLoginDropdownOpen(false);
    setIsOpen(false);
  };

  const isActive = (path) => location.pathname === path;

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Mono:wght@400;700&family=Outfit:wght@300;400;500;600;700&display=swap');

        :root {
          --nav-bg: rgba(249, 115, 22, 0.95);
          --nav-border: rgba(234, 88, 12, 0.3);
          --text-primary: #ffffff;
          --text-secondary: #ffffff;
          --accent: #ffffff;
          --accent-hover: #fef3c7;
        }

        .modern-nav {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          z-index: 50;
          background: linear-gradient(rgba(249, 115, 22, 0.9), rgba(249, 115, 22, 0.95)),
                      url('https://images.unsplash.com/photo-1564507592333-c60657eea523?w=1920&q=80');
          background-size: cover;
          background-position: center;
          border-bottom: 1px solid var(--nav-border);
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .modern-nav.scrolled {
          border-bottom-color: rgba(234, 88, 12, 0.5);
          background: linear-gradient(rgba(249, 115, 22, 0.98), rgba(234, 88, 12, 0.98)),
                      url('https://images.unsplash.com/photo-1564507592333-c60657eea523?w=1920&q=80');
          background-size: cover;
          background-position: center;
          box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
        }

        .nav-container {
          max-width: 1400px;
          margin: 0 auto;
          padding: 1.25rem 2rem;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        /* Logo */
        .nav-logo {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          text-decoration: none;
          font-family: 'Space Mono', monospace;
          font-size: 1.5rem;
          font-weight: 700;
          color: var(--text-primary);
          transition: all 0.3s ease;
          position: relative;
        }

        .nav-logo:hover {
          color: var(--accent-hover);
        }

        .logo-icon {
          width: 28px;
          height: 28px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: linear-gradient(135deg, #ffffff, #fef3c7);
          border-radius: 6px;
          font-size: 16px;
          font-weight: bold;
          color: #ea580c;
        }

        /* Desktop Navigation */
        /* Navbar */
        .navbar {
          width: 100%;
          background: #f97316;
          padding: 12px 40px;
          display: flex;
          align-items: center;
          justify-content: space-between;
        }

        .nav-links {
          display: none;
          gap: 0;
          align-items: center;
          list-style: none;
        }

        .nav-links.active {
          display: flex;
        }

        .nav-item {
          position: relative;
          margin: 0;
        }

        .nav-link {
          display: block;
          padding: 0.75rem 1.5rem;
          color: var(--text-secondary);
          text-decoration: none;
          font-family: 'Outfit', sans-serif;
          font-size: 0.95rem;
          font-weight: 500;
          letter-spacing: 0.5px;
          transition: all 0.3s ease;
          position: relative;
        }

        .nav-link::after {
          content: '';
          position: absolute;
          bottom: 0.5rem;
          left: 1.5rem;
          right: 1.5rem;
          height: 2px;
          background: linear-gradient(90deg, var(--accent), transparent);
          transform: scaleX(0);
          transform-origin: left;
          transition: transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
        }

        .nav-link:hover {
          color: var(--accent);
        }

        .nav-link:hover::after {
          transform: scaleX(1);
        }

        .nav-link.active {
          color: var(--accent);
        }

        .nav-link.active::after {
          transform: scaleX(1);
        }

        /* Login Button */
        .login-btn {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.75rem 1.5rem;
          background: rgba(255, 255, 255, 0.2);
          border: 1px solid rgba(255, 255, 255, 0.3);
          border-radius: 8px;
          color: var(--text-primary);
          font-family: 'Outfit', sans-serif;
          font-size: 0.95rem;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .login-btn:hover {
          background: rgba(255, 255, 255, 0.3);
          border-color: rgba(255, 255, 255, 0.5);
        }

        .login-btn svg {
          transition: transform 0.3s ease;
        }

        .login-btn.open svg {
          transform: rotate(180deg);
        }

        /* Login Dropdown */
        .login-dropdown-container {
          position: relative;
        }

        .login-dropdown {
          position: absolute;
          top: calc(100% + 8px);
          right: 0;
          min-width: 200px;
          background: white;
          border-radius: 12px;
          box-shadow: 0 10px 40px rgba(0, 0, 0, 0.2);
          overflow: hidden;
          opacity: 0;
          visibility: hidden;
          transform: translateY(-10px);
          transition: all 0.3s ease;
          z-index: 100;
        }

        .login-dropdown.open {
          opacity: 1;
          visibility: visible;
          transform: translateY(0);
        }

        .login-dropdown-item {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          padding: 0.875rem 1.25rem;
          color: #1f2937;
          text-decoration: none;
          font-family: 'Outfit', sans-serif;
          font-size: 0.95rem;
          font-weight: 500;
          transition: all 0.2s ease;
          cursor: pointer;
          border: none;
          background: none;
          width: 100%;
          text-align: left;
        }

        .login-dropdown-item:hover {
          background: #f97316;
          color: white;
        }

        .login-dropdown-item svg {
          width: 18px;
          height: 18px;
        }

        .login-dropdown-item.user:hover {
          background: #22c55e;
        }

        .login-dropdown-item.admin:hover {
          background: #8b5cf6;
        }

        .login-dropdown-item.organizer:hover {
          background: #f97316;
        }

        /* Mobile Menu Button */
        .mobile-toggle {
          display: none;
          background: none;
          border: none;
          color: var(--text-primary);
          cursor: pointer;
          padding: 0.5rem;
          transition: color 0.3s ease;
        }

        .mobile-toggle:hover {
          color: var(--accent-hover);
        }

        /* Mobile Navigation */
        .mobile-nav {
          position: absolute;
          top: 100%;
          left: 0;
          right: 0;
          background: linear-gradient(rgba(249, 115, 22, 0.98), rgba(234, 88, 12, 0.98)),
                      url('https://images.unsplash.com/photo-1564507592333-c60657eea523?w=1920&q=80');
          background-size: cover;
          background-position: center;
          border-bottom: 1px solid var(--nav-border);
          max-height: 0;
          overflow: hidden;
          transition: max-height 0.3s ease;
        }

        .mobile-nav.active {
          max-height: 500px;
        }

        .mobile-nav-list {
          list-style: none;
          padding: 1rem 2rem;
          display: flex;
          flex-direction: column;
          gap: 0;
        }

        .mobile-nav-item {
          margin: 0;
        }

        .mobile-nav-link {
          display: block;
          padding: 0.75rem 0;
          color: var(--text-secondary);
          text-decoration: none;
          font-family: 'Outfit', sans-serif;
          font-size: 0.95rem;
          font-weight: 500;
          transition: all 0.3s ease;
          border-bottom: 1px solid rgba(255, 255, 255, 0.2);
        }

        .mobile-nav-link:hover,
        .mobile-nav-link.active {
          color: var(--accent);
          padding-left: 0.5rem;
        }

        /* Mobile Login Section */
        .mobile-login-section {
          padding: 1rem 2rem;
          border-top: 1px solid rgba(255, 255, 255, 0.2);
          margin-top: 0.5rem;
        }

        .mobile-login-title {
          color: var(--text-secondary);
          font-family: 'Outfit', sans-serif;
          font-size: 0.85rem;
          font-weight: 500;
          margin-bottom: 0.75rem;
        }

        .mobile-login-options {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }

        .mobile-login-btn {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          padding: 0.75rem 1rem;
          background: rgba(255, 255, 255, 0.1);
          border: 1px solid rgba(255, 255, 255, 0.2);
          border-radius: 8px;
          color: var(--text-primary);
          font-family: 'Outfit', sans-serif;
          font-size: 0.9rem;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.2s ease;
          text-decoration: none;
        }

        .mobile-login-btn:hover {
          background: rgba(255, 255, 255, 0.2);
        }

        .mobile-login-btn.user { border-color: rgba(34, 197, 94, 0.5); }
        .mobile-login-btn.admin { border-color: rgba(139, 92, 246, 0.5); }
        .mobile-login-btn.organizer { border-color: rgba(249, 115, 22, 0.5); }

        .mobile-login-btn svg {
          width: 18px;
          height: 18px;
        }

        /* Responsive */
        @media (min-width: 768px) {
          .nav-links {
            display: flex !important;
          }

          .mobile-toggle {
            display: none !important;
          }

          .mobile-nav {
            display: none !important;
          }
        }

        @media (max-width: 767px) {
          .mobile-toggle {
            display: flex;
            align-items: center;
            justify-content: center;
          }

          .nav-container {
            padding: 1rem 1rem;
          }

          .nav-logo {
            font-size: 1.25rem;
          }

          .logo-icon {
            width: 24px;
            height: 24px;
            font-size: 14px;
          }
        }

        /* Smooth transitions */
        @media (prefers-reduced-motion: reduce) {
          * {
            animation-duration: 0.01ms !important;
            animation-iteration-count: 1 !important;
            transition-duration: 0.01ms !important;
          }
        }
      `}</style>

      <nav className={`modern-nav ${scrolled ? 'scrolled' : ''}`}>
        <div className="nav-container">
          {/* Logo */}
          <Link to="/" className="nav-logo">
            <div className="logo-icon">🪔</div>
            <span>DarshanEase</span>
          </Link>

          {/* Desktop Navigation */}
          <ul className={`nav-links ${isOpen ? 'active' : ''}`}>
            {navLinks.map((link) => (
              <li key={link.name} className="nav-item">
                <Link
                  to={link.path}
                  className={`nav-link ${isActive(link.path) ? 'active' : ''}`}
                  onClick={() => setIsOpen(false)}
                >
                  {link.name}
                </Link>
              </li>
            ))}
            
            {/* Login Dropdown or User Profile */}
            {isLoggedIn ? (
              <li className="nav-item login-dropdown-container">
                <button 
                  className={`login-btn ${userDropdownOpen ? 'open' : ''}`}
                  onClick={(e) => {
                    e.stopPropagation();
                    setUserDropdownOpen(!userDropdownOpen);
                  }}
                >
                  <User size={18} />
                  {user?.name || 'Profile'} <ChevronDown size={18} />
                </button>
                
                <div className={`login-dropdown ${userDropdownOpen ? 'open' : ''}`}>
                  <Link
                    to="/profile"
                    className="login-dropdown-item"
                    onClick={() => setUserDropdownOpen(false)}
                  >
                    <User size={18} />
                    My Profile
                  </Link>
                  <Link
                    to={role === 'admin' ? '/admin/home' : role === 'organizer' ? '/organizer/home' : '/user/home'}
                    className="login-dropdown-item"
                    onClick={() => setUserDropdownOpen(false)}
                  >
                    {role === 'admin' ? <Shield size={18} /> : role === 'organizer' ? <Building2 size={18} /> : <User size={18} />}
                    Dashboard
                  </Link>
                  <button
                    className="login-dropdown-item"
                    onClick={() => {
                      logout();
                      setUserDropdownOpen(false);
                      navigate('/');
                    }}
                    style={{ color: '#dc2626' }}
                  >
                    <LogOut size={18} />
                    Logout
                  </button>
                </div>
              </li>
            ) : (
              <li className="nav-item login-dropdown-container">
                <button 
                  className={`login-btn ${loginDropdownOpen ? 'open' : ''}`}
                  onClick={(e) => {
                    e.stopPropagation();
                    setLoginDropdownOpen(!loginDropdownOpen);
                  }}
                >
                  Login <ChevronDown size={18} />
                </button>
                
                <div className={`login-dropdown ${loginDropdownOpen ? 'open' : ''}`}>
                  {loginOptions.map((option) => {
                    const Icon = option.icon;
                    return (
                      <button
                        key={option.role}
                        className={`login-dropdown-item ${option.role}`}
                        onClick={() => handleLoginClick(option)}
                      >
                        <Icon />
                        {option.name}
                      </button>
                    );
                  })}
                </div>
              </li>
            )}
          </ul>

          {/* Mobile Menu Button */}
          <button
            className="mobile-toggle"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        <div className={`mobile-nav ${isOpen ? 'active' : ''}`}>
          <ul className="mobile-nav-list">
            {navLinks.map((link) => (
              <li key={link.name} className="mobile-nav-item">
                <Link
                  to={link.path}
                  className={`mobile-nav-link ${isActive(link.path) ? 'active' : ''}`}
                  onClick={() => setIsOpen(false)}
                >
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </nav>

      {/* Spacer to prevent content overlap */}
      <div style={{ height: '70px' }} />
    </>
  );
};

export default ModernNav;
