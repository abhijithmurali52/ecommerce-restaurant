const mongoose = require('mongoose');

const maxPersons = new mongoose.Schema({
  maxPersons: {
    type: Number,
    required: true,
  },
});

module.exports = mongoose.model('MaxPersons', maxPersons);
