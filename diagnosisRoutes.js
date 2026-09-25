const express = require('express');
const router = express.Router();
const diagnosisController = require('./diagnosisController');

router.get('/status', diagnosisController.getVisionStatus);
router.get('/recent', diagnosisController.getRecentDiagnoses);
router.post('/', diagnosisController.diagnoseCrop);

module.exports = router;
