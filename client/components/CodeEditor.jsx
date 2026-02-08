import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import OutputPanel from "./OutputPanel";

// ✅ REDUCED LANGUAGES
const LANGUAGES = ["Python", "Java"];

// ✅ REDUCED TEMPLATES
const TEMPLATES = {
  Python: "# Write your solution here\nprint('Hello QOTD')",
  Java: "// Write your solution here\nclass Solution {\n\n}"
};

export default function CodeEditor({ question, user }) {
  const [language, setLanguage] = useState("Python");
  const [code, setCode] = useState(TEMPLATES.Python);
  const [isRunning, setIsRunning] = useState(false);
  const [output, setOutput] = useState(null);
  const [showResults, setShowResults] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    setCode(TEMPLATES[language]);
  }, [language]);

  // ---------------- RUN ----------------
  const handleRunCode = async () => {
    if (!user) {
      setOutput({ type: "error", message: "User not authenticated", results: [] });
      setShowResults(true);
      return;
    }

    try {
      setIsRunning(true);
      setShowResults(true);

      const res = await fetch("http://localhost:5000/api/run", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-user-id": user._id
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
    if (!user) {
      setOutput({ type: "error", message: "User not authenticated", results: [] });
      setShowResults(true);
      return;
    }

    try {
      setIsRunning(true);
      setShowResults(true);

      const res = await fetch("http://localhost:5000/api/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-user-id": user._id
        },
        body: JSON.stringify({
          questionId: question._id,
          userOutput: question.sampleOutput
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
            disabled={isRunning || !user}
            className="flex-1 border border-primary text-primary py-2 rounded disabled:opacity-50"
          >
            Run
          </button>

          <button
            onClick={handleSubmit}
            disabled={isRunning || submitted || !user}
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
