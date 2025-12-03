import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from './Navbar';
import '../styles/Premium.css';

function Premium() {
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [paymentMethod, setPaymentMethod] = useState('');
  const navigate = useNavigate();

  const plans = [
    {
      id: 'basic',
      name: 'Basic',
      price: 0,
      features: [
        'Track unlimited expenses',
        'Basic categories',
        'Monthly budget tracking',
        'Expense history'
      ]
    },
    {
      id: 'pro',
      name: 'Pro',
      price: 299,
      features: [
        'Everything in Basic',
        'Advanced analytics & charts',
        'Custom categories',
        'Export to Excel/PDF',
        'Email notifications',
        'Priority support'
      ]
    },
    {
      id: 'premium',
      name: 'Premium',
      price: 599,
      features: [
        'Everything in Pro',
        'AI-powered insights',
        'Multi-currency support',
        'Recurring expense automation',
        'Family sharing (up to 5 users)',
        'Dedicated account manager',
        'Custom reports'
      ]
    }
  ];

  const handleSelectPlan = (plan) => {
    if (plan.price === 0) {
      alert('You are already on the Basic plan!');
      return;
    }
    setSelectedPlan(plan);
  };

  const handlePayment = (e) => {
    e.preventDefault();
    
    if (!paymentMethod) {
      alert('Please select a payment method');
      return;
    }

    // Simulate payment processing
    // In production, replace this with actual payment gateway integration
    // See PAYMENT_INTEGRATION_GUIDE.md for detailed instructions
    
    console.log('Payment Details:', {
      plan: selectedPlan.name,
      amount: selectedPlan.price,
      method: paymentMethod,
      timestamp: new Date().toISOString()
    });

    alert(`Processing payment of ₹${selectedPlan.price} via ${paymentMethod}...`);
    
    // Simulate API call delay
    setTimeout(() => {
      // In production, verify payment on backend before proceeding
      const transactionId = 'TXN' + Date.now();
      
      // Store payment info
      const paymentInfo = {
        plan: selectedPlan.id,
        planName: selectedPlan.name,
        amount: selectedPlan.price,
        method: paymentMethod,
        transactionId: transactionId,
        date: new Date().toISOString(),
        status: 'success'
      };
      
      localStorage.setItem('userPlan', selectedPlan.id);
      localStorage.setItem('paymentInfo', JSON.stringify(paymentInfo));
      
      alert(`Payment successful! Welcome to ${selectedPlan.name} plan!\nTransaction ID: ${transactionId}`);
      navigate('/dashboard');
    }, 1500);
  };

  return (
    <div>
      <Navbar />
      <div className="premium-container">
        <div className="premium-header">
          <h1>🌟 Upgrade to Premium</h1>
          <p>Choose the perfect plan for your financial journey</p>
        </div>

        <div className="plans-grid">
          {plans.map((plan) => (
            <div key={plan.id} className={`plan-card ${plan.id === 'pro' ? 'popular' : ''}`}>
              {plan.id === 'pro' && <div className="popular-badge">Most Popular</div>}
              <h2>{plan.name}</h2>
              <div className="price">
                <span className="currency">₹</span>
                <span className="amount">{plan.price}</span>
                <span className="period">/month</span>
              </div>
              <ul className="features-list">
                {plan.features.map((feature, index) => (
                  <li key={index}>✓ {feature}</li>
                ))}
              </ul>
              <button 
                className="select-btn"
                onClick={() => handleSelectPlan(plan)}
              >
                {plan.price === 0 ? 'Current Plan' : 'Select Plan'}
              </button>
            </div>
          ))}
        </div>

        {selectedPlan && (
          <div className="payment-modal">
            <div className="payment-content">
              <button className="close-btn" onClick={() => setSelectedPlan(null)}>×</button>
              <h2>Complete Your Purchase</h2>
              <div className="order-summary">
                <h3>Order Summary</h3>
                <p><strong>Plan:</strong> {selectedPlan.name}</p>
                <p><strong>Amount:</strong> ₹{selectedPlan.price}/month</p>
              </div>

              <form onSubmit={handlePayment}>
                <h3>Select Payment Method</h3>
                
                <div className="payment-options">
                  <label className="payment-option">
                    <input
                      type="radio"
                      name="payment"
                      value="razorpay"
                      onChange={(e) => setPaymentMethod(e.target.value)}
                    />
                    <div className="option-content">
                      <strong>Razorpay</strong>
                      <span>UPI, Cards, NetBanking, Wallets</span>
                    </div>
                  </label>

                  <label className="payment-option">
                    <input
                      type="radio"
                      name="payment"
                      value="stripe"
                      onChange={(e) => setPaymentMethod(e.target.value)}
                    />
                    <div className="option-content">
                      <strong>Stripe</strong>
                      <span>Credit/Debit Cards</span>
                    </div>
                  </label>

                  <label className="payment-option">
                    <input
                      type="radio"
                      name="payment"
                      value="paypal"
                      onChange={(e) => setPaymentMethod(e.target.value)}
                    />
                    <div className="option-content">
                      <strong>PayPal</strong>
                      <span>PayPal Balance or Cards</span>
                    </div>
                  </label>

                  <label className="payment-option">
                    <input
                      type="radio"
                      name="payment"
                      value="paytm"
                      onChange={(e) => setPaymentMethod(e.target.value)}
                    />
                    <div className="option-content">
                      <strong>Paytm</strong>
                      <span>Paytm Wallet & UPI</span>
                    </div>
                  </label>

                  <label className="payment-option">
                    <input
                      type="radio"
                      name="payment"
                      value="phonepe"
                      onChange={(e) => setPaymentMethod(e.target.value)}
                    />
                    <div className="option-content">
                      <strong>PhonePe</strong>
                      <span>UPI Payment</span>
                    </div>
                  </label>

                  <label className="payment-option">
                    <input
                      type="radio"
                      name="payment"
                      value="googlepay"
                      onChange={(e) => setPaymentMethod(e.target.value)}
                    />
                    <div className="option-content">
                      <strong>Google Pay</strong>
                      <span>UPI Payment</span>
                    </div>
                  </label>
                </div>

                <button type="submit" className="pay-btn">
                  Pay ₹{selectedPlan.price}
                </button>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Premium;
