const emissionFactors = {
  "asia-south": 0.7,
  "us-east": 0.4,
  "eu-west": 0.3
};

const modelEnergyFactor = {
  small: 0.00002,
  medium: 0.00005,
  large: 0.0001
};

const TREE_OFFSET_KG = 21; // 1 tree absorbs ~21kg CO2/year

function calculateImpact({ modelType, tokens, requests, region }) {
  const energyPerToken = modelEnergyFactor[modelType];
  const regionFactor = emissionFactors[region] || 0.7;

  const energyKwh = tokens * requests * energyPerToken;
  const co2Kg = energyKwh * regionFactor;
  const treesEquivalent = co2Kg / TREE_OFFSET_KG;

  let sustainabilityScore = "High";
  if (co2Kg > 1) sustainabilityScore = "Low";
  else if (co2Kg > 0.3) sustainabilityScore = "Medium";

  return {
    energyKwh,
    co2Kg,
    treesEquivalent,
    sustainabilityScore
  };
}

module.exports = calculateImpact;
