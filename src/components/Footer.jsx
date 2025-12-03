import { useEffect } from 'react';
import '../styles/Footer.css';

function Footer() {
  useEffect(() => {
    // Back to top button functionality
    const handleScroll = () => {
      const backToTopBtn = document.getElementById('backToTopBtn');
      if (backToTopBtn) {
        if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
          backToTopBtn.style.display = 'block';
        } else {
          backToTopBtn.style.display = 'none';
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
  };

  return (
    <>
      <footer className="footer">
        <div className="footer-container">
          <div className="footer-left">
            <h3>Expense Tracker</h3>
            <p>Helping you manage your daily expenses smarter and easier.</p>
            
            <div className="social-icons">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" title="Facebook">
                <i className="fab fa-facebook-f"></i>
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" title="Twitter">
                <i className="fab fa-twitter"></i>
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" title="Instagram">
                <i className="fab fa-instagram"></i>
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" title="LinkedIn">
                <i className="fab fa-linkedin-in"></i>
              </a>
              <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" title="YouTube">
                <i className="fab fa-youtube"></i>
              </a>
              <a href="https://pinterest.com" target="_blank" rel="noopener noreferrer" title="Pinterest">
                <i className="fab fa-pinterest"></i>
              </a>
              <a href="https://wa.me/" target="_blank" rel="noopener noreferrer" title="WhatsApp">
                <i className="fab fa-whatsapp"></i>
              </a>
            </div>
          </div>

          <div className="footer-right">
            <ul className="footer-links">
              <li><a href="/">Home</a></li>
              <li><a href="/login">Login</a></li>
              <li><a href="/signup">Sign Up</a></li>
              <li><a href="/contact">Contact</a></li>
              <li><a href="/premium">Premium</a></li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <p>&copy; 2025 Expense Tracker | All rights reserved.</p>
        </div>
      </footer>

      {/* Back to Top Button */}
      <button 
        onClick={scrollToTop} 
        id="backToTopBtn" 
        title="Go to top"
        className="back-to-top-btn"
      >
        <i className="fas fa-arrow-up"></i>
      </button>
    </>
  );
}

export default Footer;
