import { useState } from 'react';
import Navbar from './Navbar';
import '../styles/Contact.css';

function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.name || !formData.email || !formData.message) {
      alert('Please fill in all fields.');
      return;
    }

    // In a real app, you would send this to a backend
    console.log('Contact form submitted:', formData);
    alert('Thank you for your message! We will get back to you soon.');
    
    // Reset form
    setFormData({ name: '', email: '', message: '' });
  };

  return (
    <div>
      <Navbar />
      <div className="contact-container">
        <section className="contact-header">
          <h1>📧 Contact Us</h1>
          <p>Have questions or feedback? We'd love to hear from you!</p>
        </section>

        <div className="contact-content">
          <div className="contact-form-card">
            <h2>Send us a Message</h2>
            <form onSubmit={handleSubmit}>
              <label htmlFor="name">Your Name:</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter your name"
                required
              />

              <label htmlFor="email">Your Email:</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="your.email@example.com"
                required
              />

              <label htmlFor="message">Your Message:</label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                rows="6"
                placeholder="Write your message here..."
                required
              />

              <button type="submit">Send Message</button>
            </form>
          </div>

          <div className="contact-info">
            <h2>Get in Touch</h2>
            <div className="info-item">
              <span className="icon">📍</span>
              <div>
                <h3>Address</h3>
                <p>123 Finance Street, Money City, FC 12345</p>
              </div>
            </div>
            <div className="info-item">
              <span className="icon">📧</span>
              <div>
                <h3>Email</h3>
                <p>support@expensetracker.com</p>
              </div>
            </div>
            <div className="info-item">
              <span className="icon">📞</span>
              <div>
                <h3>Phone</h3>
                <p>+1 (555) 123-4567</p>
              </div>
            </div>
            <div className="info-item">
              <span className="icon">⏰</span>
              <div>
                <h3>Business Hours</h3>
                <p>Monday - Friday: 9:00 AM - 6:00 PM</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Contact;
