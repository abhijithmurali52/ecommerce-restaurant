const mongoose = require('mongoose');


const menuSchema = new mongoose.Schema({
  itemName: { type: String, required: true },
  category: { type: String, required: true },
  itemId: { type: String, required: true },
  description: { type: String, required: true },
  status: { type: String, enum: ['active', 'inactive'], default: 'inactive' },
  price: { type: Number, required: true },
  image: { data: Buffer, contentType: String },
});

const Menu = mongoose.model('Menu', menuSchema);

module.exports = Menu;
