
import React from 'react';
import { MapContainer, TileLayer, GeoJSON, Popup, LayersControl } from 'react-leaflet'; // Import LayersControl
import 'leaflet/dist/leaflet.css';
import { Box, useTheme } from '@mui/material'; // Import useTheme

interface FloodRiskMapProps {
  riskZones: any; // Define a more specific type if available
}

const FloodRiskMap: React.FC<FloodRiskMapProps> = ({ riskZones }) => {
  const theme = useTheme(); // Use the theme hook

  const getRiskStyle = (feature: any) => {
    switch (feature.properties.risk) {
      case 'High': return { color: theme.palette.custom.risk.high, weight: 2, opacity: 0.7, fillOpacity: 0.5 };
      case 'Moderate': return { color: theme.palette.custom.risk.moderate, weight: 2, opacity: 0.7, fillOpacity: 0.5 };
      case 'Low': return { color: theme.palette.custom.risk.low, weight: 2, opacity: 0.7, fillOpacity: 0.5 };
      default: return { color: '#cccccc', weight: 2, opacity: 0.7, fillOpacity: 0.5 };
    }
  };

  // Function to bind popup to each GeoJSON feature
  const onEachFeature = (feature: any, layer: any) => {
    if (feature.properties && feature.properties.name && feature.properties.risk) {
      layer.bindPopup(
        `<div>
          <h4>${feature.properties.name}</h4>
          <p>Risk Level: <strong>${feature.properties.risk}</strong></p>
          ${feature.properties.description ? `<p>${feature.properties.description}</p>` : ''}
        </div>`
      );
    }
  };

  return (
    <Box sx={{ height: '600px', width: '100%' }}>
      <MapContainer center={[40.7, -74.0]} zoom={10} style={{ height: '100%', width: '100%' }}>
        <LayersControl position="topright">
          <LayersControl.BaseLayer checked name="OpenStreetMap">
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />
          </LayersControl.BaseLayer>
          <LayersControl.BaseLayer name="Satellite">
            <TileLayer
              url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
              attribution='Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community'
            />
          </LayersControl.BaseLayer>
        </LayersControl>
        <GeoJSON data={riskZones as any} style={getRiskStyle} onEachFeature={onEachFeature} />
      </MapContainer>
    </Box>
  );
};

export default FloodRiskMap;
