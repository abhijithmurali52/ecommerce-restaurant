const mongoose = require('mongoose');

const seatSchema = new mongoose.Schema({
  seatNumber: { type: Number, required: true },
  isBooked: { type: Boolean, default: false },
});

const tableSchema = new mongoose.Schema({
  tableNumber: { type: Number, required: true },
  type: { type: String, enum: ['family', 'normal', 'duo'], required: true },
  seats: [seatSchema],
});

const AdminTable = mongoose.model('AdminTable', tableSchema);

module.exports = AdminTable;
