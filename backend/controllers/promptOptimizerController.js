const optimizePrompt = require("../services/promptOptimizer");
const estimateTokens = require("../utils/tokenEstimator");

// same energy baseline you used earlier
const ENERGY_PER_TOKEN = 0.00002; 
const REGION_FACTOR = 0.7;

exports.optimizePromptController = async (req, res) => {
  try {
    const { prompt } = req.body;

    if (!prompt || typeof prompt !== "string") {
      return res.status(400).json({
        error: "Prompt is required"
      });
    }

    const optimized = await optimizePrompt(prompt);

    const originalTokens = estimateTokens(prompt);
    const optimizedTokens = estimateTokens(optimized);

    const tokensSaved = Math.max(0,originalTokens - optimizedTokens);

    const energySaved =
      tokensSaved * ENERGY_PER_TOKEN;

    const co2Saved =
      energySaved * REGION_FACTOR;

    const percentageReduction =
      Number(((tokensSaved / originalTokens) * 100).toFixed(1));


    res.json({
      originalPrompt: prompt,
      optimizedPrompt: optimized,
      originalEstimatedTokens: originalTokens,
      optimizedEstimatedTokens: optimizedTokens,
      tokensSaved,
      percentageReduction,
      estimatedEnergySavedKwh: Number(energySaved.toFixed(6)),
      estimatedCo2SavedKg: Number(co2Saved.toFixed(6)),
      note:
        "Optimization reduces unnecessary verbosity while preserving intent."
    });
  } catch (error) {
    res.status(500).json({
      error: error.message
    });
  }
};
