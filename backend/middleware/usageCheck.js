const User = require("../models/User");

const checkUsage = async (req, res, next) => {
  try {
    const userId = req.headers["x-user-id"];
    if (!userId) {
      return res.status(401).json({ error: "No user id" });
    }

    const user = await User.findById(userId);
    if (!user) {
      return res.status(401).json({ error: "User not found" });
    }

    const today = new Date().toISOString().split("T")[0];
    if (user.lastActiveDate !== today) {
      user.runsUsedToday = 0;
      user.submittedToday = false;
      user.lastActiveDate = today;
      await user.save();
    }

    // RUN limit only
    if (req.originalUrl.includes("/run")) {
      const maxRuns = user.tier === "paid" ? 4 : 2;
      if (user.runsUsedToday >= maxRuns) {
        return res.status(403).json({ error: "Run limit reached" });
      }
      user.runsUsedToday += 1;
      await user.save();
    }

    req.user = user;
    next();
  } catch (err) {
    console.error("Usage Check Error:", err);
    return res.status(500).json({ error: "Server Error checking limits" });
  }
};

module.exports = checkUsage;
