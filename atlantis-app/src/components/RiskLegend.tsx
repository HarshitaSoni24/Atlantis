
import React from 'react';
import { Box, Typography, Paper } from '@mui/material';
import { LOW_RISK_COLOR, MODERATE_RISK_COLOR, HIGH_RISK_COLOR } from '../constants/colors';

interface RiskLegendProps {
  riskLevels: { label: string; color: string }[];
}

const RiskLegend: React.FC<RiskLegendProps> = ({ riskLevels }) => {
  return (
    <Paper sx={{ p: 2, mt: 2, width: 'fit-content', position: 'absolute', zIndex: 1000, bottom: 20, left: 20 }}>
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
