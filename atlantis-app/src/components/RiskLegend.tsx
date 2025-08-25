
import React from 'react';
import { Box, Typography, Paper, useMediaQuery } from '@mui/material';
import { useTheme } from '@mui/material/styles'; // Import useTheme
import { LOW_RISK_COLOR, MODERATE_RISK_COLOR, HIGH_RISK_COLOR } from '../constants/colors';

interface RiskLegendProps {
  riskLevels: { label: string; color: string }[];
}

const RiskLegend: React.FC<RiskLegendProps> = ({ riskLevels }) => {
  const theme = useTheme(); // Use theme
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm')); // Check for small screens

  return (
    <Paper sx={{
      p: 2,
      mt: 2,
      width: 'fit-content',
      position: 'absolute',
      zIndex: 1000,
      bottom: isSmallScreen ? 10 : 20, // Adjust bottom for small screens
      left: isSmallScreen ? 10 : 20,   // Adjust left for small screens
      right: isSmallScreen ? 10 : 'auto', // Add right for small screens
    }}>
      <Typography variant="subtitle1" gutterBottom>Flood Risk Legend</Typography>
      {riskLevels.map((level) => (
        <Box key={level.label} sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
          <Box sx={{ width: 20, height: 20, bgcolor: level.color, mr: 1, border: '1px solid #ccc' }} />
          <Typography variant="body2">{level.label}</Typography>
        </Box>
      ))}
    </Paper>
  );
};

export default RiskLegend;
