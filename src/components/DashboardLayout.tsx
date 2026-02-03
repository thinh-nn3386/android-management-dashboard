import {
  Box,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Divider,
  Typography,
} from '@mui/material';
import { Android, Logout, Person, Science } from '@mui/icons-material';
import { useNavigate, useLocation, Outlet } from 'react-router-dom';

const DRAWER_WIDTH = 280;

export default function DashboardLayout() {
  const navigate = useNavigate();
  const location = useLocation();

  // Get user email from localStorage or auth service
  const userEmail = localStorage.getItem('userEmail') || 'user@example.com';

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('userEmail');
    navigate('/login');
  };

  const menuItems = [
    {
      path: '/home',
      label: 'Android Devices Management',
      icon: <Android />,
      color: '#4caf50',
    },
    {
      path: '/home/profile',
      label: 'User Profile',
      icon: <Person />,
      color: '#2196f3',
    },
    {
      path: '/home/test',
      label: 'Test Tab',
      icon: <Science />,
      color: '#ff9800',
    },
  ];

  return (
    <Box sx={{ display: 'flex', height: '100vh' }}>
      {/* Sidebar */}
      <Drawer
        variant="permanent"
        sx={{
          width: DRAWER_WIDTH,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: DRAWER_WIDTH,
            boxSizing: 'border-box',
            backgroundColor: '#1a1a2e',
            color: '#fff',
          },
        }}
      >
        {/* Email Section */}
        <Box sx={{ p: 2.5 }}>
          <Typography
            variant="body1"
            sx={{
              color: '#fff',
              fontSize: '1.125rem',
              fontWeight: 500,
              wordBreak: 'break-word',
            }}
          >
            {userEmail}
          </Typography>
        </Box>

        <Divider sx={{ borderColor: 'rgba(255, 255, 255, 0.12)' }} />

        {/* Navigation Tabs */}
        <List sx={{ flexGrow: 1, px: 1, py: 2 }}>
          {menuItems.map((item) => {
            const isSelected = location.pathname === item.path;
            return (
              <ListItem key={item.path} disablePadding sx={{ mb: 0.5 }}>
                <ListItemButton
                  selected={isSelected}
                  onClick={() => navigate(item.path)}
                  sx={{
                    borderRadius: '8px',
                    '&.Mui-selected': {
                      backgroundColor: `${item.color}26`,
                      '&:hover': {
                        backgroundColor: `${item.color}3d`,
                      },
                    },
                    '&:hover': {
                      backgroundColor: 'rgba(255, 255, 255, 0.08)',
                    },
                  }}
                >
                  <ListItemIcon sx={{ minWidth: 40, color: item.color }}>{item.icon}</ListItemIcon>
                  <ListItemText
                    primary={item.label}
                    primaryTypographyProps={{
                      fontSize: '0.8125rem',
                      fontWeight: isSelected ? 600 : 400,
                    }}
                  />
                </ListItemButton>
              </ListItem>
            );
          })}
        </List>

        <Divider sx={{ borderColor: 'rgba(255, 255, 255, 0.12)' }} />

        {/* Logout Button in Footer */}
        <Box sx={{ p: 1 }}>
          <ListItemButton
            onClick={handleLogout}
            sx={{
              borderRadius: '8px',
              '&:hover': {
                backgroundColor: 'rgba(244, 67, 54, 0.16)',
              },
            }}
          >
            <ListItemIcon sx={{ minWidth: 40, color: '#f44336' }}>
              <Logout />
            </ListItemIcon>
            <ListItemText
              primary="Logout"
              primaryTypographyProps={{
                fontSize: '0.9rem',
              }}
            />
          </ListItemButton>
        </Box>
      </Drawer>

      {/* Main Content Area */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          backgroundColor: '#f5f5f5',
          p: 3,
        }}
      >
        <Outlet />
      </Box>
    </Box>
  );
}
