const mongoose = require('mongoose');

const seatSchema = new mongoose.Schema({
    seatCode: { type: String, required: true },
    isBooked: { type: Boolean, default: false },
});

const tableSchema = new mongoose.Schema({
  tableNumber: { type: Number, required: true },
  type: { type: String, enum: ['family', 'normal', 'duo'], required: true },
  seats: [seatSchema],
});

const Table = mongoose.model('Table', tableSchema);

module.exports = Table;
