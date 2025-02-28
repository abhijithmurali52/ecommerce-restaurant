const express = require('express');
const router = express.Router();
const { createBooking } = require('../Controllers/bookingController');

router.post('/booking', createBooking);

module.exports = router;
