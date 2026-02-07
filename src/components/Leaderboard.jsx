import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Trophy, Medal, Award } from "lucide-react";

export default function Leaderboard({ difficulty }) {
  const user = { type: "PAID" }; // change to FREE to test

  const [leaders, setLeaders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user.type !== "PAID") {
      setLoading(false);
      return;
    }

    fetch(`http://localhost:5000/api/leaderboard?difficulty=${difficulty}`)
      .then((res) => res.json())
      .then((data) => {
        setLeaders(data || []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [difficulty]);

  const getRankIcon = (rank) => {
    if (rank === 1) return <Trophy className="w-5 h-5 text-yellow-500" />;
    if (rank === 2) return <Medal className="w-5 h-5 text-gray-400" />;
    if (rank === 3) return <Award className="w-5 h-5 text-orange-600" />;
    return <span className="font-bold">#{rank}</span>;
  };

  return (
    <motion.div className="bg-white rounded-xl p-6 border">
      <h3 className="text-xl font-bold mb-4">Leaderboard</h3>

      {user.type !== "PAID" && !loading && (
        <p className="text-muted text-sm">
          Upgrade to a paid plan to appear on the leaderboard.
        </p>
      )}

      {user.type === "PAID" && (
        <>
          {loading && <p>Loading leaderboard…</p>}

          {!loading && leaders.length === 0 && (
            <p>No submissions yet today.</p>
          )}

          <div className="space-y-2 mt-4">
            {leaders.map((u, i) => (
              <div key={i} className="flex items-center gap-4 p-3 bg-soft-bg rounded">
                <div>{getRankIcon(i + 1)}</div>
                <div className="flex-1 font-semibold">{u.name}</div>
                <div>{u.score}</div>
              </div>
            ))}
          </div>
        </>
      )}
    </motion.div>
  );
}
