const express = require("express");
const router = express.Router();
const {
  optimizePromptController
} = require("../controllers/promptOptimizerController");

router.post("/prompt-optimize", optimizePromptController);

module.exports = router;
