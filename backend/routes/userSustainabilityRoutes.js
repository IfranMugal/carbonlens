const express = require("express");
const router = express.Router();
const {
  addCO2Emitted,
  addCO2Saved
} = require("../controllers/userSustainabilityController");

router.post("/users/add-emitted", addCO2Emitted);
router.post("/users/add-saved", addCO2Saved);

module.exports = router;
