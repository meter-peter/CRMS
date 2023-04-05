import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { createTheme } from '@mui/material/styles';
import Navbar from './components/Navbar';
import Signup from './views/Signup';
import Login from './views/Login';
import Dashboard from './views/Dashboard';
import AuthProvider from './contexts/AuthContext';
import Profile from './views/Profile';
import Users from './views/Users';
import Departments from './views/Departments';
// import Home from './views/Home';
const theme = createTheme();
function App() {
    return (
      <Router>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <AuthProvider>
            <Navbar />
            <Routes>
              <Route element={<Login />} path="/login" />
              <Route element={<Signup />} path="/signup" />
              <Route element={<Dashboard />} path="/dashboard" />
              <Route element={<Profile />} path="/profile" />
              <Route element={<Users/>} path="/users" />
              <Route element={<Departments/>} path="/departments"/>
              {/* <Route element = {<Home/>}path = "/"/> */}
            
            </Routes>
          </AuthProvider>
        </ThemeProvider>
      </Router>
    );
  }
  
export default App;