import React,{ useState } from "react";
import API from "../services/api";

function ModelSuggestion({ user }) {
  const [prompt, setPrompt] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");
  const [accepted, setAccepted] = useState(false);
  const [saving, setSaving] = useState(false);


  const handleSubmit = async () => {
    if (!prompt.trim()) return;

    try {
      setLoading(true);
      setError("");
      setResult(null);
      setAccepted(false);

      const res = await API.post("/model-suggestions", {
        prompt
      });

      setResult(res.data);
    } catch (err) {
      setError("Failed to get model suggestions");
    } finally {
      setLoading(false);
    }
  };

  const acceptRecommendation = async () => {
  if (!result || accepted) return;

  try {
    setSaving(true);

    await API.post("/users/add-saved", {
      email: user.email,
      co2Saved: result.sustainabilityImpact.co2SavedKg
    });

    setAccepted(true);
  } catch (err) {
    alert("Failed to apply sustainability impact");
  } finally {
    setSaving(false);
  }
};


  function TaskUnderstanding({ data }) {
  return (
    <div className="bg-white p-6 rounded-xl shadow-sm mb-6">
      <h3 className="font-semibold mb-2">Task Understanding</h3>
      <p><strong>Intent:</strong> {data.intent}</p>
      <p><strong>Complexity:</strong> {data.complexity}</p>
      <p className="text-gray-600 mt-2">{data.explanation}</p>
    </div>
  );
}

    function RecommendedModel({ data }) {
        return (
            <div className="bg-green-100 border border-green-300 p-6 rounded-xl mb-6">
            <h3 className="font-semibold mb-2 text-green-800">
            Recommended Model
            </h3>
            <p className="text-lg font-bold">
                {data.name} ({data.provider})
            </p>

            <ul className="list-disc pl-6 mt-2 text-sm">
                {data.reason.map((r, i) => (
            <li key={i}>{r}</li>
            ))}
            </ul>
            </div>
        );
    }

    function ModelComparisonTable({ models }) {
  return (
    <div className="bg-white p-6 rounded-xl shadow-sm mb-6">
      <h3 className="font-semibold mb-4">Model Comparison</h3>

      <table className="w-full text-sm border">
        <thead className="bg-gray-100">
          <tr>
            <th className="p-2 border">Model</th>
            <th className="p-2 border">Energy (kWh)</th>
            <th className="p-2 border">CO₂ (kg)</th>
            <th className="p-2 border">Fit</th>
            <th className="p-2 border">Note</th>
          </tr>
        </thead>
        <tbody>
          {models.map((m, i) => (
            <tr
              key={i}
              className={m.overkill ? "bg-red-50" : ""}
            >
              <td className="p-2 border">{m.model}</td>
              <td className="p-2 border">{m.energyKwh}</td>
              <td className="p-2 border">{m.co2Kg}</td>
              <td className="p-2 border">{m.capabilityFit}</td>
              <td className="p-2 border">{m.note}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
function SustainabilityImpact({ impact }) {
  return (
    <div className="bg-white p-6 rounded-xl shadow-sm">
      <h3 className="font-semibold mb-2">Sustainability Impact</h3>
      <p>
        <strong>Energy Saved:</strong> {impact.energySavedKwh} kWh
      </p>
      <p>
        <strong>CO₂ Saved:</strong> {impact.co2SavedKg} kg
      </p>
      <p className="text-gray-500 text-sm mt-2">
        {impact.comparisonBasis}
      </p>
    </div>
  );
}


  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="max-w-5xl mx-auto px-6 py-10">
        <h2 className="text-2xl font-semibold mb-6">
          Model Sustainability Advisor
        </h2>

        {/* Prompt Input */}
        <div className="bg-white p-6 rounded-xl shadow-sm mb-8">
          <label className="block text-sm font-medium mb-2">
            What do you want to do with AI?
          </label>
          <textarea
            className="w-full border rounded-md p-3 mb-4"
            rows={3}
            placeholder="e.g. Write a professional email to a client"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
          />

          <button
            onClick={handleSubmit}
            className="bg-green-700 text-white px-4 py-2 rounded-md"
          >
            Analyze Sustainability
          </button>
        </div>

        {loading && <p>Analyzing models…</p>}
        {error && <p className="text-red-600">{error}</p>}

        {result && (
          <>
            <TaskUnderstanding data={result.taskUnderstanding} />
            <RecommendedModel data={result.recommendedModel} />
            <ModelComparisonTable models={result.modelComparisons} />
            <SustainabilityImpact impact={result.sustainabilityImpact} />
            {result && (
  <div className="mt-6 flex justify-end">
    <button
      onClick={acceptRecommendation}
      disabled={accepted || saving}
      className={`px-6 py-2 rounded-lg font-semibold transition-all
        ${
          accepted
            ? "bg-green-300 text-green-900 cursor-not-allowed"
            : "bg-green-700 hover:bg-green-800 text-white"
        }`}
    >
      {accepted
        ? "✔ Recommendation Applied"
        : saving
        ? "Applying..."
        : "Accept Recommendation"}
    </button>
  </div>
)}

          </>
        )}
      </div>
    </div>
  );
}

export default ModelSuggestion;
