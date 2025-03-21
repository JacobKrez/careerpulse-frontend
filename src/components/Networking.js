import React from 'react';
import { Typography, Box } from '@mui/material';

function Networking() {
  return (
    <Box>
      <Typography variant="h5" gutterBottom>
        Networking
      </Typography>
      <Typography>
        Connect with professionals in your desired field. Tips for networking as an Investment Banker:
      </Typography>
      <Typography sx={{ mt: 2 }}>
        - Attend industry events and conferences.<br />
        - Join LinkedIn groups and engage with posts.<br />
        - Use our AI-generated outreach emails to introduce yourself.<br />
        - Follow up with contacts regularly to build relationships.
      </Typography>
    </Box>
  );
}

export default Networking;