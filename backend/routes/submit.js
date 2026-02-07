const express = require("express");
const router = express.Router();
const checkUsage = require("../middleware/usageCheck");
const Question = require("../models/Question");
const Submission = require("../models/Submission");

// POST /api/submit
router.post("/", checkUsage, async (req, res) => {
  try {
    const user = req.user;
    const { questionId, userOutput } = req.body;

    if (!questionId || userOutput === undefined) {
      return res.status(400).json({
        success: false,
        message: "questionId and userOutput are required"
      });
    }

    // 🚫 One submission per day (user-based)
    if (user.submittedToday) {
      return res.status(403).json({
        success: false,
        message: "You have already submitted today."
      });
    }

    // 🔍 Fetch expectedOutput
    const question = await Question.findById(questionId).select("+expectedOutput");

    if (!question) {
      return res.status(404).json({
        success: false,
        message: "Question not found"
      });
    }

    // ✅ Mock evaluation
    const isCorrect =
      userOutput.toString().trim() ===
      question.expectedOutput.toString().trim();

    // 💾 Save submission (for leaderboard)
    await Submission.create({
      userId: user._id,
      userName: user.username,
      userType: user.tier === "paid" ? "PAID" : "FREE",
      questionId,
      difficulty: question.difficulty,
      status: isCorrect ? "Correct" : "Incorrect"
    });

    // ✅ Mark submission done for today
    user.submittedToday = true;
    await user.save();

    return res.status(201).json({
      success: isCorrect,
      status: isCorrect ? "Correct" : "Incorrect",
      message: isCorrect
        ? "Great job! Your output matches the expected result."
        : "Output mismatch. Try again."
    });

  } catch (error) {
    console.error("Submit Error:", error);
    res.status(500).json({
      success: false,
      message: "Server Error during submission"
    });
  }
});

module.exports = router;
