import React, { useState } from 'react';
import { Typography, Box, TextField, Button, List, ListItem, ListItemText } from '@mui/material';
import './Jobs.css';

function Jobs() {
  const [jobRole, setJobRole] = useState('');
  const [jobs, setJobs] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const fetchJobs = async () => {
    if (!jobRole) {
      setError('Please enter a job role to search for jobs.');
      return;
    }

    setLoading(true);
    setError('');
    try {
      const response = await fetch(`https://careerpulse-backend.onrender.com/scrape?skills=${encodeURIComponent(jobRole)}`);
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
          {loading ? <span className="spinner"></span> : 'Search Jobs'}
        </Button>
      </Box>
      {error && <Typography color="error">{error}</Typography>}
      {loading && <Typography>Loading jobs...</Typography>}
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