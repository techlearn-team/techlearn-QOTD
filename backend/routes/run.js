const express = require("express");
const router = express.Router();
const runController = require("../controllers/runController");
const usageCheck = require("../middleware/usageCheck");

router.post("/", usageCheck, runController.executeCode);

module.exports = router;