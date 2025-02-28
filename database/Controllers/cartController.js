const Cart = require('../Models/Cart');
const Menu = require('../Models/Menu');
const User = require('../Models/User')
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const { Types: { ObjectId } } = require('mongoose');

const addItemToCart = async (req, res) => {
    try {
        const { itemId, quantity, preparation, addOns  } = req.body;
        const userId = req.user.userId;

        let cart = await Cart.findOne({ user: userId });
        if (!cart) {
            const user = await User.findById(userId);
            if (!user) {
                return res.status(404).json({ error: 'User not found' });
            }

            cart = new Cart({
                user: userId,
                username: user.username,
                email: user.email,
                mobileNo: user.mobileNo,
                address: user.address,
                items: []
            });
        }

        const menuItem = await Menu.findOne({ itemId });
        if (!menuItem) {
            return res.status(404).json({ error: 'Menu item not found' });
        }

        const itemIndex = cart.items.findIndex(item => item.item.toString() === itemId);
        if (itemIndex > -1) {
            cart.items[itemIndex].quantity += quantity;
        } else {
            cart.items.push({
                item: itemId,
                itemName: menuItem.itemName,
                price: menuItem.price,
                quantity
            });
        }

        await cart.save();
        res.status(200).json(cart);
    } catch (error) {
        console.error('Error adding item to cart:', error);
        res.status(500).json({ error: 'Something went wrong' });
    }
};


const getCart = async (req, res) => {
    try {
        const userId = req.user.userId;
        console.log('Fetching cart for user ID:', userId); // Logging userId

        const cart = await Cart.findOne({ user: userId });
        if (!cart) {
            console.log('Cart not found for user ID:', userId); // Logging when cart is not found
            return res.status(404).json({ error: 'Cart not found' });
        }

        // // Fetch additional item details from the Menu collection
        // const detailedItems = await Promise.all(cart.items.map(async (cartItem) => {
        //     const menuItem = await Menu.findOne({ itemId: cartItem.item });
        //     if (menuItem) {
        //         return {
        //             item: {
        //                 itemId: menuItem.itemId,
        //                 itemName: menuItem.itemName,
        //                 imageUrl: menuItem.image,
        //                 price: menuItem.price,
        //             },
        //             quantity: cartItem.quantity,
        //         };
        //     }
        //     return null;
        // }));
         // Collect all item IDs from the cart
         const itemIds = cart.items.map(cartItem => cartItem.item);

         // Fetch all related menu items in a single query
         const menuItems = await Menu.find({ itemId: { $in: itemIds } });
 
         // Map the cart items to include detailed menu information
         const detailedItems = cart.items.map(cartItem => {
             const menuItem = menuItems.find(item => item.itemId === cartItem.item);
             if (menuItem) {
                 // Convert binary data to Base64 string
                 const imageBase64 = Buffer.from(menuItem.image.data, 'base64').toString('base64');
                 return {
                     item: {
                         itemId: menuItem.itemId,
                         itemName: menuItem.itemName,
                         imageUrl: `data:${menuItem.image.contentType};base64,${imageBase64}`, // Using contentType for the correct MIME type
                         price: menuItem.price,
                     },
                     quantity: cartItem.quantity,
                 };
             }
             return null;
         }).filter(item => item !== null);

        console.log('Cart found:', cart); // Logging the cart details
        res.status(200).json({ ...cart.toObject(), items: detailedItems });
    } catch (error) {
        console.error('Error fetching cart:', error); // Detailed error logging
        res.status(500).json({ error: 'Something went wrong' });
    }
};

const removeItemFromCart = async (req, res) => {
    const { itemId } = req.params;
    try {
        const cart = await Cart.findOne({ user: req.user.userId });
        if (!cart) {
            return res.status(404).json({ error: 'Cart not found' });
        }
        cart.items = cart.items.filter(item => item.item.toString() !== itemId);
        await cart.save();
        res.json(cart);
    } catch (error) {
        res.status(500).json({ error: 'Error removing item from cart' });
    }
};

const updateCartItemQuantity = async (req, res) => {
    const { itemId } = req.params;
    const { quantity } = req.body;
  
    if (quantity < 1) {
      return res.status(400).send({ error: 'Quantity must be at least 1' });
    }
  
    try {
      const cart = await Cart.findOne({ user: req.user.userId });
  
      if (!cart) {
        return res.status(404).send({ error: 'Cart not found' });
      }
  
      const item = cart.items.find(item => item.item.toString() === itemId);
  
      if (!item) {
        return res.status(404).send({ error: 'Item not found in cart' });
      }
  
      item.quantity = quantity;
      await cart.save();
  
      res.send(cart);
    } catch (error) {
      res.status(500).send({ error: 'Server error' });
    }
  };
    

module.exports = {
    addItemToCart,
    getCart,
    removeItemFromCart,
    updateCartItemQuantity,
};
