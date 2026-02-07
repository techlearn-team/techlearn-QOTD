const express = require('express');
const router = express.Router();
const runController = require('../controllers/runController');
const checkUsage = require('../middleware/usageCheck'); // The limit enforcer

// POST /api/run
// Protected by 'checkUsage': Checks if user has runs left (2 vs 4)
router.post('/', checkUsage, runController.executeCode);

module.exports = router;