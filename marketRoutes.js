const express = require('express');
const router = express.Router();
const marketController = require('./marketController');

router.get('/', marketController.getMarketPrices);
router.get('/summary', marketController.getMarketSummary);

module.exports = router;
