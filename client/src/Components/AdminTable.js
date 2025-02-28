import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './AdminTable.css'

const AdminTable = () => {
  const [normalCount, setNormalCount] = useState(0);
  const [familyCount, setFamilyCount] = useState(0);
  const [duoCount, setDuoCount] = useState(0);
   const [tables, setTables] = useState([]);
  const [selectedTable, setSelectedTable] = useState(null);
  const [seatCodesToReopen, setSeatCodesToReopen] = useState('');
  const [newTableType, setNewTableType] = useState('normal');
  const [newTableSeats, setNewTableSeats] = useState(4);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await axios.post(
        'http://localhost:2024/api/initialize-tables',
        {
          normalCount,
          familyCount,
          duoCount
        }
      );
      alert('Tables initialized successfully!');
    } catch (error) {
      console.error('Error initializing tables:', error);
      alert('Failed to initialize tables.');
    }
  };
  useEffect(() => {
    // Fetch existing tables on component mount
    const fetchTables = async () => {
      try {
        const response = await axios.get('http://localhost:2024/api/tables');
        setTables(response.data);
      } catch (error) {
        console.error('Error fetching tables:', error);
      }
    };
    fetchTables();
  }, []);

  const handleReopenSeats = async (event) => {
    event.preventDefault();
    if (seatCodesToReopen.length === 0) {
      alert('Please select seats to reopen.');
      return;
    }
    try {
      await axios.post('http://localhost:2024/api/tables/reopen-seats', {
        seatCodes: seatCodesToReopen,
      });
      alert('Seats reopened successfully!');
      const response = await axios.get('http://localhost:2024/api/tables');
      setTables(response.data);
      setSeatCodesToReopen([]);
    } catch (error) {
      console.error('Error reopening seats:', error);
      alert('Failed to reopen seats.');
    }
  };

  const toggleSeatSelection = (seatCode) => {
    if (seatCodesToReopen.includes(seatCode)) {
      setSeatCodesToReopen(seatCodesToReopen.filter((code) => code !== seatCode));
    } else {
      setSeatCodesToReopen([...seatCodesToReopen, seatCode]);
    }
  };
  const handleAddTable = async (event) => {
    event.preventDefault();
    try {
      await axios.post('http://localhost:2024/api/tables', {
        type: newTableType,
        seats: newTableSeats,
      });
      alert('Table added successfully!');
      const response = await axios.get('http://localhost:2024/api/tables');
      setTables(response.data);
      setNewTableType('normal');
      setNewTableSeats(4);
    } catch (error) {
      console.error('Error adding table:', error);
      alert('Failed to add table.');
    }
  };

  const handleUpdateTable = async (event) => {
    event.preventDefault();
    if (!selectedTable) {
      alert('Please select a table to update.');
      return;
    }
    try {
      await axios.put(`http://localhost:2024/api/tables/${selectedTable._id}`, {
        seats: newTableSeats,
      });
      alert('Table updated successfully!');
      const response = await axios.get('http://localhost:2024/api/tables');
      setTables(response.data);
      setNewTableSeats(4);
      setSelectedTable(null);
    } catch (error) {
      console.error('Error updating table:', error);
      alert('Failed to update table.');
    }
  };

  return (
    <div className="admin-dashboard">
      <h1>Initialize Tables</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>
            Normal Tables (4 seats each):
            <input
              type="number"
              value={normalCount}
              onChange={(e) => setNormalCount(Number(e.target.value))}
              min="0"
            />
          </label>
        </div>
        <div>
          <label>
            Family Tables (6 seats each):
            <input
              type="number"
              value={familyCount}
              onChange={(e) => setFamilyCount(Number(e.target.value))}
              min="0"
            />
          </label>
        </div>
        <div>
          <label>
            Duo Tables (2 seats each):
            <input
              type="number"
              value={duoCount}
              onChange={(e) => setDuoCount(Number(e.target.value))}
              min="0"
            />
          </label>
        </div>
        <button type="submit">Initialize Tables</button>
      </form>
      <h1>Reopen Booked Seats</h1>
      <form onSubmit={handleReopenSeats}>
        {tables.map((table) => (
          <div key={table._id} className="table">
            <h2>Table {table.tableNumber} ({table.type})</h2>
            <div className="seats">
              {table.seats.map((seat) => (
                <div
                  key={seat.seatCode}
                  className={`seat ${seat.isBooked ? 'booked' : 'unbooked'} ${seatCodesToReopen.includes(seat.seatCode) ? 'selected' : ''}`}
                  onClick={() => toggleSeatSelection(seat.seatCode)}
                >
                  {seat.seatCode}
                </div>
              ))}
            </div>
          </div>
        ))}
        <button type="submit">Reopen Selected Seats</button>
      </form>
      <h1>Add New Table</h1>
      <form onSubmit={handleAddTable}>
        <div>
          <label>
            Table Type:
            <select value={newTableType} onChange={(e) => setNewTableType(e.target.value)}>
              <option value="normal">Normal (4 seats)</option>
              <option value="family">Family (6 seats)</option>
              <option value="duo">Duo (2 seats)</option>
            </select>
          </label>
        </div>
        <div>
          <label>
            Number of Seats:
            <input
              type="number"
              value={newTableSeats}
              onChange={(e) => setNewTableSeats(Number(e.target.value))}
              min="1"
            />
          </label>
        </div>
        <button type="submit">Add Table</button>
      </form>

      <h1>Update Existing Table</h1>
      <form onSubmit={handleUpdateTable}>
        <div>
          <label>
            Select Table:
            <select onChange={(e) => setSelectedTable(tables.find((table) => table._id === e.target.value))}>
              <option value="">Select a table</option>
              {tables.map((table) => (
                <option key={table._id} value={table._id}>
                  {table.tableNumber}
                </option>
              ))}
            </select>
          </label>
        </div>
        {selectedTable && (
          <div>
            <label>
              Number of Seats:
              <input
                type="number"
                value={newTableSeats}
                onChange={(e) => setNewTableSeats(Number(e.target.value))}
                min="1"
              />
            </label>
          </div>
        )}
        <button type="submit">Update Table</button>
      </form>
    </div>
  );
};

export default AdminTable;
