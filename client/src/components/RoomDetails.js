import React from 'react';
import { styled } from '@mui/system';
import { Box, Paper, Typography } from '@mui/material';

const RoomDetailsPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(2),
}));

const RoomDetails = ({ room }) => {
  return (
    <Box mt={2}>
      <RoomDetailsPaper elevation={3}>
        <Typography variant="h5" gutterBottom>
          {room.name}
        </Typography>
        <Typography variant="subtitle1" gutterBottom>
          {room.type} room in {room.building.name}
        </Typography>
        <Typography variant="body1" gutterBottom>
          Capacity: {room.capacity}
        </Typography>
        <Typography variant="body1" gutterBottom>
          Computers: {room.computers}
        </Typography>
        <Typography variant="body1" gutterBottom>
          Projector: {room.projector ? 'Yes' : 'No'}
        </Typography>
        <Typography variant="body1" gutterBottom>
          Locked: {room.locked ? 'Yes' : 'No'}
        </Typography>
      </RoomDetailsPaper>
    </Box>
  );
};

export default RoomDetails;