
import * as React from 'react';
import { NavLink as RouterLink, NavLinkProps } from 'react-router-dom';
import { Drawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Avatar, Typography, Badge, Box, ListItemButtonProps } from '@mui/material';
import { Dashboard, LocationOn, Notifications, Assessment, Settings as SettingsIcon } from '@mui/icons-material';
import { styled } from '@mui/material/styles';

const NavLinkComponent = React.forwardRef<HTMLAnchorElement, NavLinkProps>((props, ref) => (
  <RouterLink ref={ref} {...props} />
));

const StyledListItemButton = styled(ListItemButton)(({ theme }) => ({
  // Add any specific styles for your NavLinkListItemButton here if needed
}));

const drawerWidth = 280;

const StyledDrawer = styled(Drawer, {
  shouldForwardProp: (prop) => prop !== 'isCollapsed',
})<{ isCollapsed: boolean }>(({ theme, isCollapsed }) => ({
  width: drawerWidth,
  flexShrink: 0,
  '& .MuiDrawer-paper': {
    width: drawerWidth,
    boxSizing: 'border-box',
    backgroundColor: '#1e293b', // Dark blue-gray
    color: '#e0e1dd',
    transition: theme.transitions.create('transform', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    transform: isCollapsed ? 'translateX(-280px)' : 'translateX(0)',
    overflowX: 'hidden',
  },
}));

const SidebarHeader = styled('div')(({ theme }) => ({
  padding: theme.spacing(2, 3),
  display: 'flex',
  alignItems: 'center',
  borderBottom: '1px solid #415a77'
}));

type StyledListItemProps = ListItemButtonProps & NavLinkProps;

const StyledListItem = styled(ListItemButton)<StyledListItemProps>(({ theme }) => ({
  padding: theme.spacing(1.5, 3),
  '&.active': {
    backgroundColor: 'rgba(255, 255, 255, 0.08)',
    borderLeft: `4px solid ${theme.palette.primary.main}`,
    paddingLeft: `calc(${theme.spacing(3)} - 4px)`,
  },
  '&:hover': {
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
  },
}));

const navItems = [
  { text: 'Dashboard', icon: <Dashboard />, path: '/' },
  { text: 'My Locations', icon: <LocationOn />, path: '/locations' },
  { text: 'Alerts', icon: <Notifications />, path: '/alerts' },
  { text: 'Reports', icon: <Assessment />, path: '/reports' },
  { text: 'Settings', icon: <SettingsIcon />, path: '/settings' },
];

interface SidebarProps {
  isCollapsed: boolean;
}

const Sidebar: React.FC<SidebarProps> = ({ isCollapsed }) => {
  return (
    <StyledDrawer variant="permanent" anchor="left" isCollapsed={isCollapsed}>
      <SidebarHeader>
        <Avatar sx={{ mr: 2, bgcolor: '#778da9' }}>U</Avatar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          User Name
        </Typography>
        <Badge badgeContent={4} color="error">
          <Notifications />
        </Badge>
      </SidebarHeader>
      <Box sx={{ overflow: 'auto' }}>
        <List>
          {navItems.map((item) => (
            <ListItem key={item.text} disablePadding>
              <StyledListItem component={NavLinkComponent} to={item.path}>
                <ListItemIcon sx={{ color: '#e0e1dd' }}>{item.icon}</ListItemIcon>
                <ListItemText primary={item.text} />
              </StyledListItem>
            </ListItem>
          ))}
        </List>
      </Box>
    </StyledDrawer>
  );
};

export default Sidebar;
