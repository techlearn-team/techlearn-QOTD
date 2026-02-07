const Question = require('../models/Question');
const User = require('../models/User');

// Named Export: executeCode
exports.executeCode = async (req, res) => {
  try {
    const { language, code, questionId } = req.body;
    const user = req.user; 

    if (!code || !language || !questionId) {
      return res.status(400).json({ error: "Missing code, language, or questionId" });
    }

    // Simulated Execution Logic
    const question = await Question.findById(questionId);
    if (!question) return res.status(404).json({ error: "Question not found" });

    await new Promise(resolve => setTimeout(resolve, 1000)); // Fake delay

    // Always Pass logic for Mock Engine
    const results = question.testCases.map((testCase, index) => ({
      testCaseId: index + 1,
      input: testCase.input,
      expectedOutput: testCase.output,
      userOutput: testCase.output, 
      status: "Passed"
    }));

    // Update Runs
    await User.findByIdAndUpdate(user._id, { 
      $inc: { runsUsedToday: 1 },
      lastActiveDate: new Date().toISOString().split('T')[0]
    });

    res.json({
      status: "Success",
      language,
      runsLeft: (user.tier === 'free' ? 2 : 4) - (user.runsUsedToday + 1),
      results: results
    });

  } catch (err) {
    console.error("Execution Error:", err);
    res.status(500).json({ error: "Server Error during execution" });
  }
};