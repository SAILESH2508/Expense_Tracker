import { useNavigate } from 'react-router-dom';
import Navbar from './Navbar';
import '../styles/Premium.css';

function Premium() {
  const navigate = useNavigate();

  const loadRazorpay = (src) => {
    return new Promise((resolve) => {
      const script = document.createElement('script');
      script.src = src;
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  const handlePayment = async () => {
    const res = await loadRazorpay('https://checkout.razorpay.com/v1/checkout.js');

    if (!res) {
      alert('Razorpay SDK failed to load. Are you online?');
      return;
    }

    // Call Django Backend to create order
    try {
      const response = await fetch('http://localhost:8000/api/create-order/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ amount: 499 }), // Amount in INR
      });

      const order = await response.json();

      if (order.error) {
        alert(order.error);
        return;
      }

      const options = {
        key: 'rzp_test_RNh0qZpmrPFLcI', // Enter the Key ID generated from the Dashboard
        amount: order.amount,
        currency: order.currency,
        name: 'Expense Tracker Premium',
        description: 'Unlock Advanced AI Features',
        order_id: order.id,
        handler: async function (response) {
          // Verify payment with backend
          const verifyRes = await fetch('http://localhost:8000/api/verify-payment/', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
            }),
          });

          const verifyData = await verifyRes.json();

          if (verifyData.status === 'Payment Verified') {
            localStorage.setItem('userPlan', 'premium');
            alert('Payment Successful! Welcome to Premium 🌟');
            navigate('/dashboard');
          } else {
            alert('Payment Verification Failed');
          }
        },
        prefill: {
          name: 'User Name',
          email: 'user@example.com',
          contact: '9999999999',
        },
        theme: {
          color: '#FFD700',
        },
      };

      const paymentObject = new window.Razorpay(options);
      paymentObject.open();
    } catch (error) {
      console.error(error);
      alert('Something went wrong with the payment server.');
    }
  };

  return (
    <div>
      <Navbar />
      <div className="premium-container">
        <div className="premium-card">
          <div className="premium-header">
            <h1>🚀 Go Premium</h1>
            <p>Unlock the full power of AI for your finances</p>
          </div>

          <div className="features-list">
            <div className="feature-item">
              <span className="icon">🔮</span>
              <div className="text">
                <h3>Future Spending Forecast</h3>
                <p>Predict your expenses for the next 30 days with AI.</p>
              </div>
            </div>
            <div className="feature-item">
              <span className="icon">⚠️</span>
              <div className="text">
                <h3>Anomaly Detection</h3>
                <p>Get alerted about unusual or suspicious spending.</p>
              </div>
            </div>
            <div className="feature-item">
              <span className="icon">💡</span>
              <div className="text">
                <h3>Smart Budgeting</h3>
                <p>Receive personalized budget recommendations.</p>
              </div>
            </div>
            <div className="feature-item">
              <span className="icon">📊</span>
              <div className="text">
                <h3>Advanced Analytics</h3>
                <p>Interactive charts and deep dive into your data.</p>
              </div>
            </div>
          </div>

          <div className="pricing-section">
            <span className="price">₹499</span>
            <span className="period">/ lifetime</span>
          </div>

          <button className="upgrade-btn" onClick={handlePayment}>
            Upgrade Now
          </button>
        </div>
      </div>
    </div>
  );
}

export default Premium;
