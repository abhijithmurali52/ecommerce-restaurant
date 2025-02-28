const MaxPersons = require('../Models/MaxPersons'); // assuming you have an AdminSetting model

// Other methods...

exports.setMaxPersons = async (req, res) => {
  try {
    const { maxPersons } = req.body;
    await MaxPersons.findOneAndUpdate({}, { maxPersons }, { upsert: true });
    res.status(200).json({ message: 'Settings updated successfully!' });
  } catch (error) {
    res.status(500).json({ message: 'Error updating settings.', error });
  }
};
// Other methods...

exports.getMaxPersons = async (req, res) => {
    try {
      const setting = await MaxPersons.findOne();
    //   const maxPersons = setting ? setting.maxPersons : 0;
      res.status(200).json(setting);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching maximum persons limit.', error });
    }
  };
  