# Payment Gateway Quick Start Guide

## What's Been Added

### 1. Premium Page (`/premium`)
- Three pricing tiers: Basic (Free), Pro (₹299/month), Premium (₹599/month)
- Multiple payment gateway options:
  - Razorpay (UPI, Cards, NetBanking, Wallets)
  - Stripe (Credit/Debit Cards)
  - PayPal (PayPal Balance or Cards)
  - Paytm (Paytm Wallet & UPI)
  - PhonePe (UPI Payment)
  - Google Pay (UPI Payment)

### 2. Old Theme Restored
- Red to Orange gradient background (matching original design)
- Orange/Orangered buttons with hover effects
- Updated all pages: Home, Dashboard, Login, Signup, Contact
- Navbar with orangered background
- Footer with dark theme

### 3. Navigation Updates
- Added "Premium" link in navbar (visible when logged in)
- Premium badge shown on Dashboard for upgraded users
- Upgrade prompt for free users

## Current Status

The payment integration is currently in **DEMO MODE**. It simulates the payment flow without processing real payments.

### What Works Now:
✅ Premium page with pricing plans
✅ Payment method selection
✅ Simulated payment processing
✅ Plan storage in localStorage
✅ Premium badge on Dashboard
✅ Transaction ID generation

### What Needs Real Integration:
❌ Actual payment processing
❌ Backend API for payment verification
❌ Webhook handlers for payment status
❌ Database for transaction storage
❌ Premium feature unlocking

## Quick Test

1. **Start the app:**
   ```bash
   npm run dev
   ```

2. **Login** (use default credentials: admin/admin123)

3. **Navigate to Premium** page from navbar

4. **Select a plan** (Pro or Premium)

5. **Choose payment method** (any option)

6. **Click "Pay"** - You'll see a simulated payment success

7. **Check Dashboard** - You'll see your premium badge

## Next Steps for Production

### Option 1: Razorpay (Easiest for India)

1. **Install Razorpay:**
   ```bash
   npm install razorpay
   ```

2. **Sign up:** https://razorpay.com/

3. **Get API keys** from dashboard

4. **Add to `.env`:**
   ```env
   VITE_RAZORPAY_KEY_ID=rzp_test_xxxxx
   VITE_RAZORPAY_KEY_SECRET=xxxxx
   ```

5. **Add Razorpay script to `index.html`:**
   ```html
   <script src="https://checkout.razorpay.com/v1/checkout.js"></script>
   ```

6. **Update `Premium.jsx`** - Replace the simulated payment with Razorpay code (see PAYMENT_INTEGRATION_GUIDE.md)

### Option 2: Stripe (International)

1. **Install Stripe:**
   ```bash
   npm install @stripe/stripe-js @stripe/react-stripe-js
   ```

2. **Sign up:** https://stripe.com/

3. **Follow integration steps** in PAYMENT_INTEGRATION_GUIDE.md

### Option 3: PayPal

1. **Install PayPal:**
   ```bash
   npm install @paypal/react-paypal-js
   ```

2. **Sign up:** https://developer.paypal.com/

3. **Follow integration steps** in PAYMENT_INTEGRATION_GUIDE.md

## Backend Setup (Required for Production)

You'll need a backend server to:
- Generate payment orders
- Verify payment signatures
- Store transactions
- Handle webhooks

**Recommended Stack:**
```
Node.js + Express + MongoDB/PostgreSQL
```

**Quick Backend Setup:**
```bash
mkdir backend
cd backend
npm init -y
npm install express razorpay cors dotenv
```

See PAYMENT_INTEGRATION_GUIDE.md for complete backend code examples.

## Premium Features to Implement

Once payment is working, implement these premium features:

### Pro Plan Features:
- [ ] Advanced analytics with charts (use Chart.js or Recharts)
- [ ] Custom expense categories
- [ ] Export to Excel/PDF (use xlsx, jsPDF)
- [ ] Email notifications (use nodemailer on backend)
- [ ] Priority support section

### Premium Plan Features:
- [ ] AI-powered spending insights
- [ ] Multi-currency support
- [ ] Recurring expense automation
- [ ] Family sharing (multiple users)
- [ ] Custom reports
- [ ] Dedicated account manager contact

## File Structure

```
src/
├── components/
│   ├── Premium.jsx          # New premium page
│   ├── Dashboard.jsx        # Updated with premium badge
│   └── Navbar.jsx           # Updated with premium link
├── styles/
│   ├── Premium.css          # Premium page styles
│   ├── Dashboard.css        # Updated with old theme
│   ├── Home.css            # Updated with old theme
│   ├── Auth.css            # Updated with old theme
│   ├── Contact.css         # Updated with old theme
│   ├── Navbar.css          # Updated with old theme
│   └── Footer.css          # Updated with old theme
└── App.jsx                 # Updated with premium route
```

## Testing Payment Flow

### Test the Demo:
1. Go to `/premium`
2. Click "Select Plan" on Pro or Premium
3. Choose any payment method
4. Click "Pay ₹299" or "Pay ₹599"
5. See success message with transaction ID
6. Navigate to Dashboard
7. See premium badge

### Test with Real Gateway (Razorpay Example):
1. Use test mode keys
2. Use test card: 4111 1111 1111 1111
3. Any CVV and future expiry date
4. Complete payment
5. Verify on Razorpay dashboard

## Environment Variables

Create `.env` file in root:

```env
# Razorpay
VITE_RAZORPAY_KEY_ID=your_key_id
VITE_RAZORPAY_KEY_SECRET=your_key_secret

# Stripe
VITE_STRIPE_PUBLISHABLE_KEY=your_publishable_key

# PayPal
VITE_PAYPAL_CLIENT_ID=your_client_id

# Backend API
VITE_API_URL=http://localhost:3000
```

## Security Checklist

- [ ] Never commit `.env` file
- [ ] Use environment variables for all API keys
- [ ] Verify payments on backend, not frontend
- [ ] Use HTTPS in production
- [ ] Implement rate limiting
- [ ] Log all transactions
- [ ] Handle payment failures gracefully
- [ ] Set up webhook handlers

## Support & Resources

- **Razorpay Docs:** https://razorpay.com/docs/
- **Stripe Docs:** https://stripe.com/docs
- **PayPal Docs:** https://developer.paypal.com/docs/
- **Payment Integration Guide:** See PAYMENT_INTEGRATION_GUIDE.md

## Troubleshooting

**Issue:** Payment button not working
- Check console for errors
- Verify API keys are loaded
- Check network tab for API calls

**Issue:** Payment succeeds but plan not updated
- Check localStorage in browser DevTools
- Verify payment callback is executing
- Check for JavaScript errors

**Issue:** Premium badge not showing
- Clear localStorage and try again
- Check if userPlan is stored correctly
- Refresh the page

## License

Part of Expense Tracker project.
