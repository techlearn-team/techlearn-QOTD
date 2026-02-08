const User = require('../models/User');

// Named Export: mockLogin
exports.mockLogin = async (req, res) => {
  const { username, tier } = req.body; // e.g. { "username": "alex", "tier": "paid" }

  try {
    // 1. Find or Create the user
    let user = await User.findOne({ username });
    
    if (!user) {
      user = new User({
        username,
        email: `${username}@test.com`,
        tier: tier || 'free',
        lastActiveDate: new Date().toISOString().split('T')[0]
      });
      await user.save();
    } else if (tier && user.tier !== tier) {
      // Update tier if requested (helpful for testing)
      user.tier = tier;
      await user.save();
    }

    // 2. Return success
    res.json({
      message: `Logged in as ${user.username} (${user.tier})`,
      user: {
        _id: user._id,
        username: user.username,
        tier: user.tier,
        runsLeft: (user.tier === 'free' ? 2 : 4) - user.runsUsedToday
      }
    });

  } catch (err) {
    console.error("Auth Error:", err);
    res.status(500).json({ error: err.message });
  }
};