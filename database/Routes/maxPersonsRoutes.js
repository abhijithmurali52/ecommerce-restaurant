const express = require('express');
const router = express.Router();
const maxPersonsController = require('../Controllers/maxPersonsController');

router.post('/setMaxPersons', maxPersonsController.setMaxPersons);
router.get('/maxPersons', maxPersonsController.getMaxPersons);


module.exports = router;
