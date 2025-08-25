import React, { useState } from 'react';
import { Box, TextField, Button, Typography, Paper, Snackbar, Alert, Grid, Checkbox, FormControlLabel, Link } from '@mui/material';
import { useAppContext } from '../context/AppContext';
import { useNavigate } from 'react-router-dom';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';

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
        minHeight: '100vh',
        backgroundColor: '#F0F2F5', // Light background color
      }}
    >
      {/* Left Section - Illustration */}
      <Box
        sx={{
          flex: 1,
          backgroundImage: `url('/references/Login アセット.jpeg')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          display: { xs: 'none', md: 'block' }, // Hide on small screens
        }}
      />

      {/* Right Section - Login Form */}
      <Box
        sx={{
          flex: 1,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          p: 2,
        }}
      >
        <Paper
          elevation={0} // Remove shadow
          sx={{
            p: 4,
            maxWidth: 450,
            width: '100%',
            borderRadius: '16px', // More rounded corners
            backgroundColor: '#FFC107', // Yellow background
            color: '#333', // Dark text for contrast
          }}
        >
          <Typography variant="h5" component="h1" gutterBottom align="center" sx={{ fontWeight: 'bold', color: '#333' }}>
            Login to continue
          </Typography>
          <Box component="form" onSubmit={handleLogin} sx={{ mt: 3 }}>
            <TextField
              label="Username/Email"
              variant="outlined"
              fullWidth
              margin="normal"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              error={!!error}
              InputProps={{
                startAdornment: <PersonOutlineIcon sx={{ mr: 1, color: '#333' }} />,
                style: { borderRadius: '8px', backgroundColor: 'white' }, // Rounded input fields, white background
              }}
              InputLabelProps={{ style: { color: '#333' } }}
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
              InputProps={{
                startAdornment: <VisibilityOffIcon sx={{ mr: 1, color: '#333' }} />,
                style: { borderRadius: '8px', backgroundColor: 'white' }, // Rounded input fields, white background
              }}
              InputLabelProps={{ style: { color: '#333' } }}
            />
            <Grid container alignItems="center" justifyContent="space-between" sx={{ mt: 1, mb: 2 }}>
              <FormControlLabel
                control={<Checkbox sx={{ color: '#333' }} />}
                label={<Typography variant="body2" sx={{ color: '#333' }}>Remember me</Typography>}
              />
              <Link href="#" variant="body2" sx={{ color: '#333', textDecoration: 'none' }}>
                Forget password?
              </Link>
            </Grid>
            <Button
              type="submit"
              variant="contained"
              fullWidth
              sx={{
                mt: 2,
                mb: 2,
                backgroundColor: '#1A237E', // Dark blue button
                color: 'white',
                borderRadius: '8px',
                py: 1.5,
                '&:hover': {
                  backgroundColor: '#0D47A1', // Darker blue on hover
                },
              }}
            >
              Login
            </Button>
            <Typography variant="body2" align="center" sx={{ color: '#333', mt: 2 }}>
              or sign up using
            </Typography>
            <Box sx={{ display: 'flex', justifyContent: 'center', mt: 1 }}>
              <FacebookIcon sx={{ fontSize: 40, color: '#1A237E', mx: 1 }} />
              <TwitterIcon sx={{ fontSize: 40, color: '#1A237E', mx: 1 }} />
            </Box>
          </Box>
        </Paper>
      </Box>
      <Snackbar open={snackbarOpen} autoHideDuration={6000} onClose={handleSnackbarClose}>
        <Alert onClose={handleSnackbarClose} severity="error" sx={{ width: '100%' }}>
          {error}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default Login;
