const mongoose = require('mongoose');

const itemCategorySchema = new mongoose.Schema({
  category: {
    type: String,
    required: true,
    unique: true
  }
});

const ItemCategory = mongoose.model('ItemCategory', itemCategorySchema);

module.exports = ItemCategory;
