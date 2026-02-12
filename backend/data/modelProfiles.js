module.exports = {
  "GPT-3.5-Turbo": {
    provider: "OpenAI",
    energyPerToken: 0.00002,
    maxComplexity: "Medium",
    capabilities: ["Writing", "Coding"]
  },

  "GPT-4": {
    provider: "OpenAI",
    energyPerToken: 0.00008,
    maxComplexity: "High",
    capabilities: ["Writing", "Coding", "Reasoning", "Research"]
  },

  "Gemini-1.5-Flash": {
    provider: "Google",
    energyPerToken: 0.000018,
    maxComplexity: "Low",
    capabilities: ["Writing", "Summarization"]
  },

  "Gemini-1.5-Pro": {
    provider: "Google",
    energyPerToken: 0.00007,
    maxComplexity: "High",
    capabilities: ["Writing", "Coding", "Research", "Reasoning"]
  }
};
