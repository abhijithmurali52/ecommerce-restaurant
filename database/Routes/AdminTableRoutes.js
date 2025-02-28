const express = require('express');
const router = express.Router();
const adminController = require('../Controllers/adminTableController');

router.post('/initialize-tables', adminController.initializeTables);

// Add a new table
router.post('/tablesadd', adminController.addTable);

// Update existing table
router.put('/tablesadd/:tableId', adminController.updateTable);

module.exports = router;
