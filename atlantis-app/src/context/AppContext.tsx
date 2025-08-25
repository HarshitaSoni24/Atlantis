import React, { createContext, useReducer, useContext, ReactNode, useEffect } from 'react';
import { fetchRiskZones } from '../api/mockApi';

// Define the shape of your state
interface AppState {
  riskZones: any | null; // GeoJSON data for flood risk zones
  notificationCount: number;
  userProfile: {
    avatarSrc: string;
  };
  error: string | null; // New: for global error messages
}

// Define the types of actions that can be dispatched
type AppAction =
  | { type: 'SET_RISK_ZONES'; payload: any }
  | { type: 'SET_NOTIFICATION_COUNT'; payload: number }
  | { type: 'SET_AVATAR_SRC'; payload: string }
  | { type: 'SET_ERROR'; payload: string | null }; // New: for setting error messages

const initialState: AppState = {
  riskZones: null, // Initialize as null, will be fetched
  notificationCount: 1,
  userProfile: {
    avatarSrc: "/static/images/avatar/1.jpg",
  },
  error: null, // New: no error initially
};

// Reducer function
const appReducer = (state: AppState, action: AppAction): AppState => {
  switch (action.type) {
    case 'SET_RISK_ZONES':
      return { ...state, riskZones: action.payload, error: null }; // Clear error on successful fetch
    case 'SET_NOTIFICATION_COUNT':
      return { ...state, notificationCount: action.payload };
    case 'SET_AVATAR_SRC':
      return { ...state, userProfile: { ...state.userProfile, avatarSrc: action.payload } };
    case 'SET_ERROR':
      return { ...state, error: action.payload };
    default:
      return state;
  }
};

// Create the context
interface AppContextType {
  state: AppState;
  dispatch: React.Dispatch<AppAction>;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

// Create a provider component
interface AppProviderProps {
  children: ReactNode;
}

export const AppProvider: React.FC<AppProviderProps> = ({ children }) => {
  const [state, dispatch] = useReducer(appReducer, initialState);

  useEffect(() => {
    const getRiskZones = async () => {
      try {
        const data = await fetchRiskZones();
        dispatch({ type: 'SET_RISK_ZONES', payload: data });
      } catch (err) {
        console.error("Failed to fetch risk zones:", err);
        dispatch({ type: 'SET_ERROR', payload: 'Failed to load map data. Please try again later.' });
      }
    };
    getRiskZones();
  }, []); // Empty dependency array means this runs once on mount

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
};

// Custom hook to use the AppContext
export const useAppContext = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
};