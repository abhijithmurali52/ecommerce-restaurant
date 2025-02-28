import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import './AdminTableReservationList.css';
import Sidebar from './Sidebar';


const AdminTableReservationList = () => {
  const [bookings, setBookings] = useState([]);
  const [maxPersons, setMaxPersons] = useState(0);
  const [newMaxPersons, setNewMaxPersons] = useState('');
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const handleSidebarToggle = () => setSidebarOpen(!sidebarOpen);


  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const response = await axios.get('http://localhost:2024/api/bookTable');
        setBookings(response.data);
      } catch (error) {
        console.error('Error fetching bookings:', error);
      }
    };
   
    const fetchMaxPersons = async () => {
        try {
          const response = await axios.get('http://localhost:2024/api/maxPersons');
          setMaxPersons(response.data.maxPersons);
        } catch (error) {
          console.error('Error fetching max persons:', error);
        }
      };
  
      fetchBookings();
      fetchMaxPersons();
  }, []);

  const handleMaxPersonsChange = (e) => {
    setNewMaxPersons(e.target.value);
  };

  const handleMaxPersonsSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:2024/api/setMaxPersons', { maxPersons: newMaxPersons });
      setMaxPersons(newMaxPersons);
      alert('Maximum persons limit set successfully.');
    } catch (error) {
      console.error('Error setting max persons:', error);
      alert('Error setting max persons.');
    }
  };

  return (
    <div className="dashboard-container">
        <Sidebar show={sidebarOpen} onHide={handleSidebarToggle}/>
        <div
        className={`sidebar-toggle ${sidebarOpen ? "open" : "closed"}`}
        onClick={handleSidebarToggle}
      >
        {sidebarOpen ? <FaArrowLeft /> : <FaArrowRight />}
      </div>
      <div
        className={`main-content ${
          sidebarOpen ? "with-sidebar" : "without-sidebar"
        }`}
      >
    <div className="container">
    <div className="form-container">
      <h3 className="form-header">Set Maximum Persons for Booking</h3>
      <form onSubmit={handleMaxPersonsSubmit} className="form">
        <label className="form-label">
          Max Persons:
          <input
            type="number"
            value={newMaxPersons}
            onChange={handleMaxPersonsChange}
            required
            className="form-input"
          />
        </label>
        <button type="submit" className="form-button">Set Max Persons</button>
      </form>
      <p className="current-max">Current Max Persons Allowed: {maxPersons}</p>
    </div>
    <h2 className="header">All Bookings</h2>
    <table className="booking-table">
      <thead>
        <tr>
          <th>Date</th>
          <th>Time</th>
          <th>Name</th>
          <th>Email</th>
          <th>Phone</th>
          <th>Persons</th>
        </tr>
      </thead>
      <tbody>
        {bookings.map((booking, index) => (
          <tr key={index}>
            <td>{new Date(booking.date).toLocaleDateString()}</td>
            <td>{booking.time}</td>
            <td>{booking.customer.name}</td>
            <td>{booking.customer.email}</td>
            <td>{booking.customer.phone}</td>
            <td>{booking.persons}</td>
          </tr>
        ))}
      </tbody>
    </table>
   
  </div>
  </div>
  </div>
  );
};

export default AdminTableReservationList;
