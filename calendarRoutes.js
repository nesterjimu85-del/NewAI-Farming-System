const express = require('express');
const router = express.Router();
const calendarController = require('./calendarController');

router.get('/', calendarController.getAllActivities);
router.post('/', calendarController.addActivity);
router.patch('/:id/toggle', calendarController.toggleActivity);
router.delete('/:id', calendarController.deleteActivity);

module.exports = router;
