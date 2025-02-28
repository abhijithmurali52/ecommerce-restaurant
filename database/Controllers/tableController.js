const Table = require('../Models/Table');
const Booking = require('../Models/TableBooking');

exports.getTables = async (req, res) => {
  try {
    const tables = await Table.find({});
    res.status(200).json(tables);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.bookSeats = async (req, res) => {
    const { bookings, username, bookingTime } = req.body;
  
    try {
      const expiryTime = new Date(bookingTime);
      expiryTime.setHours(expiryTime.getHours() + 2);
  
      // Fetch all tables needed in one query for efficiency
      const tableIds = [...new Set(bookings.map(booking => booking.tableId))];
      const tables = await Table.find({ '_id': { $in: tableIds } });
  
      // Convert tables to a map for quick lookup
      const tableMap = tables.reduce((map, table) => {
        map[table._id.toString()] = table;
        return map;
      }, {});
  
      // Group bookings by table to process them one at a time
      const tableBookingGroups = bookings.reduce((groups, booking) => {
        if (!groups[booking.tableId]) {
          groups[booking.tableId] = [];
        }
        groups[booking.tableId].push(booking);
        return groups;
      }, {});
  
      // Process each table's bookings
      for (const [tableId, tableBookings] of Object.entries(tableBookingGroups)) {
        const table = tableMap[tableId];
        if (!table) {
          throw new Error(`Table with ID ${tableId} not found`);
        }
  
        // Check and mark seats as booked
        for (const booking of tableBookings) {
          const seat = table.seats.find(seat => seat._id.toString() === booking.seatId);
          if (!seat) {
            throw new Error(`Seat ${booking.seatId} not found at Table ${table.tableNumber}`);
          }
          if (seat.isBooked) {
            throw new Error(`Seat ${seat.seatCode} at Table ${table.tableNumber} is already booked`);
          }
          seat.isBooked = true;
        }
  
        // Save the table document
        await table.save();
  
        // Save all bookings for this table
        const bookingPromises = tableBookings.map(booking => {
          const seat = table.seats.find(seat => seat._id.toString() === booking.seatId);
          return new Booking({
            tableId: booking.tableId,
            seatCode: seat.seatCode,
            username: username,
            bookingTime: new Date(bookingTime),
            expiryTime
          }).save();
        });
  
        await Promise.all(bookingPromises);
      }
  
      res.status(200).json({ message: 'Booking confirmed!' });
    } catch (error) {
      console.error('Error making booking:', error);
      res.status(500).json({ error: error.message });
    }
  };
  
      exports.reopenSeats = async (req, res) => {
        const { seatCodes } = req.body;
        try {
          const updatePromises = seatCodes.map(async (seatCode) => {
            const table = await Table.findOne({ 'seats.seatCode': seatCode });
            if (!table) {
              throw new Error(`Seat ${seatCode} not found`);
            }
      
            // Update seat booking status
            table.seats = table.seats.map((seat) =>
              seat.seatCode === seatCode ? { ...seat, isBooked: false } : seat
            );
            await table.save();
      
            // Remove corresponding booking
            await Booking.findOneAndDelete({ seatCode });
      
            return table;
          });
          await Promise.all(updatePromises);
          res.status(200).json({ message: 'Seats reopened successfully' });
        } catch (error) {
          res.status(500).json({ message: error.message });
        }
      };
      