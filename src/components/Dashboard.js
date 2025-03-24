import React from 'react';
import { Outlet, Box } from '@mui/material';

function Dashboard() {
  return (
    <Box sx={{ mt: 4 }}>
      <Outlet />
    </Box>
  );
}

export default Dashboard;