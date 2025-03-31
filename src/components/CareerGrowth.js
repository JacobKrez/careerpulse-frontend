// src/components/CareerGrowth.js
import React, { useState } from 'react';
import { Typography, Box, TextField, Button, CircularProgress, Alert, Share, ThumbUp, ThumbDown } from '@mui/material';
import './CareerGrowth.css';

function CareerGrowth() {
  const [job, setJob] = useState('');
  const [experience, setExperience] = useState('');
  const [careerPlan, setCareerPlan] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'https://careerpulse-backend.onrender.com';

  const fetchCareerPlan = async () => {
    if (!job) {
      setError('Please enter a job role.');
      return;
    }

    setLoading(true);
    setError('');
    try {
      const response = await fetch(
        `${API_BASE_URL}/career-coach?job=${encodeURIComponent(job)}&experience=${encodeURIComponent(experience)}`,
        { timeout: 10000 }
      );
      if (!response.ok) {
        throw new Error(`Failed to fetch career plan: ${response.statusText}`);
      }
      const data = await response.text();
      if (!data) {
        throw new Error('No career plan received from the server.');
      }
      setCareerPlan(data);
    } catch (error) {
      console.error('Error fetching career plan:', error);
      setError(
        error.message.includes('Failed to fetch')
          ? 'Network error—please check your connection and try again.'
          : error.message
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box className="career-growth-container">
      <Typography variant="h5" gutterBottom>
        Plan Your Career Growth
      </Typography>
      <Box className="input-section">
        <TextField
          label="Target Job Role (e.g., Investment Banker)"
          value={job}
          onChange={(e) => setJob(e.target.value)}
          fullWidth
          margin="normal"
          variant="outlined"
        />
        <TextField
          label="Years of Experience"
          value={experience}
          onChange={(e) => setExperience(e.target.value)}
          fullWidth
          margin="normal"
          variant="outlined"
          type="number"
        />
        <Button variant="contained" onClick={fetchCareerPlan} disabled={loading || !job}>
          Get Career Plan
        </Button>
      </Box>
      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}
      {loading && (
        <Box sx={{ display: 'flex', justifyContent: 'center', my: 2 }}>
          <CircularProgress />
          <Typography sx={{ ml: 2 }}>Loading career plan...</Typography>
        </Box>
      )}
      {careerPlan && (
        <Box className="output-card">
          <Typography variant="h6">Your Career Plan</Typography>
          <Typography sx={{ whiteSpace: 'pre-wrap' }}>{careerPlan}</Typography>
          <Button
            variant="outlined"
            startIcon={<Share />}
            sx={{ mt: 2, mr: 2 }}
            onClick={() => {
              navigator.share({
                title: 'My Career Plan from CareerPulseAI',
                text: careerPlan,
                url: window.location.href,
              }).catch(() => alert('Sharing is not supported on this device.'));
            }}
          >
            Share Plan
          </Button>
          <Box sx={{ mt: 2, display: 'flex', gap: 1, alignItems: 'center' }}>
            <Typography>Was this plan helpful?</Typography>
            <Button
              startIcon={<ThumbUp />}
              onClick={() => alert('Thanks for your feedback!')}
            >
              Yes
            </Button>
            <Button
              startIcon={<ThumbDown />}
              onClick={() => alert('Sorry to hear that. We’ll improve!')}
            >
              No
            </Button>
          </Box>
        </Box>
      )}
    </Box>
  );
}

export default CareerGrowth;