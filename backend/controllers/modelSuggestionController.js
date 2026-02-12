const modelProfiles = require("../data/modelProfiles");
const classifyTask = require("../services/taskClassifier");

// Backend-controlled region (not user input)
const REGION_EMISSION = {
  "asia-south": 0.7,
  "us-east": 0.4,
  "eu-west": 0.3
};

const DEFAULT_REGION = "asia-south";

// Helper to compare complexity levels
const complexityRank = {
  Low: 1,
  Medium: 2,
  High: 3
};

exports.getModelSuggestions = (req, res) => {
  try {
    const { prompt } = req.body;

    if (!prompt || typeof prompt !== "string") {
      return res.status(400).json({ error: "Prompt is required" });
    }

    // 1️⃣ Understand the task
    const task = classifyTask(prompt);

    // 2️⃣ Resolve region internally
    const regionFactor =
      REGION_EMISSION[DEFAULT_REGION] || 0.7;

    const comparisons = [];

    // 3️⃣ Compare all known models
    for (const modelName in modelProfiles) {
      const profile = modelProfiles[modelName];

      const energyKwh =
        task.estimatedTokens * profile.energyPerToken;

      const co2Kg = energyKwh * regionFactor;

      // Capability check
      const supportsIntent =
        profile.capabilities.includes(task.intent);

      const supportsComplexity =
        complexityRank[profile.maxComplexity] >=
        complexityRank[task.complexity];

      // Overkill detection
      const overkill =
        supportsIntent &&
        complexityRank[profile.maxComplexity] >
          complexityRank[task.complexity];

      // Capability fit label
      let capabilityFit = "Poor";
      if (supportsIntent && supportsComplexity && !overkill)
        capabilityFit = "Best";
      else if (supportsIntent && supportsComplexity && overkill)
        capabilityFit = "Overkill";
      else if (supportsIntent)
        capabilityFit = "Partial";

      // Explanation note (lightweight)
      let note = "";
      if (!supportsIntent) {
        note = "Model not optimized for this task type";
      } else if (overkill) {
        note = "Higher capability than required, leading to unnecessary energy use";
      } else {
        note = "Well aligned with task requirements";
      }

      comparisons.push({
        model: modelName,
        provider: profile.provider,
        energyKwh: Number(energyKwh.toFixed(4)),
        co2Kg: Number(co2Kg.toFixed(4)),
        capabilityFit,
        overkill,
        note
      });
    }

    // 4️⃣ Choose recommended model
    const suitableModels = comparisons.filter(
      m => m.capabilityFit === "Best"
    );

    const recommended =
      suitableModels.length > 0
        ? suitableModels.reduce((a, b) =>
            a.energyKwh < b.energyKwh ? a : b
          )
        : comparisons.reduce((a, b) =>
            a.energyKwh < b.energyKwh ? a : b
          );

    const worst = comparisons.reduce((a, b) =>
      a.energyKwh > b.energyKwh ? a : b
    );

    // 5️⃣ Build response
    res.json({
      taskUnderstanding: {
        intent: task.intent,
        complexity: task.complexity,
        estimatedTokens: task.estimatedTokens,
        explanation: task.explanation
      },

      recommendedModel: {
        name: recommended.model,
        provider: recommended.provider,
        reason: [
          "Matches required task capability",
          "Satisfies complexity without overkill",
          "Lowest environmental impact among suitable models"
        ]
      },

      modelComparisons: comparisons,

      sustainabilityImpact: {
        energySavedKwh: Number(
          (worst.energyKwh - recommended.energyKwh).toFixed(4)
        ),
        co2SavedKg: Number(
          (worst.co2Kg - recommended.co2Kg).toFixed(4)
        ),
        comparisonBasis: "Compared with highest-impact model"
      }
    });
  } catch (error) {
    res.status(500).json({ error: "hello" });
  }
};
