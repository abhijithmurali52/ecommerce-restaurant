const Table = require('../Models/Table');

exports.initializeTables = async (req, res) => {
    const { normalCount, familyCount, duoCount } = req.body;
  
    if (normalCount < 0 || familyCount < 0 || duoCount < 0) {
      return res.status(400).json({ message: 'Counts must be non-negative' });
    }
  
    try {
      // Clear existing tables if needed
      await Table.deleteMany({});
  
      // Create tables
      const tables = [];
  
      for (let i = 1; i <= normalCount; i++) {
        tables.push({
          tableNumber: i,
          type: 'normal',
          seats: Array.from({ length: 4 }, (_, index) => ({
            seatCode: `N${i}-${index + 1}`,
            isBooked: false,
          })),
        });
      }
  
      for (let i = 1; i <= familyCount; i++) {
        tables.push({
          tableNumber: i + normalCount,
          type: 'family',
          seats: Array.from({ length: 6 }, (_, index) => ({
            seatCode: `F${i}-${index + 1}`,
            isBooked: false,
          })),
        });
      }
  
      for (let i = 1; i <= duoCount; i++) {
        tables.push({
          tableNumber: i + normalCount + familyCount,
          type: 'duo',
          seats: Array.from({ length: 2 }, (_, index) => ({
            seatCode: `D${i}-${index + 1}`,
            isBooked: false,
          })),
        });
      }
  
      await Table.insertMany(tables);
  
      res.status(201).json({ message: 'Tables initialized successfully' });
    } catch (error) {
      console.error('Error initializing tables:', error);
      res.status(500).json({ error: error.message });
    }
  };

  exports.addTable = async (req, res) => {
    const { tableNumber, seats } = req.body;
  
    try {
      const newTable = new Table({ tableNumber, seats });
      await newTable.save();
      res.status(201).json({ message: 'Table added successfully!' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  
  exports.updateTable = async (req, res) => {
    const { tableId } = req.params;
    const { seats } = req.body;
  
    try {
      const table = await Table.findById(tableId);
      if (!table) {
        return res.status(404).json({ message: 'Table not found' });
      }
  
      table.seats = seats;
      await table.save();
      res.status(200).json({ message: 'Table updated successfully!' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };