import React, { useState, useEffect } from 'react';
import { styled } from '@mui/system';
import { Box, Avatar, Typography, Grid } from '@mui/material';

const Profile = () => {
  const [user, setUser,token] = useState({});

  useEffect(() => {
    const fetchUser = async () => {
      const response = await fetch('http://localhost:5000/usersManager/641b8449ba8c53ea01a69156');
      const data = await response.json();
      const token = await response.json().token;
      setUser(data);
    };
    fetchUser();
  }, []);

  return (
    <ProfileContainer>
      <AvatarContainer>
        <Avatar src={user.avatar} sx={{ width: 120, height: 120 }} />
      </AvatarContainer>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <Typography variant="h6">Full Name</Typography>
          <Typography>{user.firstName} {user.lastName}</Typography>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Typography variant="h6">Email</Typography>
          <Typography>{user.email}</Typography>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Typography variant="h6">Phone Number</Typography>
          <Typography>{user.phone}</Typography>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Typography variant="h6">Address</Typography>
          <Typography>{user.address}</Typography>
        </Grid>
      </Grid>
    </ProfileContainer>
  );
};

const ProfileContainer = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  padding: '50px 0',
});

const AvatarContainer = styled(Box)({
  marginBottom: '30px',
});

export default Profile;
