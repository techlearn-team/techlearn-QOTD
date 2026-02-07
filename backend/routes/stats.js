const express = require("express");
const router = express.Router();
const User = require("../models/User");

router.get("/", async (req, res) => {
  try {
    const userId = req.headers["x-user-id"];
    const user = await User.findById(userId);

    if (!user) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    if (user.tier !== "paid") {
      return res.status(403).json({ error: "Upgrade to paid plan" });
    }

    // mock stats
    res.json({
      stats: {
        totalSolved: 12,
        currentStreak: 5,
        accuracy: "80%"
      }
    });
  } catch (err) {
    console.error("Stats Error:", err);
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;
