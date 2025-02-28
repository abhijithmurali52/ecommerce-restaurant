const express = require('express');
const router = express.Router();
const cartController = require('../Controllers/cartController');
const authenticateToken = require('../middleware/authenticateToken');
// Add item to cart
router.post('/cart/add', authenticateToken, cartController.addItemToCart);

// Get cart
router.get('/cart',authenticateToken, cartController.getCart);

router.delete('/cartRemove/:itemId', authenticateToken, cartController.removeItemFromCart);

router.put('/cartQuantity/:itemId', authenticateToken, cartController.updateCartItemQuantity);

module.exports = router;
