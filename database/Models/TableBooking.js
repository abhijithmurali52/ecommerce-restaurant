const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
    tableId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Table', // Reference to the Table model
        required: true
      },
      seatCode: {
        type: String, // Code of the seat, e.g., A1, A2
        required: true
      },
      username: {
        type: String, // Username of the person making the booking
        required: true
      },
      bookingTime: { type: Date, required: true },
      expiryTime: { type: Date, required: true },
      createdAt: {
        type: Date,
        default: Date.now
      }
    });

const Booking = mongoose.model('Booking', bookingSchema);

module.exports = Booking;
