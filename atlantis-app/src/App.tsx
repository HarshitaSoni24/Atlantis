import React, { useRef, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import { useMediaQuery } from '@mui/material';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import IconButton from '@mui/material/IconButton';
import Badge from '@mui/material/Badge';
import MailIcon from '@mui/icons-material/Mail';
import NotificationsIcon from '@mui/icons-material/Notifications';
import AccountCircle from '@mui/icons-material/AccountCircle';
import AdbIcon from '@mui/icons-material/Adb'; // Example icon, replace with your cube icon

import Sidebar, { SidebarRef } from './components/Sidebar';
import DashboardAppBar from './components/DashboardAppBar';
import Dashboard from './pages/Dashboard';
import Alerts from './pages/Alerts';
import MyLocations from './pages/MyLocations';
import Reports from './pages/Reports';
import Settings from './pages/Settings';

import {
  PRIMARY_MAIN, SECONDARY_MAIN, BACKGROUND_DEFAULT, BACKGROUND_PAPER,
  SIDEBAR_BACKGROUND, SIDEBAR_TEXT, SIDEBAR_ACTIVE_BACKGROUND, SIDEBAR_HOVER_BACKGROUND,
  TEXT_PRIMARY, TEXT_SECONDARY, ERROR_MAIN, WARNING_MAIN, INFO_MAIN, SUCCESS_MAIN,
  MOUTH_RISK_COLOR, LOW_RISK_COLOR, MODERATE_RISK_COLOR, LIGHT_RISK_COLOR, HIGH_RISK_COLOR
} from './constants/colors';

const drawerWidth = 240;

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: { main: PRIMARY_MAIN },
    secondary: { main: SECONDARY_MAIN },
    error: { main: ERROR_MAIN },
    warning: { main: WARNING_MAIN },
    info: { main: INFO_MAIN },
    success: { main: SUCCESS_MAIN },
    text: {
      primary: TEXT_PRIMARY,
      secondary: TEXT_SECONDARY,
    },
    background: {
      default: BACKGROUND_DEFAULT,
      paper: BACKGROUND_PAPER,
    },
    // Custom risk colors
    custom: {
      risk: {
        mouth: MOUTH_RISK_COLOR,
        low: LOW_RISK_COLOR,
        moderate: MODERATE_RISK_COLOR,
        light: LIGHT_RISK_COLOR,
        high: HIGH_RISK_COLOR,
      },
      sidebar: {
        activeBackground: SIDEBAR_ACTIVE_BACKGROUND,
        hoverBackground: SIDEBAR_HOVER_BACKGROUND,
      },
    },
  },
  typography: {
    fontFamily: 'Roboto, Arial, sans-serif',
    h4: { fontWeight: 600 },
    h6: { fontWeight: 500 },
    subtitle1: { fontWeight: 500 },
    body1: { fontSize: '1rem' },
    body2: { fontSize: '0.875rem' },
  },
  components: {
    MuiDrawer: {
      styleOverrides: {
        paper: {
          backgroundColor: SIDEBAR_BACKGROUND,
          color: SIDEBAR_TEXT,
        },
      },
    },
    MuiListItemButton: {
      styleOverrides: {
        root: {
          '&.Mui-selected': {
            backgroundColor: SIDEBAR_ACTIVE_BACKGROUND,
            borderLeft: `4px solid ${PRIMARY_MAIN}`,
            paddingLeft: `calc(24px - 4px)`,
          },
          '&:hover': {
            backgroundColor: SIDEBAR_HOVER_BACKGROUND,
          },
        },
      },
    },
  },
});

function App() {
  const sidebarRef = useRef<SidebarRef>(null);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = useState<null | HTMLElement>(null);

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleProfileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const handleDrawerToggle = () => {
    sidebarRef.current?.toggleSidebar();
  };

  const isMobile = useMediaQuery(darkTheme.breakpoints.down('md'));

  const menuId = 'primary-search-account-menu';
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
      <MenuItem onClick={handleMenuClose}>My account</MenuItem>
    </Menu>
  );

  const mobileMenuId = 'primary-search-account-menu-mobile';
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem>
        <IconButton size="large" aria-label="show 4 new mails" color="inherit">
          <Badge badgeContent={4} color="error">
            <MailIcon />
          </Badge>
        </IconButton>
        <p>Messages</p>
      </MenuItem>
      <MenuItem>
        <IconButton
          size="large"
          aria-label="show 17 new notifications"
          color="inherit"
        >
          <Badge badgeContent={17} color="error">
            <NotificationsIcon />
          </Badge>
        </IconButton>
        <p>Notifications</p>
      </MenuItem>
      <MenuItem onClick={handleProfileMenuOpen}>
        <IconButton
          size="large"
          aria-label="account of current user"
          aria-controls={menuId}
          aria-haspopup="true"
          color="inherit"
        >
          <AccountCircle />
        </IconButton>
        <p>Profile</p>
      </MenuItem>
    </Menu>
  );

  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <Router>
        <Box sx={{ display: 'flex' }}>
          <DashboardAppBar
            title="FLOOD PREDICTION"
            iconComponent={AdbIcon}
            sidebarRef={sidebarRef}
            handleDrawerToggle={handleDrawerToggle}
          />
          <Sidebar ref={sidebarRef} />
          <Box
            component="main"
            sx={{
              flexGrow: 1,
              p: 3,
              transition: (theme) =>
                theme.transitions.create('margin', {
                  easing: theme.transitions.easing.sharp,
                  duration: theme.transitions.duration.leavingScreen,
                }),
              ml: isMobile || !sidebarRef.current?.isOpen ? 0 : `${drawerWidth}px`,
              width: isMobile ? '100%' : `calc(100% - ${drawerWidth}px)`,
            }}
          >
            <Toolbar />
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/alerts" element={<Alerts />} />
              <Route path="/mylocations" element={<MyLocations />} />
              <Route path="/reports" element={<Reports />} />
              <Route path="/settings" element={<Settings />} />
            </Routes>
          </Box>
        </Box>
        {isMobile && sidebarRef.current?.isOpen && (
          <Box
            sx={{
              position: 'fixed',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              backgroundColor: 'rgba(0, 0, 0, 0.5)',
              zIndex: (theme) => theme.zIndex.drawer - 1,
            }}
            onClick={handleDrawerToggle}
          />
        )}
        {renderMobileMenu}
        {renderMenu}
      </Router>
    </ThemeProvider>
  );
}

export default App;
