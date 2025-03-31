// src/components/Jobs.js
import React, { useState } from 'react';
import { Typography, Box, TextField, Button, List, ListItem, ListItemText, CircularProgress, Alert } from '@mui/material';
import './Jobs.css';

function Jobs() {
  const [jobRole, setJobRole] = useState('');
  const [jobs, setJobs] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'https://careerpulse-backend.onrender.com';

  const fetchJobs = async () => {
    if (!jobRole) {
      setError('Please enter a job role to search for jobs.');
      return;
    }

    setLoading(true);
    setError('');
    try {
      const response = await fetch(`${API_BASE_URL}/scrape?skills=${encodeURIComponent(jobRole)}`, { timeout: 10000 });
      if (!response.ok) throw new Error('Failed to fetch jobs');
      const data = await response.json();
      setJobs(data);
    } catch (error) {
      console.error('Error fetching jobs:', error);
      setError('Failed to fetch jobs—try again!');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box className="jobs-container">
      <Typography variant="h5" gutterBottom>
        Find Jobs
      </Typography>
      <Box className="input-section">
        <TextField
          label="Desired Job Role (e.g., Developer)"
          value={jobRole}
          onChange={(e) => setJobRole(e.target.value)}
          fullWidth
          margin="normal"
          variant="outlined"
        />
        <Button variant="contained" onClick={fetchJobs} disabled={loading}>
          Search Jobs
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
          <Typography sx={{ ml: 2 }}>Loading jobs...</Typography>
        </Box>
      )}
      {jobs.length > 0 && (
        <List className="jobs-list">
          {jobs.map((job, index) => (
            <ListItem key={index} className="job-item">
              <ListItemText
                primary={`${job.title} at ${job.company}`}
                secondary={job.description}
              />
            </ListItem>
          ))}
        </List>
      )}
    </Box>
  );
}

export default Jobs;