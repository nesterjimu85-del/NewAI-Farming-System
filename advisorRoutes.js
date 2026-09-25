const express = require('express');
const router = express.Router();
const advisorController = require('./advisorController');

router.get('/', advisorController.getAllAdvisors);
router.post('/request', advisorController.requestSupport);
router.get('/requests', advisorController.getRequests);

module.exports = router;
