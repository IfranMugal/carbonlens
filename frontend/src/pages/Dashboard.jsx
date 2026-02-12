import React, { useEffect, useState } from "react";
import {
  FireIcon,
  SparklesIcon,
  GlobeAltIcon,
  StarIcon,
} from "@heroicons/react/24/solid";
import API from "../services/api";

function Dashboard({ user }) {
  const [emitted, setEmitted] = useState(0);
  const [saved, setSaved] = useState(0);
  const [showTrees, setShowTrees] = useState(false);

  useEffect(() => {
    const load = async () => {
      const res = await API.get(`/users/profile?email=${user.email}`);
      setEmitted(res.data.totalCO2Emitted);
      setSaved(res.data.totalCO2Saved);
    };
    load();
  }, [user.email]);

  const trees = (saved / 21).toFixed(2);
  const points = (saved * 10).toFixed(1);

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-8">
      {/* Header */}
      <div className="bg-white rounded-2xl p-6 shadow-sm flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
            Welcome back, {user.name}
            <button
              onClick={() => setShowTrees(true)}
              className="text-2xl hover:scale-110 transition"
              title="View trees saved"
            >
              🌱
            </button>
          </h2>
          <p className="mt-1 text-sm text-gray-500">
            Here’s how your actions are impacting the planet
          </p>
        </div>

        <div className="mt-4 sm:mt-0 text-sm text-green-700 font-medium">
          CarbonLensAI Dashboard
        </div>
      </div>

      {/* Stats */}
      <div>
        <h3 className="text-lg font-semibold text-gray-800 mb-4">
          Sustainability Overview
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatCard
            icon={<FireIcon className="h-6 w-6" />}
            title="CO₂ Emitted"
            value={`${emitted} kg`}
            description="Total emissions recorded"
          />
          <StatCard
            icon={<SparklesIcon className="h-6 w-6" />}
            title="CO₂ Saved"
            value={`${saved} kg`}
            description="Through sustainable choices"
          />
          <StatCard
            icon={<GlobeAltIcon className="h-6 w-6" />}
            title="Trees Saved"
            value={trees}
            description="Equivalent trees preserved"
          />
          <StatCard
            icon={<StarIcon className="h-6 w-6" />}
            title="Points"
            value={points}
            description="Your sustainability score"
          />
        </div>
      </div>

      {/* Insight Section */}
      <div className="bg-green-50 border border-green-100 rounded-2xl p-6">
        <h4 className="text-md font-semibold text-green-900">
          🌍 Your Impact
        </h4>
        <p className="mt-2 text-sm text-green-800 max-w-3xl">
          By reducing <strong>{saved} kg</strong> of CO₂ emissions, you’ve made a
          measurable contribution toward a cleaner environment. Keep making
          mindful choices — small actions add up to real change.
        </p>
      </div>

      {/* Trees Popup */}
      {showTrees && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <div className="bg-white rounded-2xl p-6 w-full max-w-sm shadow-xl relative animate-fadeIn">
            <button
              onClick={() => setShowTrees(false)}
              className="absolute top-3 right-3 text-gray-400 hover:text-gray-600"
            >
              ✕
            </button>

            <div className="text-center">
              <div className="text-4xl mb-2">🌳</div>
              <h3 className="text-lg font-semibold text-gray-900">
                Trees Saved
              </h3>
              <p className="mt-2 text-3xl font-bold text-green-700">
                {trees}
              </p>
              <p className="mt-2 text-sm text-gray-500">
                Based on your CO₂ savings so far.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function StatCard({ icon, title, value, description }) {
  return (
    <div className="bg-white rounded-2xl shadow-sm p-5 flex flex-col gap-3 hover:shadow-md transition">
      <div className="flex items-center gap-3 text-green-700">
        {icon}
        <span className="font-medium">{title}</span>
      </div>
      <div className="text-2xl font-bold text-gray-800">{value}</div>
      <p className="text-sm text-gray-500">{description}</p>
    </div>
  );
}

export default Dashboard;
