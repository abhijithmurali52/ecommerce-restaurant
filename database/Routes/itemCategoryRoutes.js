const express = require('express');
const router = express.Router();
const itemCategoryController = require('../Controllers/itemCategoryController');

// Route to create a new item category
router.post('/item-categories', itemCategoryController.createItemCategory);
router.get('/item-categories', itemCategoryController.getCategory);


module.exports = router;
