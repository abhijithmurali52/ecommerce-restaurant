// routes/orderRoutes.js
const express = require('express');
const router = express.Router();
const { placeOrder, getAllOrders, getUserOrders, updateOrderStatus, getHistoryOrders } = require('../Controllers/orderController');
const authenticateToken = require('../middleware/authenticateToken');

// POST /api/order
router.post('/order', authenticateToken, placeOrder);

router.get('/order', getAllOrders);

router.get('/userOrder',authenticateToken, getUserOrders);

router.patch('/order/status/:userId/:orderId', updateOrderStatus);

router.get('/orderHistory', getHistoryOrders);




module.exports = router;
