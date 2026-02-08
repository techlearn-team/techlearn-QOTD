const User = require('../models/User');

// REGISTER
exports.register = async (req, res) => {
  const { username, email, password } = req.body;

  try {
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ message: "User already exists with this email" });
    }

    user = new User({
      username,
      email,
      password, // Storing plain text for simple demo - In production, hash this!
      tier: 'free', // Default to free
      lastActiveDate: new Date().toISOString().split('T')[0]
    });

    await user.save();

    res.status(201).json({
      message: "Registration successful",
      user: {
        _id: user._id,
        username: user.username,
        email: user.email,
        tier: user.tier
      }
    });

  } catch (err) {
    console.error("Register Error:", err);
    res.status(500).json({ error: err.message });
  }
};

// LOGIN
exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    // 1. Find User
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // 2. Check Password (Simple Check)
    if (user.password !== password) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // 3. Update Last Active (Optional but good for stats)
    user.lastActiveDate = new Date().toISOString().split('T')[0];
    await user.save();

    // 4. Return User
    res.json({
      message: "Login successful",
      user: {
        _id: user._id,
        username: user.username,
        email: user.email,
        tier: user.tier,
        runsLeft: (user.tier === 'paid' ? 4 : 2) - user.runsUsedToday
      }
    });

  } catch (err) {
    console.error("Login Error:", err);
    res.status(500).json({ error: "Server error during login" });
  }
};