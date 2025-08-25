
import React from 'react';
import { MapContainer, TileLayer, GeoJSON } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { Box } from '@mui/material';
import { HIGH_RISK_COLOR, MODERATE_RISK_COLOR, LOW_RISK_COLOR } from '../constants/colors';

interface FloodRiskMapProps {
  riskZones: any; // Define a more specific type if available
}

const getRiskStyle = (feature: any) => {
  switch (feature.properties.risk) {
    case 'High': return { color: HIGH_RISK_COLOR, weight: 2, opacity: 0.7, fillOpacity: 0.5 };
    case 'Moderate': return { color: MODERATE_RISK_COLOR, weight: 2, opacity: 0.7, fillOpacity: 0.5 };
    case 'Low': return { color: LOW_RISK_COLOR, weight: 2, opacity: 0.7, fillOpacity: 0.5 };
    default: return { color: '#cccccc', weight: 2, opacity: 0.7, fillOpacity: 0.5 };
  }
};

const FloodRiskMap: React.FC<FloodRiskMapProps> = ({ riskZones }) => {
  return (
    <Box sx={{ height: '600px', width: '100%' }}>
      <MapContainer center={[40.7, -74.0]} zoom={10} style={{ height: '100%', width: '100%' }}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        <GeoJSON data={riskZones as any} style={getRiskStyle} />
      </MapContainer>
    </Box>
  );
};

export default FloodRiskMap;
