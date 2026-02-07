const express = require('express');
const router = express.Router();
const qotdController = require('../controllers/qotdController');

// Debugging check: If this logs 'undefined', the controller file isn't saved correctly!
if (!qotdController.getDailyQuestion) {
  console.error("CRITICAL ERROR: qotdController.getDailyQuestion is undefined.");
  console.error("Check your controllers/qotdController.js file exports.");
}

// GET /api/qotd
router.get('/', qotdController.getDailyQuestion);

module.exports = router;