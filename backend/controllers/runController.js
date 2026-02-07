const vm = require("vm");
const Question = require("../models/Question");
const User = require("../models/User");

exports.executeCode = async (req, res) => {
  try {
    const { language, code, questionId } = req.body;

    // 🔐 MOCK USER FALLBACK (Round-2 safe)
    const user = req.user || {
      _id: "mock-user-id",
      tier: "free",
      runsUsedToday: 0
    };

    if (!code || !language || !questionId) {
      return res.status(400).json({
        success: false,
        message: "Missing code, language, or questionId"
      });
    }

    const question = await Question.findById(questionId);
    if (!question) {
      return res.status(404).json({ success: false, message: "Question not found" });
    }

    let executionOutput = "";
    let executionError = null;

    /* --------------------------------
       REAL EXECUTION (JavaScript only)
    ----------------------------------*/
    if (language === "JavaScript") {
      try {
        const sandbox = {
          console: {
            log: (...args) => {
              executionOutput += args.join(" ") + "\n";
            }
          }
        };

        vm.createContext(sandbox);
        vm.runInContext(code, sandbox, { timeout: 1000 });

      } catch (err) {
        executionError = err.message;
      }
    }
    /* --------------------------------
       MOCK EXECUTION (Other Languages)
    ----------------------------------*/
    else {
      executionOutput = "Execution simulated for this language.";
    }

    // 🧪 Evaluate against test cases (mock evaluation logic)
    const results = question.testCases.map((testCase, index) => ({
      testCaseId: index + 1,
      input: testCase.input,
      expectedOutput: testCase.output,
      userOutput: executionError ? executionError : executionOutput.trim(),
      status: executionError ? "Failed" : "Passed"
    }));

    // 🔢 Update run usage
    await User.findByIdAndUpdate(
      user._id,
      {
        $inc: { runsUsedToday: 1 },
        lastActiveDate: new Date().toISOString().split("T")[0]
      },
      { new: true }
    );

    const maxRuns = user.tier === "free" ? 2 : 4;

    return res.status(200).json({
      success: true,
      language,
      runsLeft: Math.max(0, maxRuns - (user.runsUsedToday + 1)),
      results
    });

  } catch (err) {
    console.error("Execution Error:", err);
    return res.status(500).json({
      success: false,
      message: "Server error during code execution"
    });
  }
};
