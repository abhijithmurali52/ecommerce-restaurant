const express = require('express');
const router = express.Router();
const { bookTable, getAllBookings } = require('../Controllers/tablebookingController');

router.post('/bookTable', bookTable);

router.get('/bookTable', getAllBookings);

module.exports = router;
