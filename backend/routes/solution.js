const express = require("express");
const router = express.Router();
const Question = require("../models/Question");
const checkUsage = require("../middleware/usageCheck");

router.get("/:questionId", checkUsage, async (req, res) => {
  try {
    const user = req.user;

    if (user.tier !== "paid") {
      return res.status(403).json({
        error: "Upgrade to paid to view the official solution"
      });
    }

    const question = await Question.findById(req.params.questionId)
      .select("+solutionCode");

    if (!question || !question.solutionCode) {
      return res.status(404).json({
        error: "Solution not available"
      });
    }

    res.json({
      success: true,
      solution: question.solutionCode
    });

  } catch (err) {
    console.error("Solution Fetch Error:", err);
    res.status(500).json({ error: "Server error fetching solution" });
  }
});

module.exports = router;
