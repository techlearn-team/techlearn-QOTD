const User = require('../models/User');

const checkUsage = async (req, res, next) => {
  try {
    const userId = req.headers['x-user-id']; 
    if (!userId) return res.status(401).json({ error: "Unauthorized: No User ID header" });

    let user = await User.findById(userId);
    if (!user) return res.status(404).json({ error: "User not found" });

    // Lazy Reset Logic
    const today = new Date().toISOString().split('T')[0];
    if (user.lastActiveDate !== today) {
      user.runsUsedToday = 0;
      user.submittedToday = false;
      user.lastActiveDate = today;
      await user.save();
    }

    // Define Limits
    const LIMITS = {
      free: { maxRuns: 2 },
      paid: { maxRuns: 4 }
    };

    const userLimits = LIMITS[user.tier] || LIMITS.free; // Default to free if tier invalid
    const action = req.path.includes('submit') ? 'submit' : 'run';

    if (action === 'run') {
      if (user.runsUsedToday >= userLimits.maxRuns) {
        return res.status(403).json({ 
          error: "Daily Run Limit Reached", 
          isPremium: user.tier === 'paid',
          limit: userLimits.maxRuns 
        });
      }
    } 
    
    // Attach user to request
    req.user = user;
    next();

  } catch (err) {
    console.error("Usage Check Error:", err);
    res.status(500).json({ error: "Server Error checking limits" });
  }
};

module.exports = checkUsage; // <--- IMPORTANT: Default Export