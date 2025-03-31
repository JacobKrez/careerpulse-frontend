// src/components/Interviews.js
import React, { useState } from 'react';
import { Typography, Box, TextField, Button, List, ListItem, ListItemText, Divider, CircularProgress, Alert } from '@mui/material';
import { Share, ThumbUp, ThumbDown } from '@mui/icons-material';
import './Interviews.css';

function Interviews() {
  const [jobRole, setJobRole] = useState('');
  const [skills, setSkills] = useState('');
  const [company, setCompany] = useState('');
  const [experience, setExperience] = useState('');
  const [interviewDate, setInterviewDate] = useState('');
  const [questions, setQuestions] = useState('');
  const [email, setEmail] = useState('');
  const [mockInterview, setMockInterview] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'https://careerpulse-backend.onrender.com';

  const handleGenerate = async () => {
    setLoading(true);
    setError('');
    try {
      const emailResponse = await fetch(
        `${API_BASE_URL}/openai/email?job=${encodeURIComponent(jobRole)}&skills=${encodeURIComponent(skills)}&company=${encodeURIComponent(company)}&experience=${encodeURIComponent(experience)}`,
        { timeout: 30000 }
      );
      if (!emailResponse.ok) throw new Error('Email generation failed');
      const emailContent = await emailResponse.text();
      setEmail(emailContent);

      const interviewResponse = await fetch(
        `${API_BASE_URL}/openai/interview?job=${encodeURIComponent(jobRole)}&skills=${encodeURIComponent(skills)}`,
        { timeout: 30000 }
      );
      if (!interviewResponse.ok) throw new Error('Questions generation failed');
      const interviewContent = await interviewResponse.text();
      setQuestions(interviewContent);
    } catch (error) {
      console.error('Error generating content:', error);
      setError('Failed to generate preparation materials—try again!');
    } finally {
      setLoading(false);
    }
  };

  const handleMockInterview = async () => {
    setLoading(true);
    setError('');
    try {
      const response = await fetch(`${API_BASE_URL}/openai/mock-interview`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ job: jobRole, skills }),
      }, { timeout: 30000 });
      if (!response.ok) throw new Error('Mock interview failed');
      const mockContent = await response.text();
      setMockInterview(mockContent);
    } catch (error) {
      console.error('Error generating mock interview:', error);
      setError('Failed to generate mock interview—try again!');
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(email);
    alert('Email copied to clipboard!');
  };

  return (
    <Box className="interviews-container">
      <Typography variant="h5" gutterBottom>
        Prepare for Your Interview
      </Typography>
      <Box className="input-section">
        <TextField
          label="Job Role (e.g., Investment Banker)"
          value={jobRole}
          onChange={(e) => setJobRole(e.target.value)}
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
          label="Company (e.g., Goldman Sachs)"
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
        <TextField
          label="Interview Date"
          type="datetime-local"
          value={interviewDate}
          onChange={(e) => setInterviewDate(e.target.value)}
          fullWidth
          margin="normal"
          variant="outlined"
          InputLabelProps={{ shrink: true }}
        />
        <Box className="button-group">
          <Button variant="contained" onClick={handleGenerate} disabled={loading || !jobRole || !skills}>
            Generate Preparation Materials
          </Button>
          <Button variant="contained" onClick={handleMockInterview} disabled={loading || !jobRole || !skills}>
            Start Mock Interview
          </Button>
        </Box>
      </Box>
      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}
      {loading && (
        <Box sx={{ display: 'flex', justifyContent: 'center', my: 2 }}>
          <CircularProgress />
          <Typography sx={{ ml: 2 }}>Generating materials...</Typography>
        </Box>
      )}
      {(email || questions || mockInterview) && (
        <Box className="output-section">
          {email && (
            <Box className="output-card">
              <Typography variant="h6">Outreach Email</Typography>
              <Typography sx={{ whiteSpace: 'pre-wrap', mb: 2 }}>{email}</Typography>
              <Button variant="contained" className="copy-button" onClick={copyToClipboard} sx={{ mr: 2 }}>
                Copy to Clipboard
              </Button>
              <Button
                variant="outlined"
                startIcon={<Share />}
                onClick={() => {
                  navigator.share({
                    title: 'My Outreach Email from CareerPulseAI',
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
          {questions && (
            <Box className="output-card">
              <Typography variant="h6">Interview Questions</Typography>
              <List>
                {questions.split('\n').map((question, index) => (
                  <ListItem key={index}>
                    <ListItemText primary={question} />
                  </ListItem>
                ))}
              </List>
              <Button
                variant="outlined"
                startIcon={<Share />}
                sx={{ mt: 2 }}
                onClick={() => {
                  navigator.share({
                    title: 'My Interview Questions from CareerPulseAI',
                    text: questions,
                    url: window.location.href,
                  }).catch(() => alert('Sharing is not supported on this device.'));
                }}
              >
                Share Questions
              </Button>
              <Box sx={{ mt: 2, display: 'flex', gap: 1, alignItems: 'center' }}>
                <Typography>Were these questions helpful?</Typography>
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
          {mockInterview && (
            <Box className="output-card">
              <Typography variant="h6">Mock Interview</Typography>
              <Typography sx={{ whiteSpace: 'pre-wrap', mb: 2 }}>{mockInterview}</Typography>
              <Button
                variant="outlined"
                startIcon={<Share />}
                sx={{ mt: 2 }}
                onClick={() => {
                  navigator.share({
                    title: 'My Mock Interview from CareerPulseAI',
                    text: mockInterview,
                    url: window.location.href,
                  }).catch(() => alert('Sharing is not supported on this device.'));
                }}
              >
                Share Mock Interview
              </Button>
              <Box sx={{ mt: 2, display: 'flex', gap: 1, alignItems: 'center' }}>
                <Typography>Was this mock interview helpful?</Typography>
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
      )}
      {interviewDate && (
        <Box className="output-card">
          <Divider sx={{ my: 2 }} />
          <Typography variant="h6">Scheduled Interview</Typography>
          <Typography>
            Interview for {jobRole} at {company} on {new Date(interviewDate).toLocaleString()}.
          </Typography>
          <Typography>
            Highlight your skills: {skills}. Prepare using the questions above and the outreach email.
          </Typography>
        </Box>
      )}
    </Box>
  );
}

export default Interviews;