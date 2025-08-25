import React, { useState } from 'react';
import {
  Typography, Box, TextField, Button, List, ListItem, ListItemText,
  IconButton, Dialog, DialogActions, DialogContent, DialogContentText,
  DialogTitle, Card, CardContent, CardActions, Paper, useTheme
} from '@mui/material';
//import Grid from '@mui/material/Grid';
//import Grid from '@mui/material/Grid2';
import { Grid } from '@mui/material';

import { Delete as DeleteIcon, Edit as EditIcon, AddLocationAlt as AddLocationIcon } from '@mui/icons-material';
import { useAppContext } from '../context/AppContext';

interface Location {
  id: string;
  name: string;
  address: string;
  // Add risk level if available from mockApi or context
  // riskLevel?: 'High' | 'Moderate' | 'Low';
}

const MyLocations: React.FC = () => {
  const { state, dispatch } = useAppContext();
  const theme = useTheme();
  const [locationName, setLocationName] = useState('');
  const [locationAddress, setLocationAddress] = useState('');
  const [editingLocationId, setEditingLocationId] = useState<string | null>(null);
  const [openConfirmDialog, setOpenConfirmDialog] = useState(false);
  const [locationToDelete, setLocationToDelete] = useState<string | null>(null);

  const handleAddOrUpdateLocation = () => {
    if (!locationName || !locationAddress) {
        // Optional: Add some basic validation to prevent empty submissions
        alert("Please fill out both Location Name and Address.");
        return;
    }

    if (editingLocationId) {
      dispatch({
        type: 'UPDATE_LOCATION',
        payload: {
          id: editingLocationId,
          name: locationName,
          address: locationAddress,
        },
      });
      setEditingLocationId(null);
    } else {
      dispatch({
        type: 'ADD_LOCATION',
        payload: {
          id: Date.now().toString(), // Simple unique ID
          name: locationName,
          address: locationAddress,
        },
      });
    }
    setLocationName('');
    setLocationAddress('');
  };

  const handleEditClick = (location: Location) => {
    setLocationName(location.name);
    setLocationAddress(location.address);
    setEditingLocationId(location.id);
  };

  const handleDeleteClick = (id: string) => {
    setLocationToDelete(id);
    setOpenConfirmDialog(true);
  };

  const handleConfirmDelete = () => {
    if (locationToDelete) {
      dispatch({ type: 'DELETE_LOCATION', payload: locationToDelete });
      setLocationToDelete(null);
      setOpenConfirmDialog(false);
    }
  };

  const handleCloseConfirmDialog = () => {
    setOpenConfirmDialog(false);
    setLocationToDelete(null);
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>My Locations</Typography>

      <Paper sx={{ p: 3, mb: 4 }}>
        <Typography variant="h6" gutterBottom>
          {editingLocationId ? 'Edit Location' : 'Add New Location'}
        </Typography>
        <Grid container spacing={2}>
          {/* FIX: Added 'item' prop for responsive layout to work */}
          {/* <Grid item xs={12} sm={6}></Grid> */}
          <Grid size={{ xs: 12, sm: 6 }}> 
            <TextField
              label="Location Name"
              variant="outlined"
              fullWidth
              value={locationName}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setLocationName(e.target.value)}
              sx={{ mb: 2 }}
            />
          </Grid>
          {/* FIX: Added 'item' prop for responsive layout to work */}
        {/* <Grid item xs={12} sm={6}> */}
        <Grid size={{ xs: 12, sm: 6 }}>
            <TextField
              label="Address"
              variant="outlined"
              fullWidth
              value={locationAddress}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setLocationAddress(e.target.value)}
              sx={{ mb: 2 }}
            />
          </Grid>
        </Grid>
        <Button
          variant="contained"
          onClick={handleAddOrUpdateLocation}
          startIcon={editingLocationId ? <EditIcon /> : <AddLocationIcon />}
        >
          {editingLocationId ? 'Update Location' : 'Add Location'}
        </Button>
        {editingLocationId && (
          <Button
            variant="outlined"
            onClick={() => {
              setEditingLocationId(null);
              setLocationName('');
              setLocationAddress('');
            }}
            sx={{ ml: 2 }}
          >
            Cancel Edit
          </Button>
        )}
      </Paper>

      <Typography variant="h5" gutterBottom sx={{ mt: 4 }}>Saved Locations</Typography>
      {state.userProfile.locations.length === 0 ? (
        <Paper sx={{ p: 3, textAlign: 'center', mt: 4 }}>
          <AddLocationIcon sx={{ fontSize: 60, color: theme.palette.text.secondary }} />
          <Typography variant="h6" color="textSecondary" mt={2}>
            No locations saved yet.
          </Typography>
          <Typography variant="body2" color="textSecondary">
            Add your first location above to get started!
          </Typography>
        </Paper>
      ) : (
        <Grid container spacing={3}>
          {state.userProfile.locations.map((location: Location) => (
            // FIX: Added 'item' prop for responsive card layout to work
            <Grid
      size={{ xs: 12, sm: 6, md: 4 }}
      key={location.id}
    >
              <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                <CardContent sx={{ flexGrow: 1 }}>
                  <Typography variant="h6" component="div" gutterBottom>
                    {location.name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {location.address}
                  </Typography>
                  {/* Placeholder for map thumbnail */}
                  <Box sx={{
                    mt: 2,
                    height: 120,
                    backgroundColor: theme.palette.action.disabledBackground,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: theme.palette.text.disabled,
                    borderRadius: '4px',
                  }}>
                    Map Thumbnail Placeholder
                  </Box>
                  {/* Placeholder for risk level */}
                  {/* {location.riskLevel && (
                    <Typography variant="body2" sx={{ mt: 1, fontWeight: 'bold', color: location.riskLevel === 'High' ? 'error.main' : 'success.main' }}>
                      Risk Level: {location.riskLevel}
                    </Typography>
                  )} */}
                </CardContent>
                <CardActions>
                  <Button size="small" startIcon={<EditIcon />} onClick={() => handleEditClick(location)}>Edit</Button>
                  <Button size="small" color="error" startIcon={<DeleteIcon />} onClick={() => handleDeleteClick(location.id)}>Delete</Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}

      <Dialog
        open={openConfirmDialog}
        onClose={handleCloseConfirmDialog}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Confirm Deletion"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure you want to delete this location? This action cannot be undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseConfirmDialog}>Cancel</Button>
          <Button onClick={handleConfirmDelete} color="error" autoFocus>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default MyLocations;