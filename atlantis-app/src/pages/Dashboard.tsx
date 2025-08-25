
import React, { useState, useEffect } from 'react';
import FloodRiskMap from '../components/FloodRiskMap';
import RiskLegend from '../components/RiskLegend';
import { Typography, Box, Button, CircularProgress } from '@mui/material';
import WarningAmberIcon from '@mui/icons-material/WarningAmber';
import WaterDropIcon from '@mui/icons-material/WaterDrop';
import CloudQueueIcon from '@mui/icons-material/CloudQueue';
import { MOUTH_RISK_COLOR, LOW_RISK_COLOR, MODERATE_RISK_COLOR, LIGHT_RISK_COLOR, HIGH_RISK_COLOR } from '../constants/colors';
import { useAppContext } from '../context/AppContext';
import { fetchFloodRiskData } from '../api/mockApi';

const Dashboard: React.FC = () => {
  const { state } = useAppContext();
  const { riskZones, userProfile } = state;

  const [currentRisk, setCurrentRisk] = useState<any | null>(null);
  const [forecast, setForecast] = useState<any | null>(null);
  const [loadingRiskData, setLoadingRiskData] = useState(true);
  const [loadingForecastData, setLoadingForecastData] = useState(true);

  useEffect(() => {
    const getFloodRiskData = async () => {
      setLoadingRiskData(true);
      setLoadingForecastData(true);
      const data = await fetchFloodRiskData();
      setCurrentRisk(data.currentRisk);
      setForecast(data.forecast);
      setLoadingRiskData(false);
      setLoadingForecastData(false);
    };
    getFloodRiskData();
  }, []);

  const riskLevels = [
    { label: 'Mouth', color: MOUTH_RISK_COLOR },
    { label: 'Low', color: LOW_RISK_COLOR },
    { label: 'Moderate', color: MODERATE_RISK_COLOR },
    { label: 'Light', color: LIGHT_RISK_COLOR },
    { label: 'High', color: HIGH_RISK_COLOR },
  ];

  return (
    <div className="dashboard-container">
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
          <RiskLegend riskLevels={riskLevels} />

          {/* Map area */}
          {riskZones ? (
            <FloodRiskMap riskZones={riskZones} />
          ) : (
            <Box sx={{ flexGrow: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <CircularProgress />
            </Box>
          )}
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
            {loadingRiskData ? (
              <Box sx={{ display: 'flex', justifyContent: 'center', my: 2 }}>
                <CircularProgress size={20} />
              </Box>
            ) : (
              <>
                <Typography variant="h6" color="textSecondary" sx={{ marginBottom: '15px' }}>
                  {currentRisk?.location}
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
                  <WarningAmberIcon sx={{ fontSize: 60, color: 'white', marginBottom: '10px' }} />
                  <Typography variant="h4" sx={{ fontWeight: 'bold', marginBottom: '5px' }}>
                    {currentRisk?.level}
                  </Typography>
                  <Typography variant="subtitle1">
                    {currentRisk?.message}
                  </Typography>
                </Box>
              </>
            )}
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
            {loadingForecastData ? (
              <Box sx={{ display: 'flex', justifyContent: 'center', my: 2 }}>
                <CircularProgress size={20} />
              </Box>
            ) : (
              <>
                <Typography variant="subtitle2" color="textSecondary">
                  {forecast?.outlook}
                </Typography>

                {/* Weather icons section */}
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-around', marginTop: '10px' }}>
                  {/* Droplet/rain icon */}
                  <WaterDropIcon sx={{ fontSize: 50, color: '#3b82f6' }} />

                  {/* Cloud with rain icon */}
                  <CloudQueueIcon sx={{ fontSize: 50, color: '#6b7280' }} />
                </Box>
                <Typography variant="body2" sx={{ textAlign: 'center', color: '#6b7280' }}>
                  Flood Probability: {forecast?.floodProbability}
                </Typography>
              </>
            )}

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
