import React, { useState } from "react";

function Login({ onLogin }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!email) return alert("Email required");

    const user = { name, email };
    localStorage.setItem("user", JSON.stringify(user));
    onLogin(user);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-100 to-slate-200">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8">
        <h2 className="text-2xl font-bold text-center text-gray-900">
          CarbonLensAI
        </h2>
        <p className="mt-2 text-sm text-center text-gray-500">
          Sign in to access your dashboard
        </p>

        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <div>
            <input
              type="text"
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm focus:border-gray-900 focus:ring-1 focus:ring-gray-900 outline-none"
            />
          </div>

          <div>
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm focus:border-gray-900 focus:ring-1 focus:ring-gray-900 outline-none"
            />
          </div>

          <button
            type="submit"
            className="w-full rounded-lg bg-gray-900 px-4 py-2.5 text-sm font-semibold text-white hover:bg-gray-800 transition"
          >
            Continue
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;
