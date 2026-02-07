const express = require('express');
const router = express.Router();
const runController = require('../controllers/runController');
const checkUsage = require('../middleware/usageCheck'); // The middleware from previous step

// The Endpoint the Frontend will hit
// POST /api/run
// Headers: x-user-id: <id>
// Body: { "language": "python", "code": "...", "questionId": "..." }
router.post('/run', checkUsage, runController.executeCode);

module.exports = router;