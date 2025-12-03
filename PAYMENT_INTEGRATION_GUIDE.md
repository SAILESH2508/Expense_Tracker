# Payment Gateway Integration Guide

This guide explains how to integrate various payment gateways into the Expense Tracker application for premium features.

## Available Payment Methods

The Premium page supports the following payment gateways:

1. **Razorpay** (Recommended for India)
2. **Stripe** (International)
3. **PayPal** (International)
4. **Paytm** (India)
5. **PhonePe** (India - UPI)
6. **Google Pay** (India - UPI)

## Current Implementation

The current implementation is a **demo/simulation** that shows the payment flow without actual payment processing. To enable real payments, follow the integration steps below.

---

## 1. Razorpay Integration (Recommended for India)

### Installation
```bash
npm install razorpay
```

### Setup Steps

1. **Sign up at [Razorpay](https://razorpay.com/)**
2. Get your API keys from the dashboard
3. Create a `.env` file in the root directory:

```env
VITE_RAZORPAY_KEY_ID=your_key_id_here
VITE_RAZORPAY_KEY_SECRET=your_key_secret_here
```

4. **Update Premium.jsx** to use Razorpay:

```javascript
// Add Razorpay script to index.html
<script src="https://checkout.razorpay.com/v1/checkout.js"></script>

// In Premium.jsx
const handleRazorpayPayment = () => {
  const options = {
    key: import.meta.env.VITE_RAZORPAY_KEY_ID,
    amount: selectedPlan.price * 100, // Amount in paise
    currency: "INR",
    name: "Expense Tracker",
    description: `${selectedPlan.name} Plan Subscription`,
    handler: function (response) {
      alert(`Payment successful! Payment ID: ${response.razorpay_payment_id}`);
      localStorage.setItem('userPlan', selectedPlan.id);
      navigate('/dashboard');
    },
    prefill: {
      email: "user@example.com",
      contact: "9999999999"
    },
    theme: {
      color: "#FF6347"
    }
  };
  
  const rzp = new window.Razorpay(options);
  rzp.open();
};
```

---

## 2. Stripe Integration (International)

### Installation
```bash
npm install @stripe/stripe-js @stripe/react-stripe-js
```

### Setup Steps

1. **Sign up at [Stripe](https://stripe.com/)**
2. Get your publishable key
3. Add to `.env`:

```env
VITE_STRIPE_PUBLISHABLE_KEY=your_publishable_key_here
```

4. **Update Premium.jsx**:

```javascript
import { loadStripe } from '@stripe/stripe-js';

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);

const handleStripePayment = async () => {
  const stripe = await stripePromise;
  
  // Create checkout session on your backend
  const response = await fetch('/api/create-checkout-session', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      planId: selectedPlan.id,
      amount: selectedPlan.price
    })
  });
  
  const session = await response.json();
  
  // Redirect to Stripe Checkout
  const result = await stripe.redirectToCheckout({
    sessionId: session.id
  });
};
```

---

## 3. PayPal Integration

### Installation
```bash
npm install @paypal/react-paypal-js
```

### Setup Steps

1. **Sign up at [PayPal Developer](https://developer.paypal.com/)**
2. Get your Client ID
3. Add to `.env`:

```env
VITE_PAYPAL_CLIENT_ID=your_client_id_here
```

4. **Update Premium.jsx**:

```javascript
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";

<PayPalScriptProvider options={{ "client-id": import.meta.env.VITE_PAYPAL_CLIENT_ID }}>
  <PayPalButtons
    createOrder={(data, actions) => {
      return actions.order.create({
        purchase_units: [{
          amount: {
            value: selectedPlan.price
          }
        }]
      });
    }}
    onApprove={(data, actions) => {
      return actions.order.capture().then((details) => {
        alert('Payment successful!');
        localStorage.setItem('userPlan', selectedPlan.id);
        navigate('/dashboard');
      });
    }}
  />
</PayPalScriptProvider>
```

---

## 4. Paytm Integration

### Installation
```bash
npm install paytmchecksum
```

### Setup Steps

1. **Sign up at [Paytm Business](https://business.paytm.com/)**
2. Get Merchant ID and Merchant Key
3. Add to `.env`:

```env
VITE_PAYTM_MERCHANT_ID=your_merchant_id
VITE_PAYTM_MERCHANT_KEY=your_merchant_key
```

4. **Backend Integration Required** - Paytm requires server-side checksum generation

---

## 5. PhonePe Integration

### Setup Steps

1. **Sign up at [PhonePe Business](https://www.phonepe.com/business/)**
2. Get API credentials
3. Use PhonePe's UPI Intent or Web SDK
4. **Backend Integration Required**

---

## 6. Google Pay Integration

### Setup Steps

1. Use Google Pay's Web API
2. Add Google Pay button to your payment form
3. **Documentation**: [Google Pay Web](https://developers.google.com/pay/api/web)

```javascript
const handleGooglePay = () => {
  const paymentsClient = new google.payments.api.PaymentsClient({
    environment: 'TEST' // or 'PRODUCTION'
  });
  
  const paymentDataRequest = {
    apiVersion: 2,
    apiVersionMinor: 0,
    allowedPaymentMethods: [{
      type: 'CARD',
      parameters: {
        allowedAuthMethods: ['PAN_ONLY', 'CRYPTOGRAM_3DS'],
        allowedCardNetworks: ['MASTERCARD', 'VISA']
      }
    }],
    transactionInfo: {
      totalPriceStatus: 'FINAL',
      totalPrice: selectedPlan.price.toString(),
      currencyCode: 'INR'
    }
  };
  
  paymentsClient.loadPaymentData(paymentDataRequest)
    .then(paymentData => {
      // Process payment
      console.log('Payment successful', paymentData);
    });
};
```

---

## Backend Requirements

For production use, you'll need a backend server to:

1. **Generate payment tokens/checksums**
2. **Verify payment signatures**
3. **Store transaction records**
4. **Handle webhooks for payment status**

### Recommended Backend Stack:
- Node.js + Express
- MongoDB/PostgreSQL for transaction storage
- Environment variables for API keys

### Example Backend Endpoint:

```javascript
// server.js
const express = require('express');
const Razorpay = require('razorpay');

const app = express();
app.use(express.json());

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET
});

app.post('/api/create-order', async (req, res) => {
  const { amount, currency } = req.body;
  
  const options = {
    amount: amount * 100,
    currency: currency || 'INR',
    receipt: `receipt_${Date.now()}`
  };
  
  try {
    const order = await razorpay.orders.create(options);
    res.json(order);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post('/api/verify-payment', (req, res) => {
  const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;
  
  // Verify signature
  const crypto = require('crypto');
  const hmac = crypto.createHmac('sha256', process.env.RAZORPAY_KEY_SECRET);
  hmac.update(razorpay_order_id + '|' + razorpay_payment_id);
  const generated_signature = hmac.digest('hex');
  
  if (generated_signature === razorpay_signature) {
    // Payment is verified
    res.json({ success: true });
  } else {
    res.status(400).json({ success: false });
  }
});

app.listen(3000, () => console.log('Server running on port 3000'));
```

---

## Security Best Practices

1. **Never expose API secrets in frontend code**
2. **Always verify payments on the backend**
3. **Use HTTPS in production**
4. **Implement rate limiting**
5. **Log all transactions**
6. **Handle payment failures gracefully**
7. **Implement webhook handlers for async payment updates**

---

## Testing

### Test Credentials

**Razorpay Test Cards:**
- Card Number: 4111 1111 1111 1111
- CVV: Any 3 digits
- Expiry: Any future date

**Stripe Test Cards:**
- Card Number: 4242 4242 4242 4242
- CVV: Any 3 digits
- Expiry: Any future date

---

## Premium Features to Implement

Once payment is successful, enable these features:

1. **Advanced Analytics** - Charts and graphs
2. **Export Data** - Excel/PDF export
3. **Custom Categories** - User-defined categories
4. **Email Notifications** - Budget alerts
5. **Multi-currency** - Support for different currencies
6. **Recurring Expenses** - Auto-add monthly expenses
7. **Family Sharing** - Multiple user accounts

---

## Support

For payment gateway specific issues:
- Razorpay: https://razorpay.com/support/
- Stripe: https://support.stripe.com/
- PayPal: https://www.paypal.com/support/

---

## License

This integration guide is part of the Expense Tracker project.
