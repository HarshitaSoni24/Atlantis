
import React, { useState } from 'react';
import {
  Typography, Box, TextField, Button, Snackbar, Alert, Avatar
} from '@mui/material';
import { useAppContext } from '../context/AppContext';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

const Settings: React.FC = () => {
  const { state, dispatch } = useAppContext();
  const navigate = useNavigate(); // Initialize useNavigate
  const [avatarSrc, setAvatarSrc] = useState(state.userProfile.avatarSrc || '');
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [avatarSrcError, setAvatarSrcError] = useState(false);
  const [avatarSrcHelperText, setAvatarSrcHelperText] = useState('');

  const handleSave = () => {
    if (!avatarSrc.trim()) {
      setAvatarSrcError(true);
      setAvatarSrcHelperText('Avatar URL cannot be empty.');
      setSnackbarMessage('Avatar URL cannot be empty.');
      setOpenSnackbar(true);
      return;
    }

    // Basic URL format validation
    if (!avatarSrc.startsWith('http://') && !avatarSrc.startsWith('https://')) {
      setAvatarSrcError(true);
      setAvatarSrcHelperText('Please enter a valid URL (must start with http:// or https://).');
      setSnackbarMessage('Please enter a valid URL.');
      setOpenSnackbar(true);
      return;
    }

    dispatch({ type: 'SET_AVATAR_SRC', payload: avatarSrc });
    setSnackbarMessage('Settings saved successfully!');
    setOpenSnackbar(true);
    setAvatarSrcError(false); // Clear error on successful save
    setAvatarSrcHelperText('');
  };

  const handleLogout = () => {
    dispatch({ type: 'LOGOUT' });
    navigate('/login'); // Redirect to login page
  };

  const handleCloseSnackbar = (event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpenSnackbar(false);
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>Settings</Typography>

      <Box sx={{ mb: 4 }}>
        <Typography variant="h6" gutterBottom>Profile Settings</Typography>
        <TextField
          label="Avatar URL"
          variant="outlined"
          value={avatarSrc}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            setAvatarSrc(e.target.value);
            setAvatarSrcError(false); // Clear error on change
            setAvatarSrcHelperText('');
          }}
          fullWidth
          sx={{ mb: 2, maxWidth: 400 }}
          error={avatarSrcError}
          helperText={avatarSrcHelperText}
        />
        {avatarSrc && (
          <Box sx={{ mt: 1, mb: 2 }}>
            <Typography variant="subtitle2" gutterBottom>Preview:</Typography>
            <Avatar src={avatarSrc} sx={{ width: 80, height: 80 }} />
          </Box>
        )}
        <Button variant="contained" onClick={handleSave}>
          Save Settings
        </Button>
      </Box>

      <Box sx={{ mt: 4 }}>
        <Typography variant="h6" gutterBottom>Account Actions</Typography>
        <Button variant="outlined" color="error" onClick={handleLogout}>
          Logout
        </Button>
      </Box>

      <Snackbar open={openSnackbar} autoHideDuration={6000} onClose={handleCloseSnackbar}>
        <Alert onClose={handleCloseSnackbar} severity={avatarSrcError ? "error" : "success"} sx={{ width: '100%' }}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default Settings;
