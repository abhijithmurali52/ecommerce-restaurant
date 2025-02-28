import React, { useState, useContext } from 'react';
import axios from 'axios';
import { UserContext } from './UserContext';
import { TextField, Button, Container, Typography, Grid } from '@mui/material';
import './TableReservation.css'; 
import Navbar from './Navbar1';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


const TableReservation = () => {
    const { user } = useContext(UserContext);
  const [formData, setFormData] = useState({
    date: '',
    time: '',
    persons: 1,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const bookingData = {
      ...formData,
      name: user.username,
      email: user.email,
      phone: user.mobileNo,
      address: user.address,
    };
    try {
      const response = await axios.post('http://localhost:2024/api/bookTable', bookingData);
      toast.success(response.data.message);
      setFormData({ date: '', time: '', persons: 1 });
    } catch (error) {
      toast.success(error.response.data.message);
    }
  };

  return (
    <div className="reservation-container">
    <Navbar />
    <Container maxWidth="sm">
      <Typography variant="h4" gutterBottom>
        Table Reservation
      </Typography>
      <form onSubmit={handleSubmit} className="reservation-form">
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              label="Date"
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              required
              fullWidth
              InputLabelProps={{
                shrink: true,
              }}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Time"
              type="time"
              name="time"
              value={formData.time}
              onChange={handleChange}
              required
              fullWidth
              InputLabelProps={{
                shrink: true,
              }}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Number of Persons"
              type="number"
              name="persons"
              value={formData.persons}
              onChange={handleChange}
              min="1"
              required
              fullWidth
            />
          </Grid>
          <Grid item xs={12}>
            <Button type="submit" variant="contained" color="primary" fullWidth>
              Book Table
            </Button>
          </Grid>
        </Grid>
      </form>
    </Container>
       {/* <div className="form-group">
        <label>Name:</label>
        <input type="text" value={user.username} readOnly className="form-control" />
      </div>
      <div className="form-group">
        <label>Email:</label>
        <input type="email" value={user.email} readOnly className="form-control" />
      </div>
      <div className="form-group">
        <label>Phone:</label>
        <input type="tel" value={user.mobileNo} readOnly className="form-control" />
      </div>
      <div className="form-group">
        <label>Address:</label>
        <input type="text" value={user.address} readOnly className="form-control" />
      </div> */}
      <ToastContainer />
  </div>
  );
};

export default TableReservation;
