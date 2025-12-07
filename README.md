# 💰 Expense Tracker

A modern, responsive expense tracking application built with React and Vite. Manage your daily expenses, set budgets, and take control of your finances with an intuitive and user-friendly interface.

![Expense Tracker](https://img.shields.io/badge/React-19.0.0-blue)
![Vite](https://img.shields.io/badge/Vite-6.2.0-purple)
![License](https://img.shields.io/badge/license-MIT-green)

## ✨ Features

- 🔐 **User Authentication** - Secure login and signup system
- 💰 **Budget Management** - Set and track monthly budgets
- 📊 **Expense Tracking** - Add, view, and manage daily expenses
- 🏷️ **Categories** - Organize expenses by Food, Transport, Bills, Shopping, Healthcare, Entertainment, and Others
- 📈 **Real-time Calculations** - Automatic calculation of total spent and remaining budget
- 📱 **Responsive Design** - Works seamlessly on desktop, tablet, and mobile devices
- 🎨 **Modern UI** - Beautiful gradient designs and smooth animations
- 💾 **Local Storage** - Data persists across sessions

## 🚀 Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/expense-tracker.git
cd expense-tracker
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173`

## 🛠️ Built With

- **React 19** - UI library
- **Vite** - Build tool and dev server
- **React Router DOM** - Client-side routing
- **CSS3** - Styling with modern gradients and animations
- **LocalStorage API** - Data persistence

## 📁 Project Structure

```

expense-tracker/
├── backend/             # Django Backend
│   ├── api/             # API App
│   ├── config/          # Project Config
│   ├── manage.py
│   └── db.sqlite3
├── src/                 # React Frontend
│   ├── components/      # React components
│   ├── styles/          # CSS modules
│   ├── App.jsx
│   └── main.jsx
├── public/              # Static assets
├── index.html
├── package.json
└── vite.config.js

```

## 🎯 Usage

### Default Login Credentials

- **Username:** admin
- **Password:** admin123

Or create your own account through the signup page!

### Adding Expenses

1. Login to your account
2. Navigate to the Dashboard
3. Set your monthly budget (optional)
4. Click "Add Expense" tab
5. Fill in expense details (name, amount, category)
6. Click "Add Expense" button

### Viewing History

1. Go to Dashboard
2. Click "View History" tab
3. See all your expenses with total spent and remaining budget
4. Delete expenses as needed

## 🎨 Features in Detail

### Budget Management
Set a monthly budget to track your spending limits. The app will automatically calculate how much you've spent and how much remains.

### Expense Categories
Organize your expenses into categories:
- 🍔 Food
- 🚗 Transport
- 💡 Bills
- 🛍️ Shopping
- 🎬 Entertainment
- 🏥 Healthcare
- 📦 Others

### Responsive Design
The application is fully responsive and works on:
- Desktop computers
- Tablets
- Mobile phones

## 🔧 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## 📝 License

This project is licensed under the MIT License.

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 👨‍💻 Author

Your Name - [GitHub Profile](https://github.com/yourusername)

## 🙏 Acknowledgments

- React team for the amazing library
- Vite team for the blazing fast build tool
- All contributors who help improve this project

---

Made with ❤️ and React
