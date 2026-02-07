import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import OutputPanel from "./OutputPanel";

// ✅ SINGLE SOURCE OF TRUTH
const USER_ID = "69876e1b50a617bdce92d4a3";

const LANGUAGES = [
  "JavaScript",
  "Python",
  "Python3",
  "Java",
  "C++",
  "C",
  "C#",
  "TypeScript"
];

const TEMPLATES = {
  JavaScript: "// Write your solution here\nconsole.log('Hello QOTD');",
  Python: "# Execution simulated\nprint('Hello QOTD')",
  Python3: "# Execution simulated\nprint('Hello QOTD')",
  Java: "// Execution simulated\nclass Solution {}",
  "C++": "// Execution simulated\n#include <bits/stdc++.h>",
  C: "// Execution simulated\n#include <stdio.h>",
  "C#": "// Execution simulated\nclass Solution {}",
  TypeScript: "// Execution simulated\nconsole.log('Hello QOTD');"
};

export default function CodeEditor({ question }) {
  const [language, setLanguage] = useState("JavaScript");
  const [code, setCode] = useState(TEMPLATES.JavaScript);
  const [isRunning, setIsRunning] = useState(false);
  const [output, setOutput] = useState(null);
  const [showResults, setShowResults] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    setCode(TEMPLATES[language]);
  }, [language]);

  // ---------------- RUN ----------------
  const handleRunCode = async () => {
    try {
      setIsRunning(true);
      setShowResults(true);

      const res = await fetch("http://localhost:5000/api/run", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-user-id": USER_ID
        },
        body: JSON.stringify({
          language,
          code,
          questionId: question._id
        })
      });

      const data = await res.json();

      if (!res.ok) {
        setOutput({
          type: "error",
          message: data.error || "Run failed",
          results: []
        });
        return;
      }

      setOutput({
        type: "success",
        message: "Run successful",
        results: data.results || []
      });
    } catch {
      setOutput({
        type: "error",
        message: "Server error during run",
        results: []
      });
    } finally {
      setIsRunning(false);
    }
  };

  // ---------------- SUBMIT ----------------
  const handleSubmit = async () => {
    if (submitted) return;

    try {
      setIsRunning(true);
      setShowResults(true);

      const res = await fetch("http://localhost:5000/api/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-user-id": USER_ID   // ✅ FIXED
        },
        body: JSON.stringify({
          questionId: question._id,
          userOutput: question.sampleOutput // mock evaluation
        })
      });

      const data = await res.json();

      if (!res.ok) {
        setOutput({
          type: "error",
          message: data.message || "Submission failed",
          results: []
        });
        return;
      }

      setSubmitted(true);
      setOutput({
        type: data.success ? "success" : "error",
        message: data.message,
        results: [
          {
            input: question.sampleInput,
            output: question.sampleOutput,
            passed: data.success
          }
        ]
      });
    } catch {
      setOutput({
        type: "error",
        message: "Server error during submission",
        results: []
      });
    } finally {
      setIsRunning(false);
    }
  };

  return (
    <div className="space-y-6">
      <motion.div className="bg-white rounded-xl border overflow-hidden">
        <div className="p-4 flex justify-between items-center bg-soft-bg border-b">
          <h3 className="font-semibold">Code Editor</h3>

          <select
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
            className="border rounded px-3 py-1"
          >
            {LANGUAGES.map((lang) => (
              <option key={lang}>{lang}</option>
            ))}
          </select>
        </div>

        <textarea
          value={code}
          onChange={(e) => setCode(e.target.value)}
          className="w-full min-h-[300px] p-4 font-mono bg-[#1e1e1e] text-white"
        />

        <div className="p-4 flex gap-3 bg-soft-bg border-t">
          <button
            onClick={handleRunCode}
            disabled={isRunning}
            className="flex-1 border border-primary text-primary py-2 rounded disabled:opacity-50"
          >
            Run
          </button>

          <button
            onClick={handleSubmit}
            disabled={isRunning || submitted}
            className="flex-1 bg-primary text-white py-2 rounded disabled:opacity-50"
          >
            {submitted ? "Submitted" : "Submit"}
          </button>
        </div>
      </motion.div>

      {showResults && output && <OutputPanel output={output} />}
    </div>
  );
}
