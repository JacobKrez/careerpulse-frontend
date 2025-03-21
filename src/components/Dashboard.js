import React from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate, Outlet, Link } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Button, Tabs, Tab, Box, Container } from '@mui/material';

function Dashboard() {
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  return (
    <div>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            CareerPulseAI - Welcome, {currentUser.email}
          </Typography>
          <Button color="inherit" onClick={handleLogout}>
            Logout
          </Button>
        </Toolbar>
      </AppBar>
      <Container sx={{ mt: 4 }}>
        <Tabs value={window.location.pathname} onChange={(e, newValue) => navigate(newValue)} centered>
          <Tab label="Jobs" value="/dashboard/jobs" component={Link} to="/dashboard/jobs" />
          <Tab label="Interviews" value="/dashboard/interviews" component={Link} to="/dashboard/interviews" />
          <Tab label="Career Growth" value="/dashboard/career-growth" component={Link} to="/dashboard/career-growth" />
          <Tab label="Networking" value="/dashboard/networking" component={Link} to="/dashboard/networking" />
        </Tabs>
        <Box sx={{ mt: 4 }}>
          <Outlet />
        </Box>
      </Container>
    </div>
  );
}

export default Dashboard;