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
    // Uses server time to ensure everyone sees the same question
    const today = new Date();
    
    // Calculate Day of Year (1-366)
    const start = new Date(today.getFullYear(), 0, 0);
    const diff = today - start;
    const oneDay = 1000 * 60 * 60 * 24;
    const dayOfYear = Math.floor(diff / oneDay);
    
    // Select Question
    const index = dayOfYear % questions.length;
    const dailyQuestion = questions[index];

    // 3. Generate Date Strings for UI
    // "Sunday"
    const dayName = today.toLocaleDateString('en-US', { weekday: 'long' }); 
    // "January 31, 2026"
    const fullDate = today.toLocaleDateString('en-US', { 
      month: 'long', 
      day: 'numeric', 
      year: 'numeric' 
    });

    // 4. Return Combined Response
    // We use .toObject() to convert Mongoose doc to plain object so we can add custom fields
    res.json({
      ...dailyQuestion.toObject(),
      day: dayName,      // UI: "Sunday"
      date: fullDate     // UI: "January 31, 2026"
    });

  } catch (err) {
    console.error("Error in getDailyQuestion:", err);
    res.status(500).json({ error: "Server Error fetching QOTD" });
  }
};