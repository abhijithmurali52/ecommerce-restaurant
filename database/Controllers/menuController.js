const Menu = require('../Models/Menu');
const mongoose = require('mongoose'); 
const sharp = require('sharp');

const addItemToMenu = async (req, res) => {
  const { itemName, itemId, price, image, category, description } = req.body;

  try {
    // Check if item already exists in menu
    const existingMenuItem = await Menu.findOne({ itemId });
    if (existingMenuItem) {
      return res.status(400).json({ message: 'Item already exists in the menu' });
    }
    const processedImageBuffer = await sharp(image.buffer)
    .resize({ width: 800, height: 800 })
    .toBuffer();


    const newItem = new Menu({
      itemName,
      itemId,
      price,
      image: {
        data: item.image.data,
        contentType: item.image.mimetype
      },
      category,
      description
    });

    await newItem.save();
    res.status(201).json(newItem);
} catch (error) {
    if (error.code === 11000) { // Duplicate key error code
      res.status(400).json({ message: 'Item already exists in the menu' });
    } else {
      res.status(500).json({ message: 'Server error while adding item to menu', error: error.message });
    }
  }
};


const removeItemFromMenu = async (req, res) => {
    const { itemId } = req.params;
  
    try {
      console.log(`Received itemId: '${itemId}'`); // Log the received itemId for debugging, wrapped in quotes to check for extra spaces
   
      // Validate if itemId follows the required format
      if (!/^Item\d{5}$/.test(itemId)) {
        console.log(`Invalid item ID format: '${itemId}'`); // Log the invalid format
        return res.status(400).json({ message: 'Invalid item ID format' });
      }
  
      // Attempt to find and delete the item by itemId
      const removedItem = await Menu.findOneAndDelete({ itemId });
  
      // Check if item was not found
      if (!removedItem) {
        console.log(`Item with itemId '${itemId}' not found`); // Log the not found case
        return res.status(404).json({ message: 'Item not found' });
      }
  
      // Respond with success message
      console.log(`Item with itemId '${itemId}' removed successfully`);
      res.status(200).json({ message: 'Item removed successfully', removedItem });
    } catch (error) {
      // Log the error for debugging
      console.error('Error removing item:', error);
      // Respond with a generic server error message
      res.status(500).json({ message: 'Server error while removing item', error: error.message });
    }
  };

  const getMenuItems = async (req, res) => {
    try {
      const menuItems = await Menu.find({ status: "active" });
      res.status(200).json(menuItems);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  };
  
  // Update item status in menu
const updateMenuItemStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const updatedMenuItem = await Menu.findOneAndUpdate(
      { itemId: id },
      { status: status },
      { new: true }
    );

    if (!updatedMenuItem) {
      return res.status(404).json({ message: 'Menu item not found' });
    }

    res.status(200).json(updatedMenuItem);
  } catch (error) {
    res.status(400).json({ message: error.message });
    console.log('Error:', error.message);
  }
};
const getImageById = async (req, res) => {
  try {
    const item = await Menu.findById(req.params.id);
    if (!item || !item.image || !item.image.data) {
      return res.status(404).json({ message: 'Image not found' });
    }

    res.set('Content-Type', item.image.contentType);
    res.send(item.image.data);
  } catch (error) {
    res.status(400).json({ message: error.message });
    console.error(error.message);
  }
};
    
module.exports = {
  addItemToMenu,
  removeItemFromMenu,
  getMenuItems,
  updateMenuItemStatus,
  getImageById,
};
