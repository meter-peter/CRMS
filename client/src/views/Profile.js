import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Box, Button, Card, CardContent, Grid, MenuItem, Popover, TextField, Typography } from '@mui/material';
import { styled } from '@mui/system';

const ProfileBox = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
  padding: theme.spacing(2),
}));

const ProfileCard = styled(Card)(({ theme }) => ({
  marginTop: theme.spacing(4),
  marginLeft: theme.spacing(4),
  marginRight: theme.spacing(4),
}));

const ProfileCardContent = styled(CardContent)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
}));

const ProfileTextField = styled(TextField)(({ theme }) => ({
  marginTop: theme.spacing(1),
  marginBottom: theme.spacing(1),
}));

const ProfileButton = styled(Button)(({ theme }) => ({
  marginTop: theme.spacing(2),
}));

const Profile = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [user, setUser] = useState(null);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [address, setAddress] = useState('');
  const [role, setRole] = useState('');
  const open = Boolean(anchorEl);
  const id = open ? 'profile-popover' : undefined;

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get('http://localhost:5000/usersManager/640bc29885b8e64afcf85e22');
        setUser(response.data);
        setFirstName(response.data.firstName);
        setLastName(response.data.lastName);
        setPhoneNumber(response.data.phoneNumber || '');
        setAddress(`${response.data.address.street}, ${response.data.address.city}, ${response.data.address.state}, ${response.data.address.zip}`);
        setRole(response.data.role);
      } catch (error) {
        console.error(error);
      }
    };

    fetchUser();
  }, []);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleSave = () => {
    // TODO: Handle save changes to user profile
    handleClose();
  };

  const handleFirstNameChange = (event) => {
    setFirstName(event.target.value);
  };

  const handleLastNameChange = (event) => {
    setLastName(event.target.value);
  };

  const handlePhoneNumberChange = (event) => {
    setPhoneNumber(event.target.value);
  };

  const handleAddressChange = (event) => {
    setAddress(event.target.value);
  };

  const handleRoleChange = (event) => {
    setRole(event.target.value);
  };

  if (!user) {
    return <div>Loading...</div>;
  }



return(
  <ProfileBox>
  <Typography variant="h4">Profile</Typography>
  <ProfileCard>
    <ProfileCardContent>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <ProfileTextField
            label="First Name"
            variant="outlined"
            defaultValue={firstName}
            InputProps={{ readOnly: true }}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <ProfileTextField
            label="Last Name"
            variant="outlined"
            defaultValue={lastName}
            InputProps={{ readOnly: true }}
          />
        </Grid>
        <Grid item xs={12}>
          <ProfileTextField
            label="Email"
            variant="outlined"
            defaultValue={user.email}
            InputProps={{ readOnly: true }}
          />
        </Grid>
        <Grid item xs={12}>
          <ProfileTextField
            label="Phone Number"
            variant="outlined"
            defaultValue={phoneNumber}
            InputProps={{ readOnly: true }}
          />
        </Grid>
        <Grid item xs={12}>
          <ProfileTextField
            label="Address"
            variant="outlined"
            defaultValue={address}
            InputProps={{ readOnly: true }}
          />
        </Grid>
        <Grid item xs={12}>
          <ProfileTextField
            label="Role"
            variant="outlined"
            defaultValue={role}
            InputProps={{ readOnly: true }}
          />
        </Grid>
      </Grid>
      <ProfileButton variant="contained" onClick={handleClick}>
        Edit
      </ProfileButton>
    </ProfileCardContent>
  </ProfileCard>
  <Popover
    id={id}
    open={open}
    anchorEl={anchorEl}
    onClose={handleClose}
    anchorOrigin={{
      vertical: 'bottom',
      horizontal: 'right',
    }}
    transformOrigin={{
      vertical: 'top',
      horizontal: 'right',
    }}
  >
    <Box sx={{ padding: 2 }}>
      <Typography variant="h6">Edit Profile</Typography>
      <ProfileTextField label="First Name" variant="outlined" defaultValue={firstName} onChange={handleFirstNameChange} />
      <ProfileTextField label="Last Name" variant="outlined" defaultValue={lastName} onChange={handleLastNameChange} />
      <ProfileTextField label="Phone Number" variant="outlined" defaultValue={phoneNumber} onChange={handlePhoneNumberChange} />
      <ProfileTextField label="Address" variant="outlined" defaultValue={address} onChange={handleAddressChange} />
      <ProfileTextField
        label="Role"
        variant="outlined"
        select
        value={role}
        onChange={handleRoleChange}
      >
        <MenuItem value="teacher">Teacher</MenuItem>
        <MenuItem value="booking_manager">Booking Manager</MenuItem>
        <MenuItem value="user_manager">User Manager</MenuItem>
      </ProfileTextField>
      <ProfileButton variant="contained" onClick={handleSave}>
        Save Changes
      </ProfileButton>
    </Box>
  </Popover>
</ProfileBox>

)}

export default Profile;