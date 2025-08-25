import React, { useState } from 'react';
import { Box, TextField, Button, Typography, Paper, Snackbar, Alert } from '@mui/material';
import { useAppContext } from '../context/AppContext';
import { useNavigate } from 'react-router-dom';

const Login: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const { dispatch } = useAppContext();
  const navigate = useNavigate();

  const handleLogin = (event: React.FormEvent) => {
    event.preventDefault();
    setError('');
    setSnackbarOpen(false);

    if (username === 'trupti' && password === '1234') {
      dispatch({ type: 'LOGIN_SUCCESS' });
      navigate('/'); // Redirect to dashboard
    } else {
      setError('Invalid username or password.');
      setSnackbarOpen(true);
    }
  };

  const handleSnackbarClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }
    setSnackbarOpen(false);
  };

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
        backgroundColor: '#121212', // Dark background
      }}
    >
      <Paper elevation={6} sx={{ p: 4, maxWidth: 400, width: '100%', borderRadius: '8px' }}>
        <Typography variant="h5" component="h1" gutterBottom align="center">
          Login
        </Typography>
        <Box component="form" onSubmit={handleLogin} sx={{ mt: 2 }}>
          <TextField
            label="Username"
            variant="outlined"
            fullWidth
            margin="normal"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            error={!!error}
          />
          <TextField
            label="Password"
            variant="outlined"
            fullWidth
            margin="normal"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            error={!!error}
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            sx={{ mt: 3, mb: 2 }}
          >
            Login
          </Button>
        </Box>
      </Paper>
      <Snackbar open={snackbarOpen} autoHideDuration={6000} onClose={handleSnackbarClose}>
        <Alert onClose={handleSnackbarClose} severity="error" sx={{ width: '100%' }}>
          {error}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default Login;
