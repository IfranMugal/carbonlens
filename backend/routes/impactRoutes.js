const express = require("express");
const router = express.Router();
const { evaluateImpact } = require("../controllers/impactController");

router.post("/evaluate-impact", evaluateImpact);

module.exports = router;
