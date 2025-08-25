
import React from 'react';
import DashboardHeader from '../components/DashboardHeader';
import { Typography, Box, Button } from '@mui/material';
import WarningAmberIcon from '@mui/icons-material/WarningAmber';
import WaterDropIcon from '@mui/icons-material/WaterDrop';
import CloudQueueIcon from '@mui/icons-material/CloudQueue'; // Import Box for flex/grid layout

const Dashboard: React.FC = () => {
  return (
    <div className="dashboard-container">
      <DashboardHeader />
      {/* Main content grid layout */}
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: '65% 35%',
          gap: '20px',
          marginTop: '20px',
          flexGrow: 1, // Allow this grid to take remaining vertical space
          padding: '0 20px 20px 20px', // Adjust padding to align with header's margin
        }}
      >
        {/* Left Column: Map Container */}
        <Box
          sx={{
            backgroundColor: 'white',
            borderRadius: '12px',
            boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
            padding: '20px',
            display: 'flex',
            flexDirection: 'column',
            height: '100%', // Ensure it fills the grid cell height
          }}
        >
          {/* Top bar */}
          <Typography variant="caption" color="textSecondary" sx={{ marginBottom: '10px' }}>
            Real-time updates powered by [Local Weather Authority Logo]
          </Typography>

          {/* Legend bar */}
          <Box sx={{ display: 'flex', gap: '10px', marginBottom: '20px', flexWrap: 'wrap' }}>
            <Box sx={{ backgroundColor: '#1b5e20', color: 'white', padding: '5px 10px', borderRadius: '4px' }}>
              Mouth
            </Box>
            <Box sx={{ backgroundColor: '#81c784', padding: '5px 10px', borderRadius: '4px' }}>
              Low
            </Box>
            <Box sx={{ backgroundColor: '#ffeb3b', padding: '5px 10px', borderRadius: '4px' }}>
              Moderate
            </Box>
            <Box sx={{ backgroundColor: '#90caf9', padding: '5px 10px', borderRadius: '4px' }}>
              Light
            </Box>
            <Box sx={{ backgroundColor: '#ef5350', padding: '5px 10px', borderRadius: '4px' }}>
              High
            </Box>
          </Box>

          {/* Map area placeholder */}
          <Box
            sx={{
              backgroundColor: '#e0f2f7', // Light blue for water
              flexGrow: 1, // Takes remaining vertical space
              borderRadius: '8px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              position: 'relative', // For positioning overlay zones
              overflow: 'hidden', // Hide overflow for rounded corners
            }}
          >
            {/* Placeholder for California coastline and colored overlay zones */}
            <Typography variant="h6" color="textSecondary">
              California Map Placeholder
            </Typography>
            {/* Example overlay zones (simplified) */}
            <Box
              sx={{
                position: 'absolute',
                width: '40%',
                height: '40%',
                backgroundColor: 'rgba(255, 0, 0, 0.4)', // Red/orange
                borderRadius: '50%',
                top: '30%',
                left: '30%',
                filter: 'blur(20px)',
              }}
            />
            <Box
              sx={{
                position: 'absolute',
                width: '60%',
                height: '60%',
                backgroundColor: 'rgba(255, 255, 0, 0.3)', // Yellow
                borderRadius: '50%',
                top: '20%',
                left: '20%',
                filter: 'blur(20px)',
              }}
            />
            <Box
              sx={{
                position: 'absolute',
                width: '80%',
                height: '80%',
                backgroundColor: 'rgba(0, 255, 0, 0.2)', // Green
                borderRadius: '50%',
                top: '10%',
                left: '10%',
                filter: 'blur(20px)',
              }}
            />
          </Box>
        </Box>

        {/* Right Column: Status Cards and Forecast */}
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: '20px' }}> {/* This Box will contain both status card and forecast */}
          {/* Status Card */}
          <Box
            sx={{
              backgroundColor: 'white',
              borderRadius: '12px',
              boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
              padding: '20px',
            }}
          >
            <Typography variant="subtitle1" color="textSecondary">
              Current Flood Risk
            </Typography>
            <Typography variant="h6" color="textSecondary" sx={{ marginBottom: '15px' }}>
              Riverside County, CA
            </Typography>

            {/* Red Alert Box */}
            <Box
              sx={{
                background: 'linear-gradient(to right, #dc2626, #b91c1c)',
                borderRadius: '8px',
                padding: '20px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                textAlign: 'center',
                color: 'white',
              }}
            >
              {/* Warning Triangle Icon */}
              {/* Need to import WarningAmberIcon */}
              <WarningAmberIcon sx={{ fontSize: 60, color: 'white', marginBottom: '10px' }} />
              <Typography variant="h4" sx={{ fontWeight: 'bold', marginBottom: '5px' }}>
                High Risk.
              </Typography>
              <Typography variant="subtitle1">
                Mandatory Evacuation Order
              </Typography>
            </Box>
          </Box>

          {/* Forecast Section */}
          <Box
            sx={{
              backgroundColor: 'white',
              borderRadius: '12px',
              boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
              padding: '20px',
              display: 'flex',
              flexDirection: 'column',
              gap: '15px', // Gap between elements inside forecast card
            }}
          >
            <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
              Forecast
            </Typography>
            <Typography variant="subtitle2" color="textSecondary">
              7 day Outlook
            </Typography>

            {/* Weather icons section */}
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-around', marginTop: '10px' }}>
              {/* Droplet/rain icon */}
              <WaterDropIcon sx={{ fontSize: 50, color: '#3b82f6' }} />

              {/* Cloud with rain icon */}
              <CloudQueueIcon sx={{ fontSize: 50, color: '#6b7280' }} />
            </Box>
            <Typography variant="body2" sx={{ textAlign: 'center', color: '#6b7280' }}>
              Flood Probability
            </Typography>

            {/* Blue button "View Detailed Report" */}
            <Button
              variant="contained"
              sx={{
                backgroundColor: '#3b82f6',
                color: 'white',
                width: '100%',
                borderRadius: '6px',
                padding: '12px',
                textTransform: 'none', // Prevent uppercase
                '&:hover': {
                  backgroundColor: '#2563eb', // Darker blue on hover
                },
              }}
            >
              View Detailed Report
            </Button>
          </Box>
        </Box>
      </Box>
      {/* Remove "Dashboard Page" text as it's now replaced by the grid */}
    </div>
  );
};

export default Dashboard;
