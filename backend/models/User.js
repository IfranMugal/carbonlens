const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    name: String,
    email: String,

    role: {
      type: String,
      default: "individual"
    },

    totalCO2Emitted: {
      type: Number,
      default: 0
    },

    totalCO2Saved: {
      type: Number,
      default: 0
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", UserSchema);
