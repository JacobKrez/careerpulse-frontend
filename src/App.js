import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './context/AuthContext';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import Jobs from './components/Jobs';
import Interviews from './components/Interviews';
import CareerGrowth from './components/CareerGrowth';
import Networking from './components/Networking';
import './App.css';

function App() {
  const { currentUser } = useAuth();

  return (
    <Router>
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
    </Router>
  );
}

export default App;