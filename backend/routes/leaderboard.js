const express = require("express");
const router = express.Router();
const Submission = require("../models/Submission");

// GET /api/leaderboard?difficulty=Easy
router.get("/", async (req, res) => {
  try {
    const { difficulty } = req.query;

    if (!difficulty) {
      return res.status(400).json({
        success: false,
        message: "Difficulty is required"
      });
    }

    // Start & end of today (auto reset daily)
    const startOfDay = new Date();
    startOfDay.setHours(0, 0, 0, 0);

    const endOfDay = new Date();
    endOfDay.setHours(23, 59, 59, 999);

    // Fetch today's PAID user submissions only
    const submissions = await Submission.find({
      difficulty,
      userType: "PAID",
      createdAt: { $gte: startOfDay, $lte: endOfDay }
    })
      .sort({ createdAt: 1 })
      .limit(10);

    const leaderboard = submissions.map((sub, index) => ({
      rank: index + 1,
      name: sub.userName || `User ${index + 1}`,
      score: sub.status
    }));

    res.status(200).json(leaderboard);
  } catch (error) {
    console.error("Leaderboard Error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch leaderboard"
    });
  }
});

module.exports = router;
