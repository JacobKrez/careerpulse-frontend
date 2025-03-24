import React, { useState } from 'react';
import { Typography, Box, TextField, Button } from '@mui/material';
import './CareerGrowth.css';

function CareerGrowth() {
  const [job, setJob] = useState('');
  const [experience, setExperience] = useState('');
  const [careerPlan, setCareerPlan] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const fetchCareerPlan = async () => {
    if (!job) {
      setError('Please enter a job role.');
      return;
    }

    setLoading(true);
    setError('');
    try {
      const response = await fetch(
        `https://careerpulse-backend.onrender.com/career-coach?job=${encodeURIComponent(job)}&experience=${encodeURIComponent(experience)}`
      );
      if (!response.ok) throw new Error('Failed to fetch career plan');
      const data = await response.text();
      setCareerPlan(data);
    } catch (error) {
      console.error('Error fetching career plan:', error);
      setError('Failed to fetch career plan—try again!');
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
          {loading ? <span className="spinner"></span> : 'Get Career Plan'}
        </Button>
      </Box>
      {error && <Typography color="error">{error}</Typography>}
      {loading && <Typography>Loading career plan...</Typography>}
      {careerPlan && (
        <Box className="output-card">
          <Typography variant="h6">Your Career Plan</Typography>
          <Typography sx={{ whiteSpace: 'pre-wrap' }}>{careerPlan}</Typography>
        </Box>
      )}
    </Box>
  );
}

export default CareerGrowth;