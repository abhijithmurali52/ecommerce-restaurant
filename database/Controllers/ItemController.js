// controllers/item.controller.js
const Item = require('../Models/Item');
const Menu = require('../Models/Menu');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const sharp = require('sharp');
const { pipeline } = require('stream');

const uploadDir = path.join(__dirname, '../uploads');

// // Ensure uploads directory exists
// if (!fs.existsSync(uploadDir)) {
//   fs.mkdirSync(uploadDir, { recursive: true });
// }

// // Configure multer for file uploads
// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, uploadDir);
//   },
//   filename: (req, file, cb) => {
//     cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
//   }
// });

// const upload = multer({ storage: storage });

// // Middleware to resize and save image using Sharp
// exports.resizeAndSaveImage = async (req, res, next) => {
//   if (req.file) {
//     const imagePath = path.join(uploadDir, req.file.filename);
//     const resizedImagePath = path.join(uploadDir, `resized-${req.file.filename}`);
//     try {
//       const image = sharp(imagePath);
//       const metadata = await image.metadata();

//       await image
//         .resize({
//           width: 100, // Adjust width as needed
//           height: Math.round(metadata.height * (100 / metadata.width)),
//           fit: sharp.fit.inside,
//           withoutEnlargement: true,
//         })
//         .withMetadata() // Preserve metadata
//         .toFormat(metadata.format, {
//           quality: 100, // Maximum quality
//           progressive: true,
//           compressionLevel: 0, // For PNG, minimum compression
//           adaptiveFiltering: false, // For PNG, disables adaptive filtering
//         })
//         .toFile(resizedImagePath);

//       req.resizedImageUrl = `uploads/resized-${req.file.filename}`;
//       next();
//     } catch (error) {
//       console.error('Error resizing image:', error);
//       res.status(500).json({ error: 'Error resizing image' });
//     }
//   } else {
//     next();
//   }
// };

  const generateItemId = async () => {
    const lastItem = await Item.findOne().sort({ itemId: -1 });
    if (lastItem && lastItem.itemId) {
      const lastItemId = parseInt(lastItem.itemId.replace('Item', ''), 10);
      const newItemId = lastItemId + 1;
      return `Item${String(newItemId).padStart(5, '0')}`;
    } else {
      return 'Item00001';
    }
  };

  // Set up multer for handling multipart/form-data
// const upload = multer({ dest: 'uploads/' });

  // Create a new item
exports.createItem = async (req, res) => {
  try {
    const { itemName, price, category, description } = req.body;
    const image = req.file;
    // const imageUrl = req.file ? req.file.path : '';


    // Process the image using sharp (example)
    const processedImageBuffer = await sharp(image.buffer)
      .resize({ width: 800, height: 800 })
      .toBuffer();


        // Delete the uploaded file after processing it
    // fs.unlinkSync(image.path);

    // // Save or upload processedImage to cloud storage
    // const imagePath = path.join(__dirname, '..', 'uploads', `resized-${image.filename}`);
    // await fs.promises.writeFile(imagePath, processedImage);


    const itemId = await generateItemId();

    const newItem = new Item({
      itemId,
      itemName,
      category,
      description,
      price,
      image: {
        data: processedImageBuffer,
        contentType: image.mimetype
      }
        });

    await newItem.save();

      // Create and save the menu item
      const newMenuItem = new Menu({
        itemId: newItem.itemId,
        itemName: newItem.itemName,
        price: newItem.price,
        category: newItem.category,
        description: newItem.description,
        status: 'inactive',
        image: {
          data: newItem.image.data,
          contentType: newItem.image.contentType
        }
      });
  
      await newMenuItem.save();
    res.status(201).json(newItem);
  } catch (error) {
    res.status(400).json({ message: error.message });
    console.log("here",error.message)
  }
};

// Get all items
exports.getItems = async (req, res) => {
  try {
    const items = await Item.find();
    res.status(200).json(items);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.getImageById = async (req, res) => {
  try {
    const item = await Item.findById(req.params.id);
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
// Update an item by ID
exports.updateItem = async (req, res) => {
  try {
    const { itemName, price } = req.body;
    const itemId = req.params.id; // Get the _id from URL parameter
    let imageUrl = req.body.imageUrl; // Existing image URL

    // Check if new file was uploaded
    if (req.file) {
      imageUrl = req.resizedImageUrl; // Use resized image URL
    }

    // Update item in database
    const updatedItem = await Item.findByIdAndUpdate(itemId, { itemName, price, imageUrl }, { new: true });

    if (!updatedItem) {
      return res.status(404).json({ message: 'Item not found' });
    }

    res.status(200).json(updatedItem);
  } catch (error) {
    console.error('Error updating item:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// exports.upload = upload;
