const express = require('express');
const router = express.Router();
const runController = require('../controllers/runController');
const checkUsage = require('../middleware/usageCheck'); 

// Debugging block: Check if imports are valid before crashing
if (typeof checkUsage !== 'function') {
  console.error("CRITICAL ERROR: 'checkUsage' middleware is not a function.");
}
if (!runController.executeCode) {
  console.error("CRITICAL ERROR: 'runController.executeCode' is undefined.");
}

// POST /api/submit
// 1. checkUsage (Middleware function)
// 2. runController.executeCode (Controller function)
router.post('/', checkUsage, runController.executeCode);

module.exports = router;