const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// // Define the schema for add-ons
// const addOnSchema = new Schema({
//     name: { type: String, required: true },
//     price: { type: Number, required: true }
//   });

const CartItemSchema = new Schema({
    item: { type: String, required: true },
    itemName: { type: String, required: true },
    price: { type: Number, required: true },
    quantity: { type: Number, required: true },
    preparation: { type: String },  
    addOns: [{
        name: { type: String},
        price: { type: Number }
    }]  // Updated addOns to be an array of objects with name and price
});

const CartSchema = new Schema({
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    username: { type: String, required: true },
    address: { type: String, required: true },
    email: { type: String, required: true},
    mobileNo: { type: String, required: true },
    items: [CartItemSchema],
});

const Cart = mongoose.model('Cart', CartSchema);

module.exports = Cart;
