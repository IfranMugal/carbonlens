const mongoose = require("mongoose");

const ImpactLogSchema = new mongoose.Schema(
  {
    role: {
      type: String,
      enum: ["individual", "enterprise"],
      required: true
    },

    modelType: {
      type: String,
      enum: ["small", "medium", "large"],
      required: true
    },

    region: {
      type: String,
      required: true
    },

    tokens: {
      type: Number,
      required: true
    },

    requests: {
      type: Number,
      required: true
    },

    energyKwh: {
      type: Number,
      required: true
    },

    co2Kg: {
      type: Number,
      required: true
    },

    treesEquivalent: {
      type: Number,
      required: true
    },

    sustainabilityScore: {
      type: String,
      enum: ["Low", "Medium", "High"],
      required: true
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model("ImpactLog", ImpactLogSchema);
