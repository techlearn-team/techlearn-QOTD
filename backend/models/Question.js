const mongoose = require('mongoose');

const QuestionSchema = new mongoose.Schema({
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
  
  //! Keep these for the "Quick View" or Card display
  sampleInput: { type: String, required: true },
  sampleOutput: { type: String, required: true },
  
  //! NEW: Matches the "Examples" 
  examples: [
    {
      input: { type: String, required: true },
      output: { type: String, required: true },
      explanation: { type: String, required: true } // 
    }
  ],

  hints: [String],
  constraints: [String], 
  
  expectedOutput: { type: String, select: false }, //! Hidden solution
  
  //! Solution code for Paid users
  solution: {
    python: { type: String, required: true },
    java: { type: String, required: true }
  },
  
  //! For the Mock Execution Engine (can overlap with examples if needed)
  testCases: [
    {
      input: String,
      output: String
    }
  ]
});

module.exports = mongoose.model('Question', QuestionSchema);