const ImpactLog = require("../models/ImpactLog");
const calculateImpact = require("../services/impactEngine");

exports.evaluateImpact = async (req, res) => {
    console.log("reached here")
  try {
    const { role, modelType, region, tokens, requests } = req.body;

    // Calculate sustainability impact
    const impact = calculateImpact({
      modelType,
      tokens,
      requests,
      region
    });

    // Store in DB
    const log = await ImpactLog.create({
      role,
      modelType,
      region,
      tokens,
      requests,
      energyKwh: impact.energyKwh,
      co2Kg: impact.co2Kg,
      treesEquivalent: impact.treesEquivalent,
      sustainabilityScore: impact.sustainabilityScore
    });

    res.status(201).json({
      message: "Impact evaluated successfully",
      data: log
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to evaluate impact",
      error: error.message
    });
  }
};
