import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from './Navbar';
import '../styles/Dashboard.css';
import { predictCategory, predictSpending, detectAnomalies, recommendBudget } from '../services/mlService';
import ExpenseCharts from './ExpenseCharts';

function Dashboard() {
  const [budget, setBudget] = useState('');
  const [budgetDisplay, setBudgetDisplay] = useState(0);
  const [salary, setSalary] = useState('');
  const [salaryDisplay, setSalaryDisplay] = useState(0);
  const [expenses, setExpenses] = useState([]);
  const [expenseForm, setExpenseForm] = useState({
    name: '',
    amount: '',
    category: 'Food'
  });
  const [forecast, setForecast] = useState(0);
  const [anomalies, setAnomalies] = useState([]);
  const [recommendedBudget, setRecommendedBudget] = useState(null);
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
    const savedSalary = localStorage.getItem('salary');
    const savedExpenses = JSON.parse(localStorage.getItem('expenses')) || [];

    if (savedBudget) {
      setBudgetDisplay(parseFloat(savedBudget));
    }
    if (savedSalary) {
      setSalaryDisplay(parseFloat(savedSalary));
    }
    setExpenses(savedExpenses);
  }, [navigate]);

  useEffect(() => {
    const updateForecast = async () => {
      if (expenses.length >= 5) {
        const predicted = await predictSpending(expenses);
        if (predicted !== null) {
          setForecast(predicted);
        }

        const detectedAnomalies = detectAnomalies(expenses);
        setAnomalies(detectedAnomalies);

        const recommendation = recommendBudget(expenses);
        setRecommendedBudget(recommendation);
      }
    };
    updateForecast();
  }, [expenses]);

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

  const handleSetSalary = () => {
    if (!salary || isNaN(salary) || salary <= 0) {
      alert('Please enter a valid salary amount.');
      return;
    }

    localStorage.setItem('salary', salary);
    setSalaryDisplay(parseFloat(salary));
    alert('Salary set successfully!');
    setSalary('');
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
  const currentSavings = salaryDisplay - totalSpent;
  const savingsRate = salaryDisplay > 0 ? ((currentSavings / salaryDisplay) * 100).toFixed(1) : 0;

  return (
    <div>
      <Navbar />
      <div className="dashboard-container">
        <div className="dashboard-header">
          <h1>💰 Financial Dashboard {isPremium && <span className="premium-badge">⭐ {userPlan.toUpperCase()}</span>}</h1>
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
              Manage Finances
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
            <div className="financial-inputs-container">
              <div className="budget-card">
                <h2>Set Monthly Salary</h2>
                <div className="budget-input-group">
                  <input
                    type="number"
                    value={salary}
                    onChange={(e) => setSalary(e.target.value)}
                    placeholder="Enter monthly salary"
                  />
                  <button onClick={handleSetSalary}>Set Salary</button>
                </div>
                <p className="budget-display">Current Salary: ₹{salaryDisplay.toFixed(2)}</p>
              </div>

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
            </div>

            <div className="expense-form-card">
              <h2>Add New Expense</h2>
              <form onSubmit={handleAddExpense}>
                <label>Expense Name:</label>
                <input
                  type="text"
                  value={expenseForm.name}
                  onChange={async (e) => {
                    const newName = e.target.value;
                    setExpenseForm(prev => ({ ...prev, name: newName }));

                    // Smart Category Prediction
                    if (newName.length > 2) {
                      const suggestedCategory = await predictCategory(newName);
                      if (suggestedCategory && suggestedCategory !== 'Others') {
                        setExpenseForm(prev => ({ ...prev, category: suggestedCategory }));
                      }
                    }
                  }}
                  placeholder="E.g., Groceries"
                  required
                />

                <label>Amount (₹):</label>
                <input
                  type="number"
                  value={expenseForm.amount}
                  onChange={(e) => setExpenseForm({ ...expenseForm, amount: e.target.value })}
                  placeholder="E.g., 500"
                  required
                />

                <label>Category:</label>
                <select
                  value={expenseForm.category}
                  onChange={(e) => setExpenseForm({ ...expenseForm, category: e.target.value })}
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
                <h3>Total Income</h3>
                <p className="amount">₹{salaryDisplay.toFixed(2)}</p>
              </div>
              <div className="summary-card spent">
                <h3>Total Spent</h3>
                <p className="amount">₹{totalSpent.toFixed(2)}</p>
              </div>
              <div className={`summary-card ${currentSavings < 0 ? 'negative' : 'positive'}`}>
                <h3>Current Savings</h3>
                <p className="amount">₹{currentSavings.toFixed(2)}</p>
                <small>Savings Rate: {savingsRate}%</small>
              </div>
              {forecast > 0 && (
                <div className="summary-card forecast">
                  <h3>🔮 Next 30 Days</h3>
                  <p className="amount">~₹{forecast.toFixed(2)}</p>
                  <small>Predicted Spending</small>
                </div>
              )}
            </div>

            {/* AI Insights Section - Premium Only */}
            {isPremium ? (
              (anomalies.length > 0 || recommendedBudget) && (
                <div className="ai-insights-section">
                  <h2>🤖 Advanced AI Insights</h2>
                  <div className="insights-grid">
                    {recommendedBudget && (
                      <div className="insight-card recommendation">
                        <h3>💡 Smart Budget</h3>
                        <p>Based on your spending, we recommend a monthly budget of:</p>
                        <p className="highlight-amount">₹{recommendedBudget}</p>
                        <button onClick={() => {
                          setBudget(recommendedBudget);
                          setBudgetDisplay(recommendedBudget);
                          localStorage.setItem('budget', recommendedBudget);
                          alert('Budget updated to recommendation!');
                        }}>Apply Recommendation</button>
                      </div>
                    )}

                    {anomalies.length > 0 && (
                      <div className="insight-card anomalies">
                        <h3>⚠️ Unusual Spending</h3>
                        <p>We detected {anomalies.length} potential outliers:</p>
                        <ul>
                          {anomalies.map(a => (
                            <li key={a.id}>{a.name}: ₹{a.amount} ({a.category})</li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                </div>
              )
            ) : (
              <div className="premium-lock-section">
                <h2>🤖 Advanced AI Insights</h2>
                <div className="lock-overlay">
                  <p>🔒 Upgrade to Premium to unlock Smart Budgeting and Anomaly Detection!</p>
                  <a href="/premium" className="unlock-btn">Unlock Now</a>
                </div>
              </div>
            )}

            {/* Charts Section - Available to All */}
            <div className="charts-section">
              <h2>📊 Visual Analytics</h2>
              <ExpenseCharts expenses={expenses} />
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
