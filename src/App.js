import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import Dashboard from './components/Dashboard';
import './App.css';

function App() {
  const [darkMode, setDarkMode] = useState(() => {
    const saved = localStorage.getItem('theme');
    return saved ? saved === 'dark' : true; // Default to dark mode
  });

  const [showWelcome, setShowWelcome] = useState(false);

  useEffect(() => {
    localStorage.setItem('theme', darkMode ? 'dark' : 'light');
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  const toggleTheme = () => {
    setDarkMode(!darkMode);
  };

  // Simple protected route check
  const isAuthenticated = () => {
    return !!localStorage.getItem('user');
  };

  const ProtectedRoute = ({ children }) => {
    if (!isAuthenticated()) {
      return <Navigate to="/" replace />;
    }
    return children;
  };

  const LoginRoute = ({ children }) => {
    if (isAuthenticated()) {
      return <Navigate to="/dashboard" replace />;
    }
    return children;
  };

  const handleLoginSuccess = () => {
    setShowWelcome(true);
  };

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <LoginRoute>
              <Login onLoginSuccess={handleLoginSuccess} />
            </LoginRoute>
          }
        />
        <Route path="/register" element={<Register />} />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard
                darkMode={darkMode}
                toggleTheme={toggleTheme}
                showWelcome={showWelcome}
                setShowWelcome={setShowWelcome}
              />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
}


export default App;
