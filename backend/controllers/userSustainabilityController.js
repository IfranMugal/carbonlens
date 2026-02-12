const User = require("../models/User");

// 1️⃣ Add CO2 Emitted
exports.addCO2Emitted = async (req, res) => {
  try {
    const { email, co2Emitted } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    user.totalCO2Emitted += Number(co2Emitted);
    await user.save();

    res.json({
      message: "CO2 emitted added successfully",
      totalCO2Emitted: user.totalCO2Emitted
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// 2️⃣ Add CO2 Saved
exports.addCO2Saved = async (req, res) => {
  try {
    const { email, co2Saved } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    user.totalCO2Saved += Number(co2Saved);
    await user.save();

    res.json({
      message: "CO2 saved added successfully",
      totalCO2Saved: user.totalCO2Saved
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
