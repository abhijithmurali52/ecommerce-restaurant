import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import './TableGrid.css';
import { useNavigate } from 'react-router-dom';
import { UserContext } from './UserContext'; 

const TableGrid = () => {
  const [tables, setTables] = useState([]);
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [bookingTime, setBookingTime] = useState('');
  const { user } = useContext(UserContext);
  const navigate = useNavigate();
  // console.log("username",username)

  useEffect(() => {
    fetchTables();
  }, []);
  

  const fetchTables = async () => {
    try {
      const response = await axios.get('http://localhost:2024/api/tables');
      setTables(response.data);
    } catch (error) {
      console.error('Error fetching tables:', error);
    }
  };

  const handleSeatSelect = (tableId, seatId) => {
    const seatIndex = selectedSeats.findIndex(seat => seat.tableId === tableId && seat.seatId === seatId);
    if (seatIndex > -1) {
      setSelectedSeats(selectedSeats.filter(seat => !(seat.tableId === tableId && seat.seatId === seatId)));
    } else {
      setSelectedSeats([...selectedSeats, { tableId, seatId }]);
    }
  };
 

  const handleBooking = async () => {
    if (!user) {
      navigate("/login");
    } else {
      console.log('Selected Seats:', selectedSeats);

      try {
        const token = localStorage.getItem("token");
        await axios.post(
          'http://localhost:2024/api/tableBooking',
          { bookings: selectedSeats.map(seat => ({ ...seat, seatCode: seat.seatCode })), username: user.username },          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        
        alert('Booking confirmed!');
      } catch (error) {
        console.error('Error making booking:', error);
      }
    }
  };

  return (
    <div className="table-grid-container">
      <h1>Select Your Tables</h1>
      <div className="table-grid">
      <label>
        Select Booking Date and Time:
        <input
          type="datetime-local"
          value={bookingTime}
          onChange={(e) => setBookingTime(e.target.value)}
        />
      </label>
        {tables.map(table => (
          <div key={table._id} className="table-item">
            <h3>{table.type.charAt(0).toUpperCase() + table.type.slice(1)} Table {table.tableNumber} ({table.seats.length} seats)</h3>
            <div className="seats">
            
              {table.seats.map(seat => (
                <div
                  key={seat._id}
                  className={`seat ${seat.isBooked ? 'booked' : ''} ${selectedSeats.find(s => s.seatId === seat._id) ? 'selected' : ''}`}
                  onClick={() => !seat.isBooked && handleSeatSelect(table._id, seat._id)}
                >
                  {seat.seatNumber}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
      <button onClick={handleBooking} disabled={selectedSeats.length === 0}>Confirm Booking</button>
    </div>
  );
};

export default TableGrid;
