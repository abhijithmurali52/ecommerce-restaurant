// controllers/orderController.js
const Order = require("../Models/Order");
const Cart = require("../Models/Cart");
const Item = require("../Models/Item");
const User = require("../Models/User");
const mongoose = require("mongoose");
// const io = require('../app').io;

const generateOrderNo = async () => {
  try {
    const lastOrder = await Order.findOne().sort({ 'orders.orderNo': -1 });
    if (lastOrder && lastOrder.orders.length > 0) {
      const lastOrderNo = parseInt(lastOrder.orders[lastOrder.orders.length - 1].orderNo.replace('AR', ''), 10);
      const newOrderNo = lastOrderNo + 1;
      return `AR${String(newOrderNo).padStart(10, '0')}`;
    } else {
      return 'AR000000001';
    }
  } catch (error) {
    console.error("Error generating order number:", error);
    throw new Error("Error generating order number");
  }
};

const placeOrder = async (req, res) => {
  try {
    const userId = req.user.userId;

    // Fetch cart for the user
    const cart = await Cart.findOne({ user: userId });

    if (!cart) {
      return res.status(404).json({ error: "Cart not found" });
    }

    // Create the order items array
    const orderItems = cart.items.map((item) => ({
      item: item.item, // Ensure item is used as a string
      itemName: item.itemName,
      price: item.price,
      quantity: item.quantity,
    }));

    const total = orderItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );

    // Check if an order document already exists for the user
    let userOrder = await Order.findOne({ "user.userId": userId });

    if (!userOrder) {
      // If not, create a new order document for the user
      userOrder = new Order({
        user: {
          userId: cart.user.toString(),
          username: cart.username,
          address: cart.address,
          email: cart.email,
          mobileNo: cart.mobileNo,
        },
        orders: [],
      });
    }
const orderNo = await generateOrderNo();
    // Add the new order to the user's orders
    userOrder.orders.push({
      items: orderItems,
      total: total,
      date: new Date(),
      status: "Pending",
      orderNo,
    });

    const newOrder = await userOrder.save();
    await Cart.deleteOne({ user: userId });

    // io.emit('NEW_ORDER', { order: newOrder });
    res
      .status(201)
      .json({ message: "Order placed successfully", order: userOrder });
  } catch (error) {
    console.error("Error placing order:", error);
    res.status(500).json({ error: "Error placing order" });
  }
};

const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find().sort({ "orders.date": -1 });
    // Filter out non-pending orders
    const filteredOrders = orders
      .map((order) => ({
        ...order._doc,
        orders: order.orders.filter(
          (orderDetail) => orderDetail.status === "Pending"
        ),
      }))
      .filter((order) => order.orders.length > 0);

    res.status(200).json(filteredOrders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getUserOrders = async (req, res) => {
  try {
    const userId = req.user.userId;
    const userOrders = await Order.findOne({ "user.userId": userId });
    res.json(userOrders);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Update order status
// controllers/orderController.js

const updateOrderStatus = async (req, res) => {
  const { userId, orderId } = req.params;
  const { status } = req.body;

  console.log(
    `Received request to update status. User ID: ${userId}, Order ID: ${orderId}, New Status: ${status}`
  );

  try {
    // Log the documents to check if they exist
    const foundOrder = await Order.findOne({
      _id: userId,
      "orders._id": orderId,
    });

    console.log("Found Order:", foundOrder);

    const order = await Order.findOneAndUpdate(
      {
        _id: userId,
        "orders._id": orderId,
      },
      {
        $set: { "orders.$.status": status },
      },
      {
        new: true,
      }
    );

    if (!order) {
      console.log("Order not found");
      return res.status(404).json({ message: "Order not found" });
    }

    console.log("Order status updated successfully:", order);
    res
      .status(200)
      .json({ message: "Order status updated successfully", order });
  } catch (error) {
    console.error("Error updating status:", error);
    res.status(500).json({ message: "Server error", error });
  }
};

const getHistoryOrders = async (req, res) => {
    try {
        const orders = await Order.find().sort({ 'orders.date': -1 });
        res.status(200).json(orders);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
module.exports = { placeOrder, getAllOrders, getUserOrders, updateOrderStatus,getHistoryOrders };
