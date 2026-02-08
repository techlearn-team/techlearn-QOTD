const mongoose = require("mongoose");

const submissionSchema = new mongoose.Schema(
  {
    questionId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Question",
      required: true
    },
    difficulty: {
      type: String,
      required: true
    },
    userId: {
      type: String,
      default: "mock-user"
    },
    userName: {
      type: String,
      default: "Anonymous"
    },
    userType: {
      type: String,
      enum: ["FREE", "PAID"],
      default: "FREE"
    },
    status: {
      type: String,
      enum: ["Correct", "Incorrect"],
      required: true
    }
  },
  {
    timestamps: true // adds createdAt & updatedAt
  }
);

module.exports = mongoose.model("Submission", submissionSchema);
