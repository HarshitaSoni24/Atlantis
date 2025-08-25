// Simulate network delay
const simulateDelay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// Mock GeoJSON data for risk zones
export const mockRiskZones = {
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

// Mock function to fetch risk zones
export const fetchRiskZones = async () => {
  await simulateDelay(500); // Simulate network delay
  return mockRiskZones;
};

// Mock function to fetch current flood risk and forecast data
export const fetchFloodRiskData = async () => {
  await simulateDelay(700); // Simulate network delay
  return {
    currentRisk: {
      location: "Riverside County, CA",
      level: "High Risk.",
      message: "Mandatory Evacuation Order",
    },
    forecast: {
      outlook: "7 day Outlook",
      floodProbability: "High",
    },
  };
};