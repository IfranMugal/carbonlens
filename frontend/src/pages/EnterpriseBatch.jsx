import React, { useState } from "react";
import API from "../services/api";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

function EnterpriseBatch() {
  const [file, setFile] = useState(null);
  const [instruction, setInstruction] = useState("");
  const [tokens, setTokens] = useState("");
  const [batchType, setBatchType] = useState("hourly");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSimulate = async () => {
    if (!tokens) return alert("Enter estimated tokens");

    try {
      setLoading(true);

      const res = await API.post("/enterprise/batch-simulate", {
        estimatedTokens: Number(tokens),
        batchType,
      });

      setResult(res.data);
    } catch (err) {
      alert("Simulation failed");
    } finally {
      setLoading(false);
    }
  };

  const energyChartData = result
    ? [
        { name: "Real-Time", value: result.realTime.energyKwh },
        { name: "Batch", value: result.batch.energyKwh },
      ]
    : [];

  const costChartData = result
    ? [
        { name: "Real-Time", value: result.realTime.costUsd },
        { name: "Batch", value: result.batch.costUsd },
      ]
    : [];

  const annualProjection = result
    ? (result.savings.costSavedUsd * 365).toFixed(2)
    : 0;

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="max-w-6xl mx-auto px-6 py-10">

        <h2 className="text-3xl font-bold text-green-800 mb-2">
          Enterprise Batch Processing Simulator
        </h2>
        <p className="text-gray-600 mb-8">
          Evaluate financial and sustainability impact of batching AI workloads.
        </p>

        {/* Input Section */}
        <div className="bg-white p-6 rounded-2xl shadow-md mb-8">
          <div className="grid md:grid-cols-2 gap-6">

            <div>
              <label className="block text-sm font-medium mb-1">
                Upload Document
              </label>
              <input
                type="file"
                onChange={(e) => setFile(e.target.files[0])}
                className="w-full"
              />
              {file && (
                <p className="text-xs text-gray-500 mt-1">
                  {file.name} ({(file.size / 1024).toFixed(1)} KB)
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">
                Estimated Tokens
              </label>
              <input
                type="number"
                value={tokens}
                onChange={(e) => setTokens(e.target.value)}
                className="w-full border rounded-md p-2"
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium mb-1">
                Instruction
              </label>
              <textarea
                rows={3}
                value={instruction}
                onChange={(e) => setInstruction(e.target.value)}
                className="w-full border rounded-md p-2"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">
                Batch Type
              </label>
              <select
                value={batchType}
                onChange={(e) => setBatchType(e.target.value)}
                className="w-full border rounded-md p-2"
              >
                <option value="hourly">Hourly Batch</option>
                <option value="daily">Daily Batch</option>
                <option value="realtime">Real-Time</option>
              </select>
            </div>
          </div>

          <button
            onClick={handleSimulate}
            className="mt-6 bg-green-700 hover:bg-green-800 text-white px-6 py-2 rounded-lg transition"
          >
            {loading ? "Simulating..." : "Run Simulation"}
          </button>
        </div>

        {/* Results */}
        {result && (
          <>
            {/* Timeline */}
            <div className="bg-white p-6 rounded-xl shadow-sm mb-8">
              <h3 className="font-semibold mb-4">
                Execution Timeline
              </h3>
              <p>
                <strong>Submitted:</strong>{" "}
                {new Date(result.submissionTime).toLocaleString()}
              </p>
              <p>
                <strong>Scheduled Execution:</strong>{" "}
                {new Date(result.executionTime).toLocaleString()}
              </p>
            </div>

            {/* Energy Chart */}
            <div className="bg-white p-6 rounded-xl shadow-sm mb-8">
              <h3 className="font-semibold mb-4">
                Energy Comparison (kWh)
              </h3>
              <ResponsiveContainer width="100%" height={250}>
                <BarChart data={energyChartData}>
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="value" fill="#15803d" />
                </BarChart>
              </ResponsiveContainer>
            </div>

            {/* Cost Chart */}
            <div className="bg-white p-6 rounded-xl shadow-sm mb-8">
              <h3 className="font-semibold mb-4">
                Operational Cost Comparison (USD)
              </h3>
              <ResponsiveContainer width="100%" height={250}>
                <BarChart data={costChartData}>
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="value" fill="#0f766e" />
                </BarChart>
              </ResponsiveContainer>
            </div>

            {/* Sustainability Metrics */}
            <div className="bg-green-100 p-6 rounded-xl shadow-md mb-8">
              <h3 className="text-lg font-semibold mb-3 text-green-900">
                Sustainability Impact
              </h3>
              <div className="grid md:grid-cols-4 gap-4">
                <MetricCard
                  title="Energy Saved (kWh)"
                  value={result.savings.energySavedKwh}
                />
                <MetricCard
                  title="CO₂ Saved (kg)"
                  value={result.savings.co2SavedKg}
                />
                <MetricCard
                  title="Cost Saved ($)"
                  value={result.savings.costSavedUsd}
                />
                <MetricCard
                  title="Energy Reduction %"
                  value={`${result.savings.percentageEnergySaved}%`}
                />
              </div>
            </div>

            {/* Executive Financial Impact */}
            <div className="bg-gradient-to-r from-green-800 to-green-900 text-white p-8 rounded-2xl shadow-xl">
              <h3 className="text-xl font-semibold mb-6">
                Executive Financial Impact
              </h3>

              <div className="grid md:grid-cols-3 gap-6 text-center">
                <div>
                  <p className="text-sm opacity-80">Cost Reduction</p>
                  <p className="text-4xl font-bold">
                    {result.savings.percentageEnergySaved}%
                  </p>
                </div>

                <div>
                  <p className="text-sm opacity-80">Saved Per Simulation</p>
                  <p className="text-4xl font-bold">
                    ${result.savings.costSavedUsd}
                  </p>
                </div>

                <div>
                  <p className="text-sm opacity-80">Projected Annual Savings</p>
                  <p className="text-4xl font-bold">
                    ${annualProjection}
                  </p>
                </div>
              </div>

              <p className="text-sm mt-6 opacity-80 text-center">
                *Annual projection assumes consistent daily workload execution.
              </p>
            </div>
          </>
        )}

      </div>
    </div>
  );
}

function MetricCard({ title, value }) {
  return (
    <div className="bg-white p-4 rounded-xl shadow-sm text-center">
      <p className="text-sm text-gray-500 mb-1">{title}</p>
      <p className="text-lg font-bold text-green-800">{value}</p>
    </div>
  );
}

export default EnterpriseBatch;
