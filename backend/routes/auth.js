const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

// Debug check to prevent crash
if (!authController.mockLogin) {
  console.error("CRITICAL ERROR: 'authController.mockLogin' is undefined.");
  console.error("Check your controllers/authController.js exports.");
}

// POST /api/auth/mock-login
router.post('/mock-login', authController.mockLogin);

module.exports = router;