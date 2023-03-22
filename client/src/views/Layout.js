import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import {
  AppBar,
  Avatar,
  Box,
  Button,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Typography,
} from '@mui/material';
import { Menu as MenuIcon, Dashboard as DashboardIcon } from '@mui/icons-material';
import LoginForm from './Login';
import Signup from './Signup';
import Dashboard from './Dashboard';

const drawerWidth = 240;

const Layout = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);

  const handleDrawerToggle = () => {
    setDrawerOpen(!drawerOpen);
  };

  const handleLogin = () => {
    setLoggedIn(true);
  };

  const handleLogout = () => {
    setLoggedIn(false);
  };

  const navbarContent = loggedIn ? (
    <>
      <Button color="inherit" component={Link} to="/dashboard">
        <DashboardIcon />
        Dashboard
      </Button>
      <Button color="inherit" onClick={handleLogout}>
        Logout
      </Button>
    </>
  ) : (
    <>
      <LoginForm onLogin={handleLogin} />
      <Button color="inherit" component={Link} to="/signup">
        Sign Up
      </Button>
    </>
  );

  const sidebarContent = (
    <List>
      <ListItem button component={Link} to="/dashboard">
        <ListItemIcon>
          <DashboardIcon />
        </ListItemIcon>
        <ListItemText primary="Dashboard" />
      </ListItem>
    </List>
  );

  return (
    <Router>
      <AppBar position="fixed">
        <Toolbar>
          <IconButton edge="start" color="inherit" onClick={handleDrawerToggle}>
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" style={{ flexGrow: 1 }}>
            My App
          </Typography>
          <Box display="flex" alignItems="center">
            {loggedIn && (
              <Box mr={1}>
                <Avatar>U</Avatar>
              </Box>
            )}
            {navbarContent}
          </Box>
        </Toolbar>
      </AppBar>
      <Drawer open={drawerOpen} onClose={handleDrawerToggle}>
        {sidebarContent}
      </Drawer>
      <Box marginTop="64px" display="flex">
        <Box width={drawerWidth} flexShrink={0}>
          {loggedIn && <>{sidebarContent}</>}
        </Box>
        <Box flexGrow={1} padding={2}>
          <Routes>
            <Route exact path="/">
              <Typography variant="h4">Home Page</Typography>
            </Route>
            <Route exact path="/signup">
              <Signup />
            </Route>
            <Route exact path="/dashboard">
              <Dashboard />
            </Route>
          </Routes>
        </Box>
      </Box>
    </Router>
  );
};

export default Layout;