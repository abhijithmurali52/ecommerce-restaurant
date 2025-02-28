const express = require('express');
const router = express.Router();
const { getTables, bookSeats, reopenSeats } = require('../Controllers/tableController');
const authenticateToken = require('../middleware/authenticateToken');

router.get('/tables', getTables);
router.post('/tableBooking', authenticateToken,bookSeats);
// Reopen seats
router.post('/tables/reopen-seats', reopenSeats);

module.exports = router;
