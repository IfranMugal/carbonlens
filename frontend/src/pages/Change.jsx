import { useState } from "react";
import API from "../services/api";
import React from "react";

function Change({ user }) {
  const [emitted, setEmitted] = useState("");
  const [saved, setSaved] = useState("");

  const addEmitted = async () => {
    await API.post("/users/add-emitted", {
      email: user.email,
      co2Emitted: emitted
    });
    setEmitted("");
  };

  const addSaved = async () => {
    await API.post("/users/add-saved", {
      email: user.email,
      co2Saved: saved
    });
    setSaved("");
  };

  return (
    <div className="p-8 max-w-xl mx-auto space-y-6">
      <Form
        label="Add CO₂ Emitted"
        value={emitted}
        setValue={setEmitted}
        onSubmit={addEmitted}
      />

      <Form
        label="Add CO₂ Saved"
        value={saved}
        setValue={setSaved}
        onSubmit={addSaved}
      />
    </div>
  );
}

function Form({ label, value, setValue, onSubmit }) {
  return (
    <div className="bg-white p-6 rounded-xl shadow-md">
      <h3 className="font-semibold mb-3">{label}</h3>
      <input
        type="number"
        className="w-full border p-2 rounded mb-3"
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
      <button
        onClick={onSubmit}
        className="w-full bg-green-700 text-white py-2 rounded"
      >
        Submit
      </button>
    </div>
  );
}

export default Change;
