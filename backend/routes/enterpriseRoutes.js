const express = require("express");
const router = express.Router();
const {
  simulateBatchProcessing
} = require("../controllers/batchSimulatorController");

router.post("/enterprise/batch-simulate", simulateBatchProcessing);

module.exports = router;
