const Booking = require('../Models/TableBooking');
const Table = require('../Models/Table');

const createBooking = async (req, res) => {
  const { bookings } = req.body;
  
  try {
    const newBookings = [];
    for (let booking of bookings) {
      const { tableId, seatId } = booking;
      const table = await Table.findById(tableId);
      const seat = table.seats.id(seatId);
      
      if (seat.isBooked) {
        return res.status(400).json({ message: 'Seat is already booked' });
      }
      
      seat.isBooked = true;
      await table.save();
      
      const newBooking = new Booking({ tableId, seatId });
      await newBooking.save();
      newBookings.push(newBooking);
    }
    res.status(201).json(newBookings);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = {
  createBooking
};
