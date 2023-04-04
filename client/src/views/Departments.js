import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Box,
  Button,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Grid,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from '@mui/material';
import { styled } from '@mui/system';

const DepartmentsTableContainer = styled(TableContainer)(({ theme }) => ({
  marginTop: theme.spacing(4),
  marginBottom: theme.spacing(4),
}));

const DepartmentsTable = styled(Table)(({ theme }) => ({
  minWidth: 650,
}));

const DepartmentsTableHeaderCell = styled(TableCell)(({ theme }) => ({
  fontWeight: 'bold',
}));

const DepartmentsTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
}));

const DepartmentsTextField = styled(TextField)(({ theme }) => ({
  marginTop: theme.spacing(1),
  marginBottom: theme.spacing(1),
}));

const DepartmentsButton = styled(Button)(({ theme }) => ({
  marginTop: theme.spacing(2),
  marginRight: theme.spacing(2),
}));

const Departments = () => {
  const [departments, setDepartments] = useState([]);
  const [newDepartmentName, setNewDepartmentName] = useState('');
  const [newDepartmentDescription, setNewDepartmentDescription] = useState('');
  const [newDepartmentFaculty, setNewDepartmentFaculty] = useState('');
  const [dialogOpen, setDialogOpen] = useState(false);
  const [departmentToDelete, setDepartmentToDelete] = useState(null);

  const handleNewDepartmentNameChange = (event) => {
    setNewDepartmentName(event.target.value);
  };

  const handleNewDepartmentDescriptionChange = (event) => {
    setNewDepartmentDescription(event.target.value);
  };

  const handleNewDepartmentFacultyChange = (event) => {
    setNewDepartmentFaculty(event.target.value);
  };

  const handleAddDepartment = async () => {
    try {
      const response = await axios.post('http://localhost:5000/departments', {
        name: newDepartmentName,
        description: newDepartmentDescription,
        faculty: newDepartmentFaculty,
      });
      setDepartments([...departments, response.data]);
      setNewDepartmentName('');
      setNewDepartmentDescription('');
      setNewDepartmentFaculty('');
    } catch (error) {
      console.error(error);
    }
  };

  const handleDeleteDepartment = async (departmentId) => {
    try {
      await axios.delete(`http://localhost:5000/departments/${departmentId}`);
      setDepartments(departments.filter((department) => department._id !== departmentId));
    } catch (error) {
      console.error(error);
    }
  };

  const handleDialogOpen = (department) => {
    setDepartmentToDelete(department);
    setDialogOpen(true);
  };

  const handleDialogClose = () => {
    setDepartmentToDelete(null);
    setDialogOpen(false);
  };

  useEffect(() => {
    const fetchDepartments = async () => {
      try {
        const response = await axios.get('http://localhost:5000/departments');
        setDepartments(response.data);
      } catch (error) {
        console.error(error);
      }
    };
  
    fetchDepartments();
  }, []);



  return (
    <Container maxWidth="lg">
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
        <Typography variant="h4">Departments</Typography>
        <DepartmentsButton variant="contained" onClick={() => setDialogOpen(true)}>Add Department</DepartmentsButton>
      </Box>
      <DepartmentsTableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <DepartmentsTableHeaderCell>Name</DepartmentsTableHeaderCell>
              <DepartmentsTableHeaderCell>Description</DepartmentsTableHeaderCell>
              <DepartmentsTableHeaderCell>Faculty</DepartmentsTableHeaderCell>
              <DepartmentsTableHeaderCell align="right">Actions</DepartmentsTableHeaderCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {departments.map((department) => (
              <DepartmentsTableRow key={department._id}>
                <TableCell component="th" scope="row">{department.name}</TableCell>
                <TableCell>{department.description}</TableCell>
                <TableCell>{department.faculty}</TableCell>
                <TableCell align="right">
                  <DepartmentsButton variant="outlined" onClick={() => handleDialogOpen(department)}>Delete</DepartmentsButton>
                </TableCell>
              </DepartmentsTableRow>
            ))}
          </TableBody>
        </Table>
      </DepartmentsTableContainer>
      <Dialog open={dialogOpen} onClose={handleDialogClose}>
        <DialogTitle>Add Department</DialogTitle>
        <DialogContent>
          <DepartmentsTextField fullWidth label="Name" value={newDepartmentName} onChange={handleNewDepartmentNameChange} />
          <DepartmentsTextField fullWidth label="Description" value={newDepartmentDescription} onChange={handleNewDepartmentDescriptionChange} />
          <DepartmentsTextField fullWidth label="Faculty" value={newDepartmentFaculty} onChange={handleNewDepartmentFacultyChange} />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogClose}>Cancel</Button>
          <Button onClick={handleAddDepartment}>Save</Button>
        </DialogActions>
      </Dialog>
      <Dialog open={Boolean(departmentToDelete)} onClose={handleDialogClose}>
        <DialogTitle>Delete Department?</DialogTitle>
        <DialogContent>
          <DialogContentText>Are you sure you want to delete {departmentToDelete?.name}?</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogClose}>Cancel</Button>
          <Button onClick={() => { handleDeleteDepartment(departmentToDelete?._id); handleDialogClose(); }} color="error">Delete</Button>
        </DialogActions>
      </Dialog>
    </Container>
  );

}

export default Departments;