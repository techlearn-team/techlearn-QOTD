import React from 'react';
import { motion } from 'framer-motion';
import { todaysQuestion } from '../data/question';

export default function QuestionCard() {
  const getDifficultyColor = (difficulty) => {
    switch (difficulty.toLowerCase()) {
      case 'easy':
        return 'bg-green-100 text-green-700 border-green-200';
      case 'medium':
        return 'bg-blue-100 text-blue-700 border-blue-200';
      case 'hard':
        return 'bg-red-100 text-red-700 border-red-200';
      default:
        return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      whileHover={{ y: -2 }}
      className="bg-white rounded-xl p-6 sm:p-8 shadow-soft-lg border border-border transition-all duration-300"
    >
      {/* Title and Difficulty */}
      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-6">
        <h3 className="text-2xl sm:text-3xl font-bold text-dark flex-1">
          {todaysQuestion.title}
        </h3>
        <span className={`px-4 py-2 rounded-xl text-sm font-semibold border ${getDifficultyColor(todaysQuestion.difficulty)} whitespace-nowrap`}>
          {todaysQuestion.difficulty}
        </span>
      </div>

      {/* Description */}
      <div className="mb-6">
        <h4 className="text-lg font-semibold text-dark mb-3">Problem Statement</h4>
        <p className="text-muted leading-relaxed">
          {todaysQuestion.description}
        </p>
      </div>

      {/* Examples */}
      <div className="mb-6">
        <h4 className="text-lg font-semibold text-dark mb-3">Examples</h4>
        <div className="space-y-4">
          {todaysQuestion.examples.map((example, index) => (
            <div key={index} className="bg-soft-bg rounded-xl p-4 border border-border">
              <div className="font-mono text-sm mb-2">
                <span className="text-muted">Input:</span>
                <span className="text-dark ml-2">{example.input}</span>
              </div>
              <div className="font-mono text-sm mb-2">
                <span className="text-muted">Output:</span>
                <span className="text-dark ml-2">{example.output}</span>
              </div>
              <div className="text-sm text-muted">
                <span className="font-medium">Explanation:</span> {example.explanation}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Constraints */}
      <div>
        <h4 className="text-lg font-semibold text-dark mb-3">Constraints</h4>
        <ul className="space-y-2">
          {todaysQuestion.constraints.map((constraint, index) => (
            <li key={index} className="flex items-start gap-2 text-muted">
              <span className="text-primary mt-1">•</span>
              <span className="font-mono text-sm">{constraint}</span>
            </li>
          ))}
        </ul>
      </div>
    </motion.div>
  );
}
