import React, { useState, useEffect } from 'react';
import { Typography, Box, TextField, Button, List, ListItem, ListItemText } from '@mui/material';

function Jobs() {
  const [jobRole, setJobRole] = useState('');
  const [jobs, setJobs] = useState([]);
  const [error, setError] = useState('');

  const fetchJobs = async () => {
    try {
      setError('');
      const response = await fetch('https://careerpulse-backend.onrender.com/jobs');
      if (!response.ok) throw new Error('Failed to fetch jobs');
      const data = await response.json();
      setJobs(data);
    } catch (error) {
      console.error('Error fetching jobs:', error);
      setError('Failed to fetch jobs—try again!');
    }
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  return (
    <Box>
      <Typography variant="h5" gutterBottom>
        Find Jobs
      </Typography>
      <Box sx={{ mb: 2 }}>
        <TextField
          label="Desired Job Role (e.g., Investment Banker)"
          value={jobRole}
          onChange={(e) => setJobRole(e.target.value)}
          fullWidth
          margin="normal"
        />
        <Button variant="contained" onClick={fetchJobs}>
          Refresh Jobs
        </Button>
      </Box>
      {error && <Typography color="error">{error}</Typography>}
      <List>
        {jobs.map((job, index) => (
          <ListItem key={index}>
            <ListItemText
              primary={`${job.title} at ${job.company}`}
              secondary={job.description}
            />
          </ListItem>
        ))}
      </List>
    </Box>
  );
}

export default Jobs;