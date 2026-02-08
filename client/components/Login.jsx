import React, { useState } from "react";

export default function Login({ onLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email || !password) return;
    onLogin({ email });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-soft-bg">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-xl border w-full max-w-md space-y-4"
      >
        <h1 className="text-2xl font-bold text-center">TechLearn Login</h1>

        <input
          type="email"
          placeholder="Email"
          className="w-full border px-4 py-2 rounded"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full border px-4 py-2 rounded"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button
          type="submit"
          className="w-full bg-primary text-white py-2 rounded"
        >
          Login
        </button>
      </form>
    </div>
  );
}
