import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from './Navbar';
import '../styles/Auth.css';

function Signup() {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSignup = (e) => {
    e.preventDefault();

    if (!formData.username || !formData.email || !formData.password || !formData.confirmPassword) {
      alert('Please fill in all fields.');
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      alert('Passwords do not match!');
      return;
    }

    if (formData.password.length < 6) {
      alert('Password must be at least 6 characters long.');
      return;
    }

    const user = {
      username: formData.username,
      email: formData.email,
      password: formData.password
    };

    localStorage.setItem('user', JSON.stringify(user));
    alert('Signup successful! Please login.');
    navigate('/login');
  };

  return (
    <div>
      <Navbar />
      <div className="auth-container">
        <section className="info-section">
          <h1>📌 About the Expense Tracker</h1>
          <p>
            The <strong>Daily Expense Tracker</strong> is a simple and efficient tool designed to help users 
            manage their daily expenses, set budgets, and keep track of spending history. With an 
            intuitive interface and a secure login system, this application enables users to take control 
            of their financial activities and make informed spending decisions.
          </p>
        </section>

        <center>
          <div className="auth-form-container">
            <h1>Create an Account</h1>
            <form onSubmit={handleSignup}>
              <label htmlFor="username">Username:</label>
              <input
                type="text"
                id="username"
                name="username"
                value={formData.username}
                onChange={handleChange}
                placeholder="Enter username"
                required
              />

              <label htmlFor="email">Email:</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="abc@gmail.com"
                required
              />

              <label htmlFor="password">Password:</label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Enter password"
                required
              />

              <label htmlFor="confirmPassword">Confirm Password:</label>
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="Confirm password"
                required
              />

              <button type="submit">Sign Up</button>
            </form>
            <h3>Already have an account?</h3>
            <button className="secondary-btn">
              <a href="/login">Login</a>
            </button>
          </div>
        </center>

        <center>
          <section className="features-section">
            <h1>✨ Key Features</h1>
            <ul>
              <li>✅ <strong>User Authentication</strong> – Secure login system with username and password.</li>
              <li>✅ <strong>Set Monthly Budget</strong> – Users can define a monthly budget to track expenses.</li>
              <li>✅ <strong>Expense Tracking</strong> – Easily add and manage daily expenses.</li>
              <li>✅ <strong>Expense Categories</strong> – Food, Transport, Bills, Shopping, and Others.</li>
              <li>✅ <strong>Expense History</strong> – View a complete list of past expenses.</li>
              <li>✅ <strong>Total Spending Calculation</strong> – Automatically calculates the total amount spent.</li>
              <li>✅ <strong>Delete Expenses</strong> – Remove unnecessary expenses from the history.</li>
              <li>✅ <strong>Logout Functionality</strong> – Securely log out after tracking expenses.</li>
              <li>✅ <strong>Mobile-Friendly</strong> – Works on both desktop and mobile browsers.</li>
            </ul>
          </section>

          <section className="features-section">
            <h1>📝 How to Use the Expense Tracker</h1>
            <ol>
              <li><strong>Login to Your Account:</strong> Enter your username and password on the login page and click "Login".</li>
              <li><strong>Set Your Monthly Budget:</strong> Enter your budget amount and click "Set Budget" to save it.</li>
              <li><strong>Add an Expense:</strong> Provide the expense name, amount, select a category, and click "Add Expense".</li>
              <li><strong>View and Manage Expense History:</strong> Check all past expenses in a table format, and delete unwanted entries.</li>
              <li><strong>Logout:</strong> Click the "Logout" button to securely log out of your account.</li>
            </ol>
          </section>
        </center>
      </div>
    </div>
  );
}

export default Signup;
