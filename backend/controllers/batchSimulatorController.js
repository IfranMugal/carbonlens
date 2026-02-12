const ENERGY_PER_TOKEN = 0.00002; // kWh per token
const REGION_FACTOR = 0.7;        // CO2 factor
const COST_PER_KWH = 0.12;        // USD per kWh

const REALTIME_OVERHEAD = 1.20;
const BATCH_OVERHEAD = 1.05;

// Helper: Round to next hour
function getNextHour(date) {
  const next = new Date(date);
  next.setMinutes(0, 0, 0);
  next.setHours(next.getHours() + 1);
  return next;
}

// Helper: Midnight next day
function getNextMidnight(date) {
  const next = new Date(date);
  next.setDate(next.getDate() + 1);
  next.setHours(0, 0, 0, 0);
  return next;
}

exports.simulateBatchProcessing = (req, res) => {
  try {
    const { estimatedTokens, batchType } = req.body;

    if (!estimatedTokens || estimatedTokens <= 0) {
      return res.status(400).json({
        error: "estimatedTokens must be a positive number"
      });
    }

    const submissionTime = new Date();

    let executionTime;

    if (batchType === "hourly") {
      executionTime = getNextHour(submissionTime);
    } else if (batchType === "daily") {
      executionTime = getNextMidnight(submissionTime);
    } else {
      executionTime = submissionTime; // real-time fallback
    }

    // Base Energy
    const baseEnergy = estimatedTokens * ENERGY_PER_TOKEN;

    // Real-time energy
    const energyReal = baseEnergy * REALTIME_OVERHEAD;

    // Batch energy
    const energyBatch = baseEnergy * BATCH_OVERHEAD;

    // CO2
    const co2Real = energyReal * REGION_FACTOR;
    const co2Batch = energyBatch * REGION_FACTOR;

    // Cost
    const costReal = energyReal * COST_PER_KWH;
    const costBatch = energyBatch * COST_PER_KWH;

    // Savings
    const energySaved = energyReal - energyBatch;
    const co2Saved = co2Real - co2Batch;
    const costSaved = costReal - costBatch;

    const percentageEnergySaved =
      (energySaved / energyReal) * 100;

    setTimeout(() => {
    res.json({
      submissionTime,
      executionTime,
      configuration: {
        estimatedTokens,
        batchType
      },
      realTime: {
        energyKwh: Number(energyReal.toFixed(6)),
        co2Kg: Number(co2Real.toFixed(6)),
        costUsd: Number(costReal.toFixed(6))
      },
      batch: {
        energyKwh: Number(energyBatch.toFixed(6)),
        co2Kg: Number(co2Batch.toFixed(6)),
        costUsd: Number(costBatch.toFixed(6))
      },
      savings: {
        energySavedKwh: Number(energySaved.toFixed(6)),
        co2SavedKg: Number(co2Saved.toFixed(6)),
        costSavedUsd: Number(costSaved.toFixed(6)),
        percentageEnergySaved: Number(percentageEnergySaved.toFixed(2))
      }
    });
    }, 2500);

    

  } catch (error) {
    res.status(500).json({
      error: error.message
    });
  }
};
