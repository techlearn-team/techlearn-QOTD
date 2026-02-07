import React, { useState } from "react";
import { motion } from "framer-motion";

export default function ViewSolution({ questionId }) {
  const [solution, setSolution] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleViewSolution = async () => {
    try {
      setLoading(true);
      setError("");

      const res = await fetch(
        `http://localhost:5000/api/solution/${questionId}`,
        {
          headers: {
            "x-user-id": "mock-user-id" // 🔐 mock user for Round-2
          }
        }
      );

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Access denied");
        return;
      }

      setSolution(data.solution);
    } catch (err) {
      setError("Failed to fetch solution");
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white border rounded-xl p-4 space-y-3"
    >
      <h3 className="font-semibold text-lg">Official Solution</h3>

      {!solution && (
        <button
          onClick={handleViewSolution}
          disabled={loading}
          className="border border-primary text-primary px-4 py-2 rounded disabled:opacity-50"
        >
          {loading ? "Loading..." : "View Solution (Paid)"}
        </button>
      )}

      {error && (
        <p className="text-red-500 text-sm">
          {error}
        </p>
      )}

      {solution && (
        <pre className="bg-[#1e1e1e] text-white p-4 rounded text-sm overflow-auto">
{solution}
        </pre>
      )}
    </motion.div>
  );
}
