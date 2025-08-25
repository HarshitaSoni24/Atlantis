
import React from 'react';
import { Box, Typography, Paper } from '@mui/material';

const RiskLegend: React.FC = () => {
  return (
    <Paper sx={{ p: 2, mt: 2, width: 'fit-content', position: 'absolute', zIndex: 1000, bottom: 20, left: 20 }}>
      <Typography variant="subtitle1" gutterBottom>Flood Risk Legend</Typography>
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
        <Box sx={{ width: 20, height: 20, bgcolor: '#00ff00', mr: 1, border: '1px solid #ccc' }} />
        <Typography variant="body2">Low Risk</Typography>
      </Box>
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
        <Box sx={{ width: 20, height: 20, bgcolor: '#ffff00', mr: 1, border: '1px solid #ccc' }} />
        <Typography variant="body2">Moderate Risk</Typography>
      </Box>
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <Box sx={{ width: 20, height: 20, bgcolor: '#ff0000', mr: 1, border: '1px solid #ccc' }} />
        <Typography variant="body2">High Risk</Typography>
      </Box>
    </Paper>
  );
};

export default RiskLegend;
