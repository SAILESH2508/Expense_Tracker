# ⚡ Quick Start Guide

## Get Up and Running in 3 Minutes!

### Prerequisites
- Node.js installed (v14 or higher)
- npm or yarn
- Git (for GitHub upload)

### Installation

```bash
# 1. Navigate to project directory
cd expense-tracker

# 2. Install dependencies
npm install

# 3. Start development server
npm run dev
```

Open `http://localhost:5173` in your browser!

### First Time Setup

1. **Create an Account**
   - Click "Get Started" or "Sign Up"
   - Fill in username, email, and password
   - Click "Sign Up"

2. **Login**
   - Use your credentials or default: `admin` / `admin123`
   - Click "Login"

3. **Set Budget**
   - Go to Dashboard
   - Enter your monthly budget
   - Click "Set Budget"

4. **Add Expense**
   - Fill in expense name (e.g., "Groceries")
   - Enter amount (e.g., 500)
   - Select category
   - Click "Add Expense"

5. **View History**
   - Click "View History" tab
   - See all expenses and remaining budget
   - Delete expenses if needed

### Common Commands

```bash
# Development
npm run dev          # Start dev server

# Production
npm run build        # Build for production
npm run preview      # Preview production build

# Code Quality
npm run lint         # Run ESLint
```

### Project Structure (Simplified)

```
src/
├── components/      # All React components
├── styles/          # All CSS files
├── App.jsx          # Main app with routes
└── main.jsx         # Entry point
```

### Key Features

- 🔐 Login/Signup
- 💰 Budget tracking
- 📊 Expense management
- 📱 Mobile responsive
- 💾 Auto-save to browser

### Troubleshooting

**Port already in use?**
```bash
# Kill the process or use different port
npm run dev -- --port 3000
```

**Dependencies not installing?**
```bash
# Clear cache and reinstall
npm cache clean --force
npm install
```

**Build fails?**
```bash
# Check Node version
node --version  # Should be v14+

# Reinstall dependencies
rm -rf node_modules package-lock.json
npm install
```

### Upload to GitHub

```bash
# Initialize git
git init

# Add all files
git add .

# Commit
git commit -m "Initial commit"

# Add remote (replace with your repo URL)
git remote add origin https://github.com/USERNAME/REPO.git

# Push
git push -u origin main
```

### Need Help?

- 📖 Read [README.md](README.md) for detailed info
- 🚀 Check [DEPLOYMENT.md](DEPLOYMENT.md) for deployment
- 📋 See [PROJECT_SUMMARY.md](PROJECT_SUMMARY.md) for overview

### Default Login

- **Username:** admin
- **Password:** admin123

---

**That's it! You're ready to track expenses! 🎉**
