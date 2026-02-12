const mongoose = require("mongoose");

const EnterpriseSchema = new mongoose.Schema(
  {
    name: String,
    industry: String,

    carbonBudget: Number,

    totalCO2Emitted: {
      type: Number,
      default: 0
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Enterprise", EnterpriseSchema);
