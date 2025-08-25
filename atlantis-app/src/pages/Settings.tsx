
import React, { useState } from 'react';
import {
  Typography, Box, TextField, Button, Snackbar, Alert, Avatar
} from '@mui/material';
import { useAppContext } from '../context/AppContext';

const Settings: React.FC = () => {
  const { state, dispatch } = useAppContext();
  const [avatarSrc, setAvatarSrc] = useState(state.userProfile.avatarSrc || '');
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');

  const handleSave = () => {
    dispatch({ type: 'SET_AVATAR_SRC', payload: avatarSrc });
    setSnackbarMessage('Settings saved successfully!');
    setOpenSnackbar(true);
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
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setAvatarSrc(e.target.value)}
          fullWidth
          sx={{ mb: 2, maxWidth: 400 }}
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

      <Snackbar open={openSnackbar} autoHideDuration={6000} onClose={handleCloseSnackbar}>
        <Alert onClose={handleCloseSnackbar} severity="success" sx={{ width: '100%' }}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default Settings;
