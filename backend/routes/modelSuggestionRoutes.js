const express = require("express");
const router = express.Router();
const {
  getModelSuggestions
} = require("../controllers/modelSuggestionController");

router.post("/model-suggestions", getModelSuggestions);

module.exports = router;
