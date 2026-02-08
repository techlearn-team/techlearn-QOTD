const mongoose = require('mongoose');

const QuestionSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },

    difficulty: {
      type: String,
      required: true,
      enum: ['Beginner', 'Intermediate', 'Advanced']
    },

    topic: { type: String, required: true },
    timeToSolve: { type: String, required: true },
    xp: { type: Number, required: true },

    problemStatement: { type: String, required: true },

    // Used for UI preview / card display
    sampleInput: { type: String, required: true },
    sampleOutput: { type: String, required: true },

    // Examples shown in problem description
    examples: [
      {
        input: { type: String, required: true },
        output: { type: String, required: true },
        explanation: { type: String, required: true }
      }
    ],

    hints: [String],
    constraints: [String],

    /*
      Used ONLY for submission evaluation
      Hidden from frontend
    */
    expectedOutput: {
      type: String,
      select: false
    },

    /*
      Paid-only feature
      Hidden by default
    */
    solution: {
      python: { type: String },
      java: { type: String }
    },

    /*
      Used for Run execution (mock / semi-real)
    */
    testCases: [
      {
        input: { type: String, required: true },
        output: { type: String, required: true }
      }
    ]
  },
  { timestamps: true }
);

module.exports = mongoose.model('Question', QuestionSchema);
