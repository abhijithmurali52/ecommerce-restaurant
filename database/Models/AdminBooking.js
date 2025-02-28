const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  tableId: { type: mongoose.Schema.Types.ObjectId, ref: 'AdminTable', required: true },
  seatId: { type: mongoose.Schema.Types.ObjectId, required: true },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  bookingTime: { type: Date, default: Date.now },
});

const AdminBooking = mongoose.model('AdminBooking', bookingSchema);

module.exports = AdminBooking;
