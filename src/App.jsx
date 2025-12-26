import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import Login from './components/Login';
import Signup from './components/Signup';
import Dashboard from './components/Dashboard';
import Contact from './components/Contact';
import About from './components/About';
import Settings from './components/Settings';

import Footer from './components/Footer';
import './App.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/dashboard" element={<Dashboard />} />

        <Route path="/contact" element={<Contact />} />
        <Route path="/about" element={<About />} />
        <Route path="/settings" element={<Settings />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
