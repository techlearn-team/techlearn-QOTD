const Question = require("../models/Question");
const Submission = require("../models/Submission");

// @desc    Submit a solution
// @route   POST /api/submit
exports.submitSolution = async (req, res) => {
  try {
    const user = req.user;
    const { questionId, userOutput } = req.body;

    if (!questionId || !userOutput) {
      return res.status(400).json({
        message: "Please provide questionId and userOutput"
      });
    }

    // 🚫 Enforce one submission per day
    if (user.submittedToday) {
      return res.status(403).json({
        message: "You have already submitted today"
      });
    }

    // Explicitly select expectedOutput (hidden field)
    const question = await Question.findById(questionId).select("+expectedOutput");

    if (!question) {
      return res.status(404).json({ message: "Question not found" });
    }

    // 🔍 Mock evaluation
    const isCorrect =
      userOutput.toString().trim() ===
      question.expectedOutput.toString().trim();

    const status = isCorrect ? "Correct" : "Incorrect";

    // 💾 Save submission (used by leaderboard)
    await Submission.create({
      userId: user._id,
      userType: user.tier === "paid" ? "PAID" : "FREE",
      userName: user.username,
      questionId,
      difficulty: question.difficulty,
      status
    });

    // ✅ Mark submission done for the day
    user.submittedToday = true;
    await user.save();

    return res.status(201).json({
      success: isCorrect,
      status,
      message: isCorrect
        ? "Great job! Your output matches the expected result."
        : "Output mismatch. Try again."
    });

  } catch (error) {
    console.error("Submit Error:", error);
    res.status(500).json({
      message: "Server Error processing submission"
    });
  }
};
