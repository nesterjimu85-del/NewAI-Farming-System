const express = require('express');
const router = express.Router();
const assistantController = require('./assistantController');

router.post('/chat', assistantController.chat);

module.exports = router;
