import React from "react";

function Landing({ onLoginClick }) {
  return (
    <div className="w-full overflow-x-hidden">

      {/* HERO WITH BACKGROUND */}
      <section
        className="relative h-screen flex items-center justify-center text-center text-white bg-fixed bg-center bg-cover"
        style={{
          backgroundImage: "url('/ai-bg.jpg')",
        }}
      >
        {/* Overlay */}
        <div className="absolute inset-0 bg-black/60"></div>

        <div className="relative z-10 px-6 max-w-4xl">
          <h1 className="text-5xl md:text-6xl font-extrabold leading-tight mb-6 animate-fadeIn">
            Optimize AI. Reduce Cost. Minimize Carbon.
          </h1>

          <p className="text-lg md:text-xl opacity-90 mb-8">
            CarbonLensAI enables enterprises to measure, simulate, and reduce
            the financial and environmental footprint of Generative AI systems.
          </p>

          <button
            onClick={onLoginClick}
            className="bg-green-600 hover:bg-green-700 px-10 py-4 rounded-xl text-lg font-semibold shadow-xl transition transform hover:scale-105"
          >
            Login to Platform
          </button>
        </div>
      </section>

      {/* FEATURES SECTION */}
      <section className="py-24 bg-gradient-to-b from-white to-green-50">
        <div className="max-w-6xl mx-auto px-6 text-center">

          <h2 className="text-4xl font-bold text-green-900 mb-14">
            A Complete Sustainability Stack for AI
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-10">
            <FeatureCard
              title="Prompt Optimization"
              description="Reduce unnecessary token usage before execution."
            />
            <FeatureCard
              title="Model Advisor"
              description="Select the most energy-efficient AI model."
            />
            <FeatureCard
              title="Batch Processing"
              description="Simulate workload consolidation for cost reduction."
            />
            <FeatureCard
              title="Cost & Carbon Analytics"
              description="Visualize real-time environmental and financial impact."
            />
          </div>
        </div>
      </section>

      {/* ENTERPRISE IMPACT */}
      <section className="py-24 bg-green-900 text-white text-center relative">
        <div className="max-w-5xl mx-auto px-6">
          <h2 className="text-4xl font-bold mb-6">
            Built for Enterprise Scale
          </h2>

          <p className="opacity-90 mb-12 text-lg">
            Align AI innovation with sustainability strategy and operational efficiency.
          </p>

          <div className="grid md:grid-cols-3 gap-8">
            <ImpactCard title="Operational Cost Reduction" value="Up to 15%" />
            <ImpactCard title="Carbon Emission Reduction" value="10–20%" />
            <ImpactCard title="Improved Compute Utilization" value="Optimized" />
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="py-24 text-center bg-gradient-to-br from-green-50 to-white">
        <h2 className="text-4xl font-bold text-green-900 mb-8">
          Start Optimizing Your AI Infrastructure
        </h2>

        <button
          onClick={onLoginClick}
          className="bg-green-800 hover:bg-green-900 text-white px-12 py-4 rounded-xl text-lg font-semibold shadow-lg transition transform hover:scale-105"
        >
          Access Platform
        </button>
      </section>
    </div>
  );
}

function FeatureCard({ title, description }) {
  return (
    <div className="bg-white/80 backdrop-blur-md p-6 rounded-2xl shadow-md hover:shadow-2xl transition transform hover:-translate-y-2">
      <h3 className="text-lg font-semibold text-green-900 mb-3">
        {title}
      </h3>
      <p className="text-gray-600 text-sm">{description}</p>
    </div>
  );
}

function ImpactCard({ title, value }) {
  return (
    <div className="bg-green-800/80 backdrop-blur-md p-6 rounded-2xl shadow-md">
      <p className="text-sm opacity-80 mb-2">{title}</p>
      <p className="text-3xl font-bold">{value}</p>
    </div>
  );
}

export default Landing;
