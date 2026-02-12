const mongoose = require("mongoose");

const TeamSchema = new mongoose.Schema(
  {
    name: String,

    enterpriseId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Enterprise"
    },

    totalCO2Emitted: {
      type: Number,
      default: 0
    },

    totalCO2Saved: {
      type: Number,
      default: 0
    },

    rewardLevel: {
      type: String,
      enum: ["Bronze", "Silver", "Gold"],
      default: "Bronze"
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Team", TeamSchema);
