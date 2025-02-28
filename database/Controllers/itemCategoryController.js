const ItemCategory = require('../Models/ItemCategory');

exports.createItemCategory = async (req, res) => {
  try {
    const { category } = req.body;

    const newItemCategory = new ItemCategory({
      category,
    });

    await newItemCategory.save();
    res.status(201).json(newItemCategory);
  } catch (error) {
    res.status(400).json({ message:  error.message });
    console.log("here", error.message)
  }
};

// Get all category
exports.getCategory = async (req, res) => {
  try {
    const category = await ItemCategory.find();
    res.status(200).json(category);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
