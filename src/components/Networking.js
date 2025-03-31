// src/components/Networking.js
import React, { useState } from 'react';
import { Typography, Box, TextField, Button, CircularProgress, Alert } from '@mui/material';
import { Share, ThumbUp, ThumbDown } from '@mui/icons-material';
import './Networking.css';

function Networking() {
  const [job, setJob] = useState('');
  const [skills, setSkills] = useState('');
  const [company, setCompany] = useState('');
  const [experience, setExperience] = useState('');
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'https://careerpulse-backend.onrender.com';

  const fetchNetworkingEmail = async () => {
    if (!job || !skills) {
      setError('Please enter a job role and skills.');
      return;
    }

    setLoading(true);
    setError('');
    try {
      const response = await fetch(
        `${API_BASE_URL}/openai/email?job=${encodeURIComponent(job)}&skills=${encodeURIComponent(skills)}&company=${encodeURIComponent(company)}&experience=${encodeURIComponent(experience)}`,
        { timeout: 30000 }
      );
      if (!response.ok) throw new Error('Failed to generate email');
      const data = await response.text();
      setEmail(data);
    } catch (error) {
      console.error('Error generating email:', error);
      setError('Failed to generate email—try again!');
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(email);
    alert('Email copied to clipboard!');
  };

  return (
    <Box className="networking-container">
      <Typography variant="h5" gutterBottom>
        Networking
      </Typography>
      <Typography sx={{ mb: 2 }}>
        Connect with professionals in your desired field. Tips for networking:
      </Typography>
      <Typography sx={{ mb: 2 }}>
        - Attend industry events and conferences.<br />
        - Join LinkedIn groups and engage with posts.<br />
        - Use our AI-generated outreach emails to introduce yourself.<br />
        - Follow up with contacts regularly to build relationships.
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
          label="Skills (e.g., Financial Analysis, Excel)"
          value={skills}
          onChange={(e) => setSkills(e.target.value)}
          fullWidth
          margin="normal"
          variant="outlined"
        />
        <TextField
          label="Target Company (e.g., Goldman Sachs)"
          value={company}
          onChange={(e) => setCompany(e.target.value)}
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
        <Button variant="contained" onClick={fetchNetworkingEmail} disabled={loading || !job || !skills}>
          Generate Networking Email
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
          <Typography sx={{ ml: 2 }}>Loading email...</Typography>
        </Box>
      )}
      {email && (
        <Box className="output-card">
          <Typography variant="h6">Networking Email</Typography>
          <Typography sx={{ whiteSpace: 'pre-wrap', mb: 2 }}>{email}</Typography>
          <Button variant="contained" className="copy-button" onClick={copyToClipboard} sx={{ mr: 2 }}>
            Copy to Clipboard
          </Button>
          <Button
            variant="outlined"
            startIcon={<Share />}
            onClick={() => {
              navigator.share({
                title: 'My Networking Email from CareerPulseAI',
                text: email,
                url: window.location.href,
              }).catch(() => alert('Sharing is not supported on this device.'));
            }}
          >
            Share Email
          </Button>
          <Box sx={{ mt: 2, display: 'flex', gap: 1, alignItems: 'center' }}>
            <Typography>Was this email helpful?</Typography>
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

export default Networking;