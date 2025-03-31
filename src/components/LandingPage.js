// src/components/LandingPage.js
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Typography, Box, Button, Grid, Card, CardContent, Link } from '@mui/material';
import WorkIcon from '@mui/icons-material/Work';
import SchoolIcon from '@mui/icons-material/School';
import PeopleIcon from '@mui/icons-material/People';
import './LandingPage.css';

function LandingPage() {
  const navigate = useNavigate();

  const handleCardClick = (path) => {
    navigate(path);
  };

  return (
    <Box className="landing-container">
      {/* Hero Section */}
      <Box className="hero-section">
        <Typography variant="h1" className="hero-title">
          CareerPulseAI
        </Typography>
        <Typography variant="h4" className="hero-slogan">
          Supercharge Your Career
        </Typography>
        <Typography variant="h5" className="hero-subtitle">
          Find jobs, prepare for interviews, and grow your career—all in one place.
        </Typography>
        <Button variant="contained" className="hero-button" onClick={() => navigate('/login')}>
          Get Started
        </Button>
      </Box>

      {/* Features Section */}
      <Box className="features-section">
        <Typography variant="h4" className="features-title">
          Why Choose CareerPulseAI?
        </Typography>
        <Grid container spacing={4}>
          <Grid item xs={12} sm={6} md={4}>
            <Card
              className="feature-card"
              onClick={() => handleCardClick('/login?redirect=/dashboard/jobs')}
              sx={{ cursor: 'pointer' }}
            >
              <CardContent>
                <WorkIcon className="feature-icon" />
                <Typography variant="h6" className="feature-title">
                  Job Search
                </Typography>
                <Typography>
                  Find relevant job listings tailored to your skills and experience.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <Card
              className="feature-card"
              onClick={() => handleCardClick('/login?redirect=/dashboard/interviews')}
              sx={{ cursor: 'pointer' }}
            >
              <CardContent>
                <SchoolIcon className="feature-icon" />
                <Typography variant="h6" className="feature-title">
                  Interview Prep
                </Typography>
                <Typography>
                  Generate personalized interview questions and outreach emails.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <Card
              className="feature-card"
              onClick={() => handleCardClick('/login?redirect=/dashboard/networking')}
              sx={{ cursor: 'pointer' }}
            >
              <CardContent>
                <PeopleIcon className="feature-icon" />
                <Typography variant="h6" className="feature-title">
                  Networking
                </Typography>
                <Typography>
                  Connect with professionals and build your career network.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Box>

      {/* Footer */}
      <Box className="footer">
        <Typography variant="body2">
          © 2025 CareerPulseAI. All rights reserved. |{' '}
          <Link href="https://github.com/JacobKrez/careerpulse-frontend" target="_blank" rel="noopener noreferrer" color="inherit">
            GitHub
          </Link>{' '}
          | <Link href="/privacy" color="inherit">Privacy Policy</Link>
        </Typography>
      </Box>
    </Box>
  );
}

export default LandingPage;