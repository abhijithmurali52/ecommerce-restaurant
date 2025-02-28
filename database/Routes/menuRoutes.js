const express = require('express');
const router = express.Router();
const multer = require('multer');
const { addItemToMenu, removeItemFromMenu,getMenuItems, updateMenuItemStatus, getImageById } = require('../Controllers/menuController');
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });
// POST request to add item to menu
router.post('/addItemMenu', upload.single('image'), addItemToMenu);
// DELETE request to remove item from menu
router.delete('/removeItemMenu/:itemId', removeItemFromMenu)
//get
router.get('/menuItems', getMenuItems);

router.put('/menu/:id/status', updateMenuItemStatus);

router.get('/menuImage/:id', getImageById);


module.exports = router;
