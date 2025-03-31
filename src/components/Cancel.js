// src/components/Cancel.js
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Typography, Box, Button } from '@mui/material';

function Cancel() {
  const navigate = useNavigate();

  return (
    <Box sx={{ maxWidth: 600, margin: '0 auto', padding: '2rem', textAlign: 'center' }}>
      <Typography variant="h5" gutterBottom>
        Subscription Cancelled
      </Typography>
      <Typography variant="body1" sx={{ mb: 2 }}>
        You have cancelled your subscription. You can try again anytime.
      </Typography>
      <Button variant="contained" onClick={() => navigate('/dashboard')}>
        Go to Dashboard
      </Button>
    </Box>
  );
}

export default Cancel;