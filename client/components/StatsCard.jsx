import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function StatsCard() {
  const [stats, setStats] = useState(null);
  const [blocked, setBlocked] = useState(false);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/stats", {
          headers: {
            "x-user-id": "69876e1b50a617bdce92d4a3"
          }
        });

        // ✅ FREE USER → 403 is EXPECTED
        if (res.status === 403) {
          setBlocked(true);
          return;
        }

        if (!res.ok) {
          return;
        }

        const data = await res.json();
        setStats(data.stats);
      } catch (err) {
        // silently ignore
      }
    };

    fetchStats();
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white border rounded-xl p-4"
    >
      <h3 className="font-semibold text-lg mb-2">Your Stats</h3>

      {blocked && (
        <p className="text-sm text-muted">
          🔒 Upgrade to a paid plan to view stats.
        </p>
      )}

      {stats && (
        <div className="space-y-1 text-sm">
          <p>Problems Solved: {stats.totalSolved}</p>
          <p>Current Streak: {stats.currentStreak}</p>
          <p>Accuracy: {stats.accuracy}</p>
        </div>
      )}
    </motion.div>
  );
}
