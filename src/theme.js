// src/theme.js
import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#1E3A8A',
      light: '#3B82F6',
    },
    secondary: {
      main: '#10B981',
      light: '#059669',
    },
    background: {
      default: '#F9FAFB',
      paper: '#FFFFFF',
    },
    text: {
      primary: '#1F2937',
    },
  },
  typography: {
    fontFamily: "'Inter', sans-serif",
    h5: {
      fontSize: '2rem',
      fontWeight: 700,
      color: '#1E3A8A',
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          borderRadius: 4,
          padding: '0.75rem 1.5rem',
          background: 'linear-gradient(135deg, #1E3A8A 0%, #3B82F6 100%)',
          color: '#FFFFFF',
          '&:hover': {
            transform: 'translateY(-2px)',
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.15)',
            background: 'linear-gradient(135deg, #1E3A8A 0%, #3B82F6 100%)',
          },
          '&:disabled': {
            background: '#D1D5DB',
          },
        },
      },
    },
  },
});

export default theme;