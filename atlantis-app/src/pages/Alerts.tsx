import React, { useState, useEffect } from 'react';
import {
  Typography, Box, List, ListItem, ListItemText, IconButton, ListItemIcon,
  Paper, Button, FormControl, InputLabel, Select, MenuItem,
  Badge, useTheme
} from '@mui/material';
import {
  Warning as WarningIcon, Info as InfoIcon, CheckCircle as CheckCircleIcon,
  Delete as DeleteIcon, MarkEmailRead as MarkEmailReadIcon,
  Sort as SortIcon, FilterList as FilterListIcon
} from '@mui/icons-material';
import { useAppContext } from '../context/AppContext';
import { subscribeToAlerts } from '../api/mockApi'; // Import subscribeToAlerts

// No longer need to import Alert interface here, as it's in AppContext
// interface Alert {
//   id: string;
//   type: 'warning' | 'info' | 'success';
//   message: string;
//   timestamp: string;
//   read: boolean;
// }

const Alerts: React.FC = () => {
  const { state, dispatch } = useAppContext(); // Destructure dispatch
  const theme = useTheme();
  // Use alerts from global state
  const { alerts } = state;
  const [filterType, setFilterType] = useState<'all' | 'warning' | 'info' | 'success'>('all');
  const [sortBy, setSortBy] = useState<'newest' | 'oldest'>('newest');

  // Subscribe to real-time alerts
  useEffect(() => {
    const unsubscribe = subscribeToAlerts((newAlert) => {
      dispatch({ type: 'ADD_ALERT', payload: newAlert });
    });

    // Cleanup subscription on component unmount
    return () => unsubscribe();
  }, [dispatch]); // Depend on dispatch to avoid re-subscribing unnecessarily

  const handleMarkAsRead = (id: string) => {
    dispatch({ type: 'MARK_ALERT_AS_READ', payload: id });
  };

  const handleClearAll = () => {
    dispatch({ type: 'CLEAR_ALL_ALERTS' });
  };

  const filteredAlerts = alerts.filter(alert => {
    if (filterType === 'all') return true;
    return alert.type === filterType;
  }).sort((a, b) => {
    const dateA = new Date(a.timestamp).getTime();
    const dateB = new Date(b.timestamp).getTime();
    return sortBy === 'newest' ? dateB - dateA : dateA - dateB;
  });

  const getAlertIcon = (type: 'warning' | 'info' | 'success') => { // Use direct type
    switch (type) {
      case 'warning': return <WarningIcon color="warning" />;
      case 'info': return <InfoIcon color="info" />;
      case 'success': return <CheckCircleIcon color="success" />;
      default: return null;
    }
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>Alerts</Typography>

      <Box sx={{ display: 'flex', gap: 2, mb: 3, alignItems: 'center' }}>
        <FormControl sx={{ minWidth: 120 }}>
          <InputLabel id="filter-type-label">Filter Type</InputLabel>
          <Select
            labelId="filter-type-label"
            value={filterType}
            label="Filter Type"
            onChange={(e) => setFilterType(e.target.value as typeof filterType)}
          >
            <MenuItem value="all">All</MenuItem>
            <MenuItem value="warning">Warning</MenuItem>
            <MenuItem value="info">Info</MenuItem>
            <MenuItem value="success">Success</MenuItem>
          </Select>
        </FormControl>

        <FormControl sx={{ minWidth: 120 }}>
          <InputLabel id="sort-by-label">Sort By</InputLabel>
          <Select
            labelId="sort-by-label"
            value={sortBy}
            label="Sort By"
            onChange={(e) => setSortBy(e.target.value as typeof sortBy)}
          >
            <MenuItem value="newest">Newest First</MenuItem>
            <MenuItem value="oldest">Oldest First</MenuItem>
          </Select>
        </FormControl>

        <Button
          variant="contained"
          startIcon={<MarkEmailReadIcon />}
          onClick={handleClearAll}
          disabled={alerts.length === 0}
          sx={{ ml: 'auto' }} // Push to the right
        >
          Mark All as Read
        </Button>
      </Box>

      {filteredAlerts.length === 0 ? (
        <Paper sx={{ p: 3, textAlign: 'center', mt: 4 }}>
          <InfoIcon sx={{ fontSize: 60, color: theme.palette.text.secondary }} />
          <Typography variant="h6" color="textSecondary" mt={2}>
            No alerts to display.
          </Typography>
          <Typography variant="body2" color="textSecondary">
            Your inbox is clear!
          </Typography>
        </Paper>
      ) : (
        <List>
          {filteredAlerts.map((alert) => (
            <Paper
              key={alert.id}
              sx={{
                mb: 2,
                p: 2,
                backgroundColor: alert.read ? theme.palette.action.hover : theme.palette.background.paper,
                display: 'flex',
                alignItems: 'center',
                borderLeft: `5px solid ${
                  alert.type === 'warning' ? theme.palette.warning.main :
                  alert.type === 'info' ? theme.palette.info.main :
                  theme.palette.success.main
                }`,
              }}
            >
              <ListItemIcon sx={{ minWidth: 40 }}>
                {getAlertIcon(alert.type)}
              </ListItemIcon>
              <ListItemText
                primary={alert.message}
                secondary={new Date(alert.timestamp).toLocaleString()}
                sx={{ flexGrow: 1 }}
              />
              {!alert.read && (
                <IconButton edge="end" aria-label="mark as read" onClick={() => handleMarkAsRead(alert.id)}>
                  <MarkEmailReadIcon />
                </IconButton>
              )}
            </Paper>
          ))}
        </List>
      )}
    </Box>
  );
};

export default Alerts;