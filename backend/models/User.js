const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema(
  {
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },

    // Critical for Assessment
    tier: {
      type: String,
      enum: ['free', 'paid'],
      default: 'free'
    },

    // Usage Tracking
    runsUsedToday: { type: Number, default: 0 },
    submittedToday: { type: Boolean, default: false },

    // Lazy Reset (YYYY-MM-DD)
    lastActiveDate: {
      type: String,
      default: () => new Date().toISOString().split('T')[0]
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model('User', UserSchema);
