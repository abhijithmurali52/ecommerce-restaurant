// routes/item.routes.js
const express = require('express');
const router = express.Router();
const itemController = require('../Controllers/ItemController');
const multer = require('multer');

// // Set up multer for handling multipart/form-data
// const upload = multer({ dest: 'uploads/' });
// Multer configuration for file uploads
const storage = multer.memoryStorage();
const upload = multer({ 
    storage: storage,
    limits: { fileSize: 50 * 1024 * 1024 } // 50 MB file size limit
  });
router.post('/items', upload.single('image'), itemController.createItem);
router.get('/items', itemController.getItems);
router.get('/images/:id', itemController.getImageById);

// router.put('/items/:id', itemController.upload.single('image'), itemController.resizeAndSaveImage, itemController.updateItem);

module.exports = router;
