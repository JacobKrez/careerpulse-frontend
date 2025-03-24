import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from './context/AuthContext';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import Jobs from './components/Jobs';
import Interviews from './components/Interviews';
import CareerGrowth from './components/CareerGrowth';
import Networking from './components/Networking';
import { AppBar, Toolbar, Typography, Button, Tabs, Tab, Box, Link } from '@mui/material';
import './App.css';

function App() {
  const { currentUser, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/login');
    } catch (error) {
      console.error('Failed to log out:', error);
    }
  };

  return (
    <div className="app-container">
      {currentUser && (
        <AppBar position="sticky" className="app-bar">
          <Toolbar>
            <Typography variant="h6" sx={{ flexGrow: 1 }}>
              CareerPulseAI - Welcome, {currentUser.email}
            </Typography>
            <Tabs
              value={location.pathname}
              onChange={(e, newValue) => navigate(newValue)}
              textColor="inherit"
              indicatorColor="secondary"
              sx={{ '& .MuiTab-root': { color: '#FFFFFF', fontWeight: 500 } }}
            >
              <Tab label="Jobs" value="/dashboard/jobs" />
              <Tab label="Interviews" value="/dashboard/interviews" />
              <Tab label="Career Growth" value="/dashboard/career-growth" />
              <Tab label="Networking" value="/dashboard/networking" />
            </Tabs>
            <Button color="inherit" onClick={handleLogout}>
              Logout
            </Button>
          </Toolbar>
        </AppBar>
      )}
      <main>
        <Routes>
          <Route path="/login" element={currentUser ? <Navigate to="/dashboard" /> : <Login />} />
          <Route path="/dashboard" element={currentUser ? <Dashboard /> : <Navigate to="/login" />}>
            <Route path="jobs" element={<Jobs />} />
            <Route path="interviews" element={<Interviews />} />
            <Route path="career-growth" element={<CareerGrowth />} />
            <Route path="networking" element={<Networking />} />
            <Route path="" element={<Navigate to="jobs" />} />
          </Route>
          <Route path="/" element={<Navigate to="/login" />} />
        </Routes>
      </main>
      {currentUser && (
        <footer className="footer">
          <Typography variant="body2" align="center">
            © 2025 CareerPulseAI. All rights reserved. |{' '}
            <Link href="https://github.com/JacobKrez/careerpulse-frontend" target="_blank" rel="noopener noreferrer" color="inherit">
              GitHub
            </Link>
          </Typography>
        </footer>
      )}
    </div>
  );
}

// Wrap App with Router to use useLocation and useNavigate
const AppWithRouter = () => (
  <Router>
    <App />
  </Router>
);

export default AppWithRouter;