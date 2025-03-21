import React from 'react';
import { Typography, Box } from '@mui/material';

function CareerGrowth() {
  return (
    <Box>
      <Typography variant="h5" gutterBottom>
        Career Growth
      </Typography>
      <Typography>
        Set your career goals and get personalized advice on how to achieve them. For example, to become an Investment Banker:
      </Typography>
      <Typography sx={{ mt: 2 }}>
        - Build a strong foundation in finance and economics.<br />
        - Gain experience through internships at financial institutions.<br />
        - Network with professionals in the industry.<br />
        - Prepare for rigorous interviews with our AI tools.
      </Typography>
    </Box>
  );
}

export default CareerGrowth;