// Simulate network delay
const simulateDelay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

interface Alert {
  id: string;
  type: 'warning' | 'info' | 'success';
  message: string;
  timestamp: string;
  read: boolean;
}

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

// Mock alerts data
let mockAlerts: Alert[] = [
  { id: '1', type: 'warning', message: 'High flood risk in Sector A.', timestamp: '2025-08-24T10:00:00Z', read: false },
  { id: '2', type: 'info', message: 'New weather advisory issued.', timestamp: '2025-08-24T09:30:00Z', read: false },
  { id: '3', type: 'success', message: 'Flood warning lifted for Sector C.', timestamp: '2025-08-23T18:00:00Z', read: true },
  { id: '4', type: 'warning', message: 'River levels rising rapidly in North Zone.', timestamp: '2025-08-24T11:15:00Z', read: false },
];

export const fetchAlerts = async (): Promise<Alert[]> => {
  await simulateDelay(300);
  return mockAlerts;
};

export const markAlertAsRead = async (id: string): Promise<{ success: boolean }> => {
  await simulateDelay(100);
  mockAlerts = mockAlerts.map(alert => alert.id === id ? { ...alert, read: true } : alert);
  return { success: true };
};

export const clearAllAlerts = async (): Promise<{ success: boolean }> => {
  await simulateDelay(200);
  mockAlerts = [];
  return { success: true };
};

// Mock reports data
const mockReportsData:ReportData[] = [
  { date: '2025-01-15', riskLevel: 'Moderate', precipitation: 50 },
  { date: '2025-02-20', riskLevel: 'Low', precipitation: 20 },
  { date: '2025-03-10', riskLevel: 'High', precipitation: 80 },
  { date: '2025-04-05', riskLevel: 'Moderate', precipitation: 40 },
  { date: '2025-05-12', riskLevel: 'Low', precipitation: 15 },
  { date: '2025-06-25', riskLevel: 'High', precipitation: 90 },
  { date: '2025-07-01', riskLevel: 'Moderate', precipitation: 60 },
  { date: '2025-08-18', riskLevel: 'Low', precipitation: 25 },
];

interface ReportData {
  date: string;
  riskLevel: 'High' | 'Moderate' | 'Low';
  precipitation: number; // in mm
}

export const fetchReportsData = async (): Promise<ReportData[]> => {
  await simulateDelay(400);
  return mockReportsData;
};