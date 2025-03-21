import React, { useState } from 'react';
import { Typography, Box, TextField, Button, List, ListItem, ListItemText, Divider } from '@mui/material';

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

  const handleGenerate = async () => {
    try {
      setError('');
      // Generate email
      const emailResponse = await fetch(
        `https://careerpulse-backend.onrender.com/email?job=${jobRole}&skills=${skills}&company=${company}&experience=${experience}`
      );
      if (!emailResponse.ok) throw new Error('Email generation failed');
      const emailContent = await emailResponse.text();
      setEmail(emailContent);

      // Generate interview questions
      const interviewResponse = await fetch(
        `https://careerpulse-backend.onrender.com/interview?job=${jobRole}&skills=${skills}`
      );
      if (!interviewResponse.ok) throw new Error('Questions generation failed');
      const interviewContent = await interviewResponse.text();
      setQuestions(interviewContent);
    } catch (error) {
      console.error('Error generating content:', error);
      setError('Failed to generate preparation materials—try again!');
    }
  };

  const handleMockInterview = async () => {
    try {
      setError('');
      const response = await fetch('https://careerpulse-backend.onrender.com/mock-interview', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ job: jobRole, skills }),
      });
      if (!response.ok) throw new Error('Mock interview failed');
      const mockContent = await response.text();
      setMockInterview(mockContent);
    } catch (error) {
      console.error('Error generating mock interview:', error);
      setError('Failed to generate mock interview—try again!');
    }
  };

  return (
    <Box>
      <Typography variant="h5" gutterBottom>
        Prepare for Interviews
      </Typography>
      <Box sx={{ mb: 2 }}>
        <TextField
          label="Job Role (e.g., Investment Banker)"
          value={jobRole}
          onChange={(e) => setJobRole(e.target.value)}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Skills (e.g., Financial Analysis, Excel)"
          value={skills}
          onChange={(e) => setSkills(e.target.value)}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Company (e.g., Goldman Sachs)"
          value={company}
          onChange={(e) => setCompany(e.target.value)}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Years of Experience"
          value={experience}
          onChange={(e) => setExperience(e.target.value)}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Interview Date"
          type="datetime-local"
          value={interviewDate}
          onChange={(e) => setInterviewDate(e.target.value)}
          fullWidth
          margin="normal"
          InputLabelProps={{ shrink: true }}
        />
        <Box sx={{ display: 'flex', gap: 2 }}>
          <Button variant="contained" onClick={handleGenerate}>
            Generate Preparation Materials
          </Button>
          <Button variant="contained" onClick={handleMockInterview} disabled={!jobRole || !skills}>
            Start Mock Interview
          </Button>
        </Box>
      </Box>
      {error && <Typography color="error">{error}</Typography>}
      {email && (
        <>
          <Typography variant="h6">Outreach Email</Typography>
          <Typography sx={{ whiteSpace: 'pre-wrap', mb: 2 }}>{email}</Typography>
        </>
      )}
      {questions && (
        <>
          <Typography variant="h6">Interview Questions</Typography>
          <List>
            {questions.split('\n').map((question, index) => (
              <ListItem key={index}>
                <ListItemText primary={question} />
              </ListItem>
            ))}
          </List>
        </>
      )}
      {mockInterview && (
        <>
          <Typography variant="h6">Mock Interview</Typography>
          <Typography sx={{ whiteSpace: 'pre-wrap', mb: 2 }}>{mockInterview}</Typography>
        </>
      )}
      {interviewDate && (
        <>
          <Divider sx={{ my: 2 }} />
          <Typography variant="h6">Scheduled Interview</Typography>
          <Typography>
            Interview for {jobRole} at {company} on {new Date(interviewDate).toLocaleString()}.
          </Typography>
          <Typography>
            Highlight your skills: {skills}. Prepare using the questions above and the outreach email.
          </Typography>
        </>
      )}
    </Box>
  );
}

export default Interviews;