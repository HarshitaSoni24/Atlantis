
import React from 'react';
import { MapContainer, TileLayer, GeoJSON } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { Box } from '@mui/material';

// Placeholder GeoJSON data for risk zones
const riskZones = {
  "type": "FeatureCollection",
  "features": [
    {
      "type": "Feature",
      "properties": { "risk": "High" },
      "geometry": {
        "type": "Polygon",
        "coordinates": [[[-74.0, 40.7], [-73.9, 40.7], [-73.9, 40.8], [-74.0, 40.8], [-74.0, 40.7]]]
      }
    },
    {
      "type": "Feature",
      "properties": { "risk": "Moderate" },
      "geometry": {
        "type": "Polygon",
        "coordinates": [[[-73.9, 40.6], [-73.8, 40.6], [-73.8, 40.7], [-73.9, 40.7], [-73.9, 40.6]]]
      }
    },
    {
      "type": "Feature",
      "properties": { "risk": "Low" },
      "geometry": {
        "type": "Polygon",
        "coordinates": [[[-74.1, 40.5], [-74.0, 40.5], [-74.0, 40.6], [-74.1, 40.6], [-74.1, 40.5]]]
      }
    }
  ]
};

const getRiskStyle = (feature: any) => {
  switch (feature.properties.risk) {
    case 'High': return { color: '#ff0000', weight: 2, opacity: 0.7, fillOpacity: 0.5 };
    case 'Moderate': return { color: '#ffff00', weight: 2, opacity: 0.7, fillOpacity: 0.5 };
    case 'Low': return { color: '#00ff00', weight: 2, opacity: 0.7, fillOpacity: 0.5 };
    default: return { color: '#cccccc', weight: 2, opacity: 0.7, fillOpacity: 0.5 };
  }
};

const FloodRiskMap: React.FC = () => {
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
