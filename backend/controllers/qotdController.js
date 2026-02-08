const Question = require('../models/Question');

// GET /api/qotd
exports.getDailyQuestion = async (req, res) => {
  try {
    // 1. Fetch all questions
    const questions = await Question.find();
    if (!questions.length) {
      return res.status(404).json({ error: "No questions found in DB" });
    }

    // 2. Deterministic Daily Logic
    // This picks a question based on the date so it changes every 24 hours
    const dayOfYear = Math.floor((new Date() - new Date(new Date().getFullYear(), 0, 0)) / 1000 / 60 / 60 / 24);
    const index = dayOfYear % questions.length;
    const dailyQuestion = questions[index];

    // 3. Return the question
    res.json(dailyQuestion);
  } catch (err) {
    console.error("Error in getDailyQuestion:", err);
    res.status(500).json({ error: "Server Error fetching QOTD" });
  }
};