const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  
  // Critical for the Assessment
  tier: { 
    type: String, 
    enum: ['free', 'paid'], 
    default: 'free' 
  },
  
  // Usage Tracking
  runsUsedToday: { type: Number, default: 0 },
  submittedToday: { type: Boolean, default: false },
  
  // For "Lazy Reset" Logic
  lastActiveDate: { type: String } // Stored as "YYYY-MM-DD"
});

module.exports = mongoose.model('User', UserSchema);