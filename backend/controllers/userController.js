const User = require("../models/User");

// Mock login / signup
exports.loginOrSignup = async (req, res) => {
  try {
    const { name, email } = req.body;

    if (!email) {
      return res.status(400).json({ message: "Email is required" });
    }

    let user = await User.findOne({ email });

    if (!user) {
      user = await User.create({ name, email });
    }

    res.json({
      message: "User session created",
      user
    });
  } catch (error) {
    res.status(500).json({
      message: "User login/signup failed",
      error: error.message
    });
  }
};

// 👇 THIS MUST EXIST EXACTLY
exports.getUserProfile = async (req, res) => {
  try {
    const { email } = req.query;

    if (!email) {
      return res.status(400).json({ message: "Email is required" });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json({
      email: user.email,
      totalCO2Emitted: user.totalCO2Emitted || 0,
      totalCO2Saved: Number(user.totalCO2Saved).toFixed(2) || 0
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch user profile",
      error: error.message
    });
  }
};
