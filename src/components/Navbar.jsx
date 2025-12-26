import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import '../styles/Navbar.css';

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const isLoggedIn = sessionStorage.getItem('loggedIn');

  const handleLogout = () => {
    sessionStorage.removeItem('loggedIn');
    window.location.href = '/';
  };

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const closeMenu = () => {
    setIsOpen(false);
  };

  return (
    <nav className="glass-panel navbar">
      <div className="nav-container">
        <Link to="/" className="logo-brand" onClick={closeMenu}>
          💰 Expense<span className="highlight">Tracker</span>
        </Link>

        {/* Hamburger Icon */}
        <div className={`menu-icon ${isOpen ? 'open' : ''}`} onClick={toggleMenu}>
          <span></span>
          <span></span>
          <span></span>
        </div>

        {/* Nav Links */}
        <ul className={`nav-menu ${isOpen ? 'active' : ''}`}>
          <li className="nav-item">
            <Link to="/" className={`nav-link ${location.pathname === '/' ? 'active' : ''}`} onClick={closeMenu}>
              Home
            </Link>
          </li>

          <li className="nav-item">
            <Link to="/about" className={`nav-link ${location.pathname === '/about' ? 'active' : ''}`} onClick={closeMenu}>
              About
            </Link>
          </li>

          <li className="nav-item">
            <Link to="/contact" className={`nav-link ${location.pathname === '/contact' ? 'active' : ''}`} onClick={closeMenu}>
              Contact
            </Link>
          </li>

          {!isLoggedIn ? (
            <>
              <li className="nav-item">
                <Link to="/login" className="nav-link btn-secondary" onClick={closeMenu}>
                  Login
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/signup" className="nav-link btn-signup" onClick={closeMenu}>
                  Sign Up
                </Link>
              </li>
            </>
          ) : (
            <>
              <li className="nav-item">
                <Link to="/dashboard" className={`nav-link ${location.pathname === '/dashboard' ? 'active' : ''}`} onClick={closeMenu}>
                  Dashboard
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/settings" className={`nav-link ${location.pathname === '/settings' ? 'active' : ''}`} onClick={closeMenu}>
                  Settings
                </Link>
              </li>
              <li className="nav-item">
                <button onClick={handleLogout} className="btn-logout">Logout</button>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
