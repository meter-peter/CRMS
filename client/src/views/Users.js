import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Box, Button, Container, Grid, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Typography, MenuItem } from '@mui/material';

import { styled } from '@mui/system';

const UsersTableContainer = styled(TableContainer)(({ theme }) => ({
  marginTop: theme.spacing(4),
  marginBottom: theme.spacing(4),
}));

const UsersTable = styled(Table)(({ theme }) => ({
  minWidth: 650,
}));

const UsersTableHeaderCell = styled(TableCell)(({ theme }) => ({
  fontWeight: 'bold',
}));

const UsersTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
}));

const UsersTextField = styled(TextField)(({ theme }) => ({
  marginTop: theme.spacing(1),
  marginBottom: theme.spacing(1),
}));

const UsersButton = styled(Button)(({ theme }) => ({
  marginTop: theme.spacing(2),
  marginRight: theme.spacing(2),
}));

const Users = () => {
  const [users, setUsers] = useState([]);
  const [newUserEmail, setNewUserEmail] = useState('');
  const [newUserPassword, setNewUserPassword] = useState('');
  const [newUserRole, setNewUserRole] = useState('teacher');

  const handleNewUserEmailChange = (event) => {
    setNewUserEmail(event.target.value);
  };

  const handleNewUserPasswordChange = (event) => {
    setNewUserPassword(event.target.value);
  };

  const handleNewUserRoleChange = (event) => {
    setNewUserRole(event.target.value);
  };

  const handleAddUser = async () => {
    try {
      const response = await axios.post('http://localhost:5000/usersManager', {
        email: newUserEmail,
        password: newUserPassword,
        role: newUserRole,
      });
      setUsers([...users, response.data]);
      setNewUserEmail('');
      setNewUserPassword('');
      setNewUserRole('teacher');
    } catch (error) {
      console.error(error);
    }
  };

  const handleDeleteUser = async (userId) => {
    try {
      await axios.delete(`http://localhost:5000/usersManager/${userId}`);
      setUsers(users.filter((user) => user._id !== userId));
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get('http://localhost:5000/usersManager');
        setUsers(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchUsers();
  }, [])


return(
    <Container maxWidth="lg">
  <Box display="flex" justifyContent="space-between" alignItems="center">
    <Typography variant="h4" component="h1" gutterBottom>
      Users
    </Typography>
    <Box display="flex" alignItems="center">
      <UsersTextField label="Email" value={newUserEmail} onChange={handleNewUserEmailChange} />
      <UsersTextField label="Password" type="password" value={newUserPassword} onChange={handleNewUserPasswordChange} />
      <UsersTextField select label="Role" value={newUserRole} onChange={handleNewUserRoleChange}>
        <MenuItem value="teacher">Teacher</MenuItem>
        <MenuItem value="booking_manager">Booking Manager</MenuItem>
        <MenuItem value="user_manager">User Manager</MenuItem>
      </UsersTextField>
      <UsersButton variant="contained" color="primary" onClick={handleAddUser}>
        Add User
      </UsersButton>
    </Box>
  </Box>
  <UsersTableContainer component={Paper}>
    <UsersTable aria-label="users table">
      <TableHead>
        <TableRow>
          <UsersTableHeaderCell>Email</UsersTableHeaderCell>
          <UsersTableHeaderCell>Role</UsersTableHeaderCell>
          <UsersTableHeaderCell>Action</UsersTableHeaderCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {users.map((user) => (
          <UsersTableRow key={user._id}>
            <TableCell>{user.email}</TableCell>
            <TableCell>{user.role}</TableCell>
            <TableCell>
              <UsersButton variant="outlined" color="primary" onClick={() => handleDeleteUser(user._id)}>
                Delete
              </UsersButton>
            </TableCell>
          </UsersTableRow>
        ))}
      </TableBody>
      
    </UsersTable>
  </UsersTableContainer>
</Container>
)



};

export default Users;