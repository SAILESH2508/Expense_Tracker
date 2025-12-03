import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from './Navbar';
import '../styles/Dashboard.css';

function Dashboard() {
  const [budget, setBudget] = useState('');
  const [budgetDisplay, setBudgetDisplay] = useState(0);
  const [expenses, setExpenses] = useState([]);
  const [expenseForm, setExpenseForm] = useState({
    name: '',
    amount: '',
    category: 'Food'
  });
  const [view, setView] = useState('add'); // 'add' or 'history'
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user is logged in
    if (!sessionStorage.getItem('loggedIn')) {
      alert('Please log in first!');
      navigate('/login');
      return;
    }

    // Load saved data
    const savedBudget = localStorage.getItem('budget');
    const savedExpenses = JSON.parse(localStorage.getItem('expenses')) || [];
    
    if (savedBudget) {
      setBudgetDisplay(parseFloat(savedBudget));
    }
    setExpenses(savedExpenses);
  }, [navigate]);

  // Check if user has premium plan
  const userPlan = localStorage.getItem('userPlan') || 'basic';
  const isPremium = userPlan !== 'basic';

  const handleSetBudget = () => {
    if (!budget || isNaN(budget) || budget <= 0) {
      alert('Please enter a valid budget amount.');
      return;
    }

    localStorage.setItem('budget', budget);
    setBudgetDisplay(parseFloat(budget));
    alert('Budget set successfully!');
    setBudget('');
  };

  const handleAddExpense = (e) => {
    e.preventDefault();

    if (!expenseForm.name || !expenseForm.amount || expenseForm.amount <= 0) {
      alert('Please enter valid expense details.');
      return;
    }

    const newExpense = {
      id: Date.now(),
      name: expenseForm.name,
      amount: parseFloat(expenseForm.amount),
      category: expenseForm.category,
      date: new Date().toLocaleDateString()
    };

    const updatedExpenses = [...expenses, newExpense];
    setExpenses(updatedExpenses);
    localStorage.setItem('expenses', JSON.stringify(updatedExpenses));

    alert('Expense added successfully!');
    setExpenseForm({ name: '', amount: '', category: 'Food' });
  };

  const handleDeleteExpense = (id) => {
    if (confirm('Are you sure you want to delete this expense?')) {
      const updatedExpenses = expenses.filter(exp => exp.id !== id);
      setExpenses(updatedExpenses);
      localStorage.setItem('expenses', JSON.stringify(updatedExpenses));
    }
  };

  const totalSpent = expenses.reduce((sum, exp) => sum + exp.amount, 0);
  const remainingBudget = budgetDisplay - totalSpent;

  return (
    <div>
      <Navbar />
      <div className="dashboard-container">
        <div className="dashboard-header">
          <h1>💰 Expense Dashboard {isPremium && <span className="premium-badge">⭐ {userPlan.toUpperCase()}</span>}</h1>
          {!isPremium && (
            <p className="upgrade-prompt">
              <a href="/premium">🚀 Upgrade to Premium for advanced features!</a>
            </p>
          )}
          <div className="view-toggle">
            <button 
              className={view === 'add' ? 'active' : ''} 
              onClick={() => setView('add')}
            >
              Add Expense
            </button>
            <button 
              className={view === 'history' ? 'active' : ''} 
              onClick={() => setView('history')}
            >
              View History
            </button>
          </div>
        </div>

        {view === 'add' ? (
          <div className="expense-section">
            <div className="budget-card">
              <h2>Set Monthly Budget</h2>
              <div className="budget-input-group">
                <input
                  type="number"
                  value={budget}
                  onChange={(e) => setBudget(e.target.value)}
                  placeholder="Enter budget amount"
                />
                <button onClick={handleSetBudget}>Set Budget</button>
              </div>
              <p className="budget-display">Current Budget: ₹{budgetDisplay.toFixed(2)}</p>
            </div>

            <div className="expense-form-card">
              <h2>Add New Expense</h2>
              <form onSubmit={handleAddExpense}>
                <label>Expense Name:</label>
                <input
                  type="text"
                  value={expenseForm.name}
                  onChange={(e) => setExpenseForm({...expenseForm, name: e.target.value})}
                  placeholder="E.g., Groceries"
                  required
                />

                <label>Amount (₹):</label>
                <input
                  type="number"
                  value={expenseForm.amount}
                  onChange={(e) => setExpenseForm({...expenseForm, amount: e.target.value})}
                  placeholder="E.g., 500"
                  required
                />

                <label>Category:</label>
                <select
                  value={expenseForm.category}
                  onChange={(e) => setExpenseForm({...expenseForm, category: e.target.value})}
                >
                  <option value="Food">Food</option>
                  <option value="Transport">Transport</option>
                  <option value="Bills">Bills</option>
                  <option value="Shopping">Shopping</option>
                  <option value="Entertainment">Entertainment</option>
                  <option value="Healthcare">Healthcare</option>
                  <option value="Others">Others</option>
                </select>

                <button type="submit">Add Expense</button>
              </form>
            </div>
          </div>
        ) : (
          <div className="history-section">
            <div className="summary-cards">
              <div className="summary-card">
                <h3>Total Budget</h3>
                <p className="amount">₹{budgetDisplay.toFixed(2)}</p>
              </div>
              <div className="summary-card spent">
                <h3>Total Spent</h3>
                <p className="amount">₹{totalSpent.toFixed(2)}</p>
              </div>
              <div className={`summary-card ${remainingBudget < 0 ? 'negative' : 'positive'}`}>
                <h3>Remaining</h3>
                <p className="amount">₹{remainingBudget.toFixed(2)}</p>
              </div>
            </div>

            <div className="expense-table-container">
              <h2>Expense History</h2>
              {expenses.length === 0 ? (
                <p className="no-expenses">No expenses recorded yet. Start adding expenses!</p>
              ) : (
                <table className="expense-table">
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th>Amount</th>
                      <th>Category</th>
                      <th>Date</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {expenses.map((expense) => (
                      <tr key={expense.id}>
                        <td>{expense.name}</td>
                        <td>₹{expense.amount.toFixed(2)}</td>
                        <td><span className="category-badge">{expense.category}</span></td>
                        <td>{expense.date}</td>
                        <td>
                          <button 
                            className="delete-btn" 
                            onClick={() => handleDeleteExpense(expense.id)}
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Dashboard;
