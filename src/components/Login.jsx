import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from './Navbar';
import '../styles/Auth.css';
import { login } from '../services/api';


function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      await login(username, password);
      // sessionStorage.setItem('loggedIn', 'true'); // Optional: API token is enough usually, but keeping for compatibility if needed
      // sessionStorage.setItem('username', username);
      alert('Login successful!');
      navigate('/dashboard');
    } catch (error) {
      console.error("Login Error:", error);
      alert('Invalid credentials! Please try again.');
    }
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

        <div className="auth-form-container">
          <h1>Login to proceed</h1>
          <form onSubmit={handleLogin}>
            <label htmlFor="username">Username:</label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter username"
              required
            />
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter password"
              required
            />
            <button type="submit">Login</button>
          </form>
          <h3>Don't have an account?</h3>
          <button className="secondary-btn">
            <a href="/signup">Signup</a>
          </button>
        </div>


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

      </div>
    </div>
  );
}

export default Login;
