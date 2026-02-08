import React from "react";
import { motion } from "framer-motion";
import { Clock, Tag, Zap, Lock, Calendar } from "lucide-react";

export default function QuestionCard({ question }) {
  if (!question) return null;

  const getDifficultyColor = (difficulty = "easy") => {
    switch (difficulty.toLowerCase()) {
      case "easy":
        return "bg-green-50 text-green-700";
      case "medium":
        return "bg-blue-50 text-blue-700";
      case "hard":
        return "bg-red-50 text-red-700";
      default:
        return "bg-gray-50 text-gray-700";
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      whileHover={{ y: -2 }}
      className="bg-white rounded-xl p-6 sm:p-8 shadow-sm hover:shadow-md border border-border"
    >
      {/* Day & Date */}
      {(question.day || question.date) && (
        <div className="flex gap-2 mb-4">
          {question.day && (
            <span className="px-3 py-1 rounded-full text-xs bg-blue-100 text-blue-800">
              {question.day}
            </span>
          )}
          {question.date && (
            <span className="px-3 py-1 rounded-full text-xs bg-indigo-100 text-indigo-800 flex items-center gap-1">
              <Calendar className="w-3 h-3" />
              {question.date}
            </span>
          )}
        </div>
      )}

      {/* Title */}
      <h3 className="text-2xl sm:text-3xl font-bold text-dark mb-4">
        {question.title}
      </h3>

      {/* Metadata */}
      <div className="flex flex-wrap items-center gap-3 mb-6">
        <span
          className={`px-3 py-1 rounded-full text-xs font-medium ${getDifficultyColor(
            question.difficulty
          )}`}
        >
          {question.difficulty}
        </span>

        {question.topic && (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs bg-blue-50 text-blue-700">
            <Tag className="w-3 h-3" />
            {question.topic}
          </span>
        )}

        {question.timeToSolve && (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs bg-neutral-50 text-neutral-700">
            <Clock className="w-3 h-3" />
            {question.timeToSolve}
          </span>
        )}

        {question.xp && (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs bg-purple-50 text-purple-700">
            <Zap className="w-3 h-3" />+{question.xp} XP
          </span>
        )}

        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs bg-gray-100 text-gray-700">
          <Lock className="w-3 h-3" />
          Solution Locked
        </span>
      </div>

      {/* Problem Statement */}
      <div className="mb-6">
        <h4 className="text-lg font-semibold mb-3">Problem Statement</h4>
        <p className="text-muted leading-relaxed">
          {question.problemStatement}
        </p>
      </div>

      {/* Examples */}
      {Array.isArray(question.examples) && question.examples.length > 0 && (
        <div className="mb-6">
          <h4 className="text-lg font-semibold mb-3">Examples</h4>

          <div className="space-y-4">
            {question.examples.map((ex, index) => (
              <div
                key={index}
                className="bg-soft-bg rounded-xl p-4 border border-border"
              >
                <div className="font-mono text-sm mb-2">
                  <span className="text-muted">Input:</span>
                  <span className="ml-2">{ex.input}</span>
                </div>
                <div className="font-mono text-sm">
                  <span className="text-muted">Output:</span>
                  <span className="ml-2">{ex.output}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </motion.div>
  );
}
