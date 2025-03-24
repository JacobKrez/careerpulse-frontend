// src/components/Dashboard.js
import React from 'react';
import { Outlet } from 'react-router-dom'; // Correct import for Outlet
import { Box } from '@mui/material'; // Box remains from @mui/material

function Dashboard() {
  return (
    <Box sx={{ mt: 4 }}>
      <Outlet />
    </Box>
  );
}

export default Dashboard;