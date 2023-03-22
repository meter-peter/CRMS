import { useState } from 'react';
import { Link } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Button } from '@mui/material';
import { styled } from '@mui/system';
import { useAuth } from '../contexts/AuthContext';

const LoginButton = styled(Button)({
  marginLeft: 'auto',
});

function Navbar() {
  const { currentUser, logout } = useAuth();
  const [error, setError] = useState('');

  async function handleLogout() {
    setError('');

    try {
      await logout();
    } catch {
      setError('Failed to log out');
    }
  }

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" component={Link} to="/" sx={{ flexGrow: 1 }}>
          My App
        </Typography>

        {currentUser ? (
          <>
            <Typography variant="body1" sx={{ marginRight: '16px' }}>
              Hello, {currentUser.email}
            </Typography>
            <LoginButton variant="contained" color="secondary" onClick={handleLogout}>
              Logout
            </LoginButton>
          </>
        ) : (
          <>
            <Button component={Link} to="/login" variant="outlined" color="inherit">
              Login
            </Button>
            <Button component={Link} to="/signup" variant="contained" color="secondary">
              Sign Up
            </Button>
          </>
        )}

      </Toolbar>
    </AppBar>
  );
}

export default Navbar;
