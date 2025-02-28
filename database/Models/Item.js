// models/item.model.js
const mongoose = require('mongoose');

const itemSchema = new mongoose.Schema({

  itemId:{
    type: String,
    required: true,
    unique: true
  },
  category:{
    type: String,
    required: true,
  },
  itemName: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  image: { data: Buffer, contentType: String },
});

module.exports = mongoose.model('Item', itemSchema);
