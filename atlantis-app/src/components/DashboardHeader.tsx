
import React from 'react';
import { AppBar, Toolbar, InputBase, Box, Typography, IconButton, Badge, Avatar } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import NotificationsIcon from '@mui/icons-material/Notifications'; // For notification badge
import { styled, alpha } from '@mui/material/styles';

// Existing Search, SearchIconWrapper, StyledInputBase remain the same
const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(1),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
}));

interface DashboardHeaderProps {
  onMenuClick: () => void;
  title: string;
  showCubeIcon: boolean;
  avatarSrc: string;
}

const DashboardHeader: React.FC<DashboardHeaderProps> = ({ onMenuClick, title, showCubeIcon, avatarSrc }) => {
  return (
    <AppBar
      position="static"
      sx={{
        backgroundColor: 'white',
        height: '60px',
        borderRadius: '8px',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
        margin: '20px', // Add margin to separate from the top and sidebar
        width: 'calc(100% - 40px)', // Adjust width for margin
        display: 'flex', // Ensure flex container for toolbar
        justifyContent: 'center', // Center content vertically
      }}
    >
      <Toolbar sx={{ justifyContent: 'space-between', alignItems: 'center', height: '100%' }}>
        {/* Left side: Logo area */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          {/* Placeholder for cube icon */}
          {showCubeIcon && (
            <Box
              sx={{
                width: 24,
                height: 24,
                backgroundColor: '#3b82f6', // Example color for cube
                borderRadius: '4px',
              }}
            />
          )}
          <Typography variant="h6" component="div" sx={{ color: '#333' }}>
            {title}
          </Typography>
        </Box>

        {/* Center: Search bar */}
        <Search>
          <SearchIconWrapper>
            <SearchIcon />
          </SearchIconWrapper>
          <StyledInputBase
            placeholder="Search location" // Updated placeholder
            inputProps={{ 'aria-label': 'search' }}
          />
        </Search>

        {/* Right side: User profile circle with notification badge */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <IconButton color="inherit">
            <Badge badgeContent={1} color="error">
              <NotificationsIcon sx={{ color: '#6b7280' }} />
            </Badge>
          </IconButton>
          <Avatar alt="User Profile" src={avatarSrc} /> {/* Placeholder avatar */}
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default DashboardHeader;
