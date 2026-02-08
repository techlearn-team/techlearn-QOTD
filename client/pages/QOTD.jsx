import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import Hero from "../components/Hero";
import QuestionCard from "../components/QuestionCard";
import CodeEditor from "../components/CodeEditor";
import HintBox from "../components/HintBox";
import Leaderboard from "../components/Leaderboard";
import SubscribeCTA from "../components/SubscribeCTA";
import ViewSolution from "../components/ViewSolution";
import StatsCard from "../components/StatsCard";

export default function QOTD() {
  const [question, setQuestion] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchQOTD = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/qotd");
        const data = await res.json();
        setQuestion(data);
      } catch (err) {
        console.error("Failed to fetch QOTD", err);
      } finally {
        setLoading(false);
      }
    };

    fetchQOTD();
  }, []);

  if (loading) {
    return <div className="p-8">Loading Question...</div>;
  }

  if (!question) {
    return <div className="p-8 text-red-500">Failed to load question</div>;
  }

  return (
    <div className="min-h-screen bg-soft-bg">
      <Header />
      <Hero />

      <main className="max-w-7xl mx-auto px-4 py-8 space-y-8">
        <QuestionCard question={question} />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <CodeEditor question={question} />
          </div>

          <div className="space-y-8">
            <HintBox question={question} />
            <Leaderboard difficulty={question.difficulty} />

            {/* 🔐 Paid-only features */}
            <ViewSolution questionId={question._id} />
            <StatsCard />
          </div>
        </div>

        <SubscribeCTA />
      </main>
    </div>
  );
}
