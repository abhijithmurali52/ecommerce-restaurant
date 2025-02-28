// models/Order.js
const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const orderItemSchema = new mongoose.Schema({
    item: { type: String, required: true }, // Item ID as String
    itemName: { type: String, required: true },
    price: { type: Number, required: true },
    quantity: { type: Number, required: true },
  });
  
  const userOrderSchema = new mongoose.Schema({
    user: {
      userId: { type: String, required: true },
      username: { type: String, required: true },
      address: { type: String, required: true },
      email: { type: String, required: true },
      mobileNo: { type: String, required: true },
    },
    orders: [
      {
        items: [orderItemSchema],
        orderNo: {type: String, required: true},
        total: { type: Number, required: true },
        date: { type: Date, default: Date.now },
        status: {
            type: String,
            enum: ['Pending', 'Completed', 'Canceled'],
            default: 'Pending'
          },      },
    ],
  });
const Order = mongoose.model('Order', userOrderSchema);

module.exports = Order;
