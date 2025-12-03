import { Link } from 'react-router-dom';
import Navbar from './Navbar';
import '../styles/Home.css';

function Home() {
  return (
    <div>
      <Navbar />
      <div className="home-container">
        <section className="hero-section">
          <div className="hero-content">
            <h1>Welcome to Expense Tracker</h1>
            <p className="hero-subtitle">
              Take control of your finances with our simple and powerful expense tracking tool
            </p>
            <div className="hero-buttons">
              <Link to="/signup" className="btn btn-primary">Get Started</Link>
              <Link to="/login" className="btn btn-secondary">Login</Link>
            </div>
          </div>
        </section>

        <section className="features-grid">
          <h2>Why Choose Expense Tracker?</h2>
          <div className="features">
            <div className="feature-card">
              <div className="feature-icon">🔐</div>
              <h3>Secure & Private</h3>
              <p>Your financial data is stored securely with user authentication</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">💰</div>
              <h3>Budget Management</h3>
              <p>Set monthly budgets and track your spending against them</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">📊</div>
              <h3>Expense Categories</h3>
              <p>Organize expenses by categories like Food, Transport, Bills, and more</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">📱</div>
              <h3>Mobile Friendly</h3>
              <p>Access your expenses from any device, anywhere, anytime</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">📈</div>
              <h3>Real-time Tracking</h3>
              <p>See your spending in real-time with instant calculations</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">🗑️</div>
              <h3>Easy Management</h3>
              <p>Add, view, and delete expenses with just a few clicks</p>
            </div>
          </div>
        </section>

        <section className="how-it-works">
          <h2>How It Works</h2>
          <div className="steps">
            <div className="step">
              <div className="step-number">1</div>
              <h3>Create Account</h3>
              <p>Sign up with your email and create a secure account</p>
            </div>
            <div className="step">
              <div className="step-number">2</div>
              <h3>Set Budget</h3>
              <p>Define your monthly budget to track your spending limits</p>
            </div>
            <div className="step">
              <div className="step-number">3</div>
              <h3>Add Expenses</h3>
              <p>Record your daily expenses with name, amount, and category</p>
            </div>
            <div className="step">
              <div className="step-number">4</div>
              <h3>Track & Manage</h3>
              <p>View your expense history and manage your finances effectively</p>
            </div>
          </div>
        </section>

        <section className="cta-section">
          <h2>Ready to Take Control of Your Finances?</h2>
          <p>Join thousands of users who are already managing their expenses better</p>
          <Link to="/signup" className="btn btn-large">Start Tracking Now</Link>
        </section>
      </div>
    </div>
  );
}

export default Home;
