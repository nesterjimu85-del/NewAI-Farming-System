const express = require('express');
const router = express.Router();
const farmerController = require('./farmerController');

router.get('/', farmerController.getAllFarmers);
router.get('/current', farmerController.getCurrentFarmer);
router.put('/current', farmerController.updateCurrentFarmer);

module.exports = router;
