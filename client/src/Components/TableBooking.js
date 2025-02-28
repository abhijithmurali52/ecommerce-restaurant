import React, { useState } from 'react';
import axios from 'axios';

const TableBooking = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [persons, setPersons] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const bookingData = { name, email, phone, date, time, persons };
    try {
      const response = await axios.post('/api/bookTable', bookingData);
      alert(response.data.message);
    } catch (error) {
      console.error('Error booking table:', error);
      alert('Failed to book table');
    }
  };

  return (
    <div>
      <h2>Table Booking</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name:</label>
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
        </div>
        <div>
          <label>Email:</label>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        </div>
        <div>
          <label>Phone:</label>
          <input type="text" value={phone} onChange={(e) => setPhone(e.target.value)} required />
        </div>
        <div>
          <label>Date:</label>
          <input type="date" value={date} onChange={(e) => setDate(e.target.value)} required />
        </div>
        <div>
          <label>Time:</label>
          <input type="time" value={time} onChange={(e) => setTime(e.target.value)} required />
        </div>
        <div>
          <label>Number of Persons:</label>
          <input type="number" value={persons} onChange={(e) => setPersons(e.target.value)} required />
        </div>
        <button type="submit">Book Table</button>
      </form>
    </div>
  );
};

export default TableBooking;
