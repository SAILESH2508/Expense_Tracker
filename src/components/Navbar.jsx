import { Link } from 'react-router-dom';
import '../styles/Navbar.css';

function Navbar() {
  const handleLogout = () => {
    sessionStorage.removeItem('loggedIn');
    window.location.href = '/';
  };

  const isLoggedIn = sessionStorage.getItem('loggedIn');

  return (
    <nav className="navbar">
      <div className="logo">
        <Link to="/">Expense Tracker</Link>
      </div>
      <div className="welcome-text">
        <h1><marquee>WELCOME TO EXPENSE TRACKER</marquee></h1>
      </div>
      <ul className="nav-links">
        {!isLoggedIn ? (
          <>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/login">Login</Link></li>
            <li><Link to="/signup">Sign Up</Link></li>
            <li><Link to="/contact">Contact Us</Link></li>
          </>
        ) : (
          <>
            <li><Link to="/dashboard">Dashboard</Link></li>
            <li><Link to="/premium">Premium</Link></li>
            <li><Link to="/contact">Contact Us</Link></li>
            <li><button onClick={handleLogout} className="logout-btn">Logout</button></li>
          </>
        )}
      </ul>
    </nav>
  );
}

export default Navbar;
