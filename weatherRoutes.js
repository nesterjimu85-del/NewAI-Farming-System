const express = require('express');
const router = express.Router();
const weatherController = require('./weatherController');

router.get('/', weatherController.getCurrentWeather);
router.get('/forecast', weatherController.getForecast);
router.put('/', weatherController.updateWeather);

module.exports = router;
