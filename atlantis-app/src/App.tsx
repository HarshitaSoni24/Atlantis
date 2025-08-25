import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Dashboard from './pages/Dashboard';
import Alerts from './pages/Alerts';
import MyLocations from './pages/MyLocations';
import Reports from './pages/Reports';
import Settings from './pages/Settings';

function App() {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarCollapsed(!isSidebarCollapsed);
  };

  

  return (
    <Router>
      <div className="App">
        <button
          className={`sidebar-toggle ${isSidebarCollapsed ? 'collapsed' : ''}`}
          onClick={toggleSidebar}
          aria-label="Toggle sidebar"
          aria-expanded={!isSidebarCollapsed}
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
        <Sidebar isCollapsed={isSidebarCollapsed} />
        <div className={`main-content ${isSidebarCollapsed ? 'sidebar-collapsed' : ''}`}>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/alerts" element={<Alerts />} />
            <Route path="/my-locations" element={<MyLocations />} />
            <Route path="/reports" element={<Reports />} />
            <Route path="/settings" element={<Settings />} />
          </Routes>
        </div>
        {isSidebarCollapsed && window.innerWidth <= 768 && (
          <div className="sidebar-overlay active" onClick={toggleSidebar}></div>
        )}
      </div>
    </Router>
  );
}

export default App;