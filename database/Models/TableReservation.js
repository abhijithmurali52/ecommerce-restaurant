const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const bookingSchema = new Schema({
    date: {
        type: Date,
        required: true,
      },
      time: {
        type: String,
        required: true,
      },
      customer: {
        name: {
          type: String,
          required: true,
        },
        email: {
          type: String,
          required: true,
        },
        phone: {
          type: String,
          required: true,
        },
        address: {
          type: String,
      
        },
      },
      persons: {
        type: Number,
        required: true,
      },
      description: {
        type: String,
        required: true,
      },
    });

module.exports = mongoose.model('TableReservation', bookingSchema);
