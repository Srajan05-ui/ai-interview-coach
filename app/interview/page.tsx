"use client";

import { useState } from "react";
import Link from "next/link";

export default function InterviewPage() {
  const questions = [
    "Explain the difference between React and Next.js.",
    "What are React Hooks?",
    "What is Server Side Rendering?",
    "What is TypeScript and why is it useful?",
    "Explain the Virtual DOM.",
  ];

  const [currentQuestion, setCurrentQuestion] = useState(0);

  const [answers, setAnswers] = useState<string[]>(
    Array(questions.length).fill("")
  );

  const nextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    }
  };

  const previousQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const handleAnswerChange = (
    e: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    const updatedAnswers = [...answers];
    updatedAnswers[currentQuestion] = e.target.value;
    setAnswers(updatedAnswers);
  };

  const submitInterview = () => {
    console.log("All Answers:", answers);
    alert("Interview Submitted! Check browser console.");
  };

  return (
    <main className="min-h-screen bg-[#0A0A0A] text-white p-8">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-10">
          <div>
            <h1 className="text-4xl font-bold">
              🎤 AI Interview Session
            </h1>

            <p className="text-gray-400 mt-2">
              Answer the questions as if you are in a real interview.
            </p>
          </div>

          <Link
            href="/"
            className="bg-white/10 px-4 py-2 rounded-xl hover:bg-white/20"
          >
            ← Dashboard
          </Link>
        </div>

        {/* Stats */}
        <div className="grid md:grid-cols-3 gap-4 mb-8">
          <div className="bg-white/5 border border-white/10 rounded-2xl p-5">
            <p className="text-gray-400 text-sm">
              Question Number
            </p>

            <h3 className="text-3xl font-bold">
              {currentQuestion + 1} / {questions.length}
            </h3>
          </div>

          <div className="bg-white/5 border border-white/10 rounded-2xl p-5">
            <p className="text-gray-400 text-sm">
              Category
            </p>

            <h3 className="text-3xl font-bold">
              Frontend
            </h3>
          </div>

          <div className="bg-white/5 border border-white/10 rounded-2xl p-5">
            <p className="text-gray-400 text-sm">
              Time Left
            </p>

            <h3 className="text-3xl font-bold">
              15:00
            </h3>
          </div>
        </div>

        {/* Question Card */}
        <div className="bg-white/5 border border-white/10 rounded-3xl p-8 mb-8">
          <p className="text-sm text-blue-400 mb-3">
            Technical Question
          </p>

          <h2 className="text-2xl font-semibold">
            {questions[currentQuestion]}
          </h2>
        </div>

        {/* Answer Section */}
        <div className="bg-white/5 border border-white/10 rounded-3xl p-8">
          <label className="block mb-4 text-lg font-medium">
            Your Answer
          </label>

          <textarea
            value={answers[currentQuestion]}
            onChange={handleAnswerChange}
            placeholder="Type your answer here..."
            className="w-full h-56 bg-black/30 border border-white/10 rounded-2xl p-4 outline-none"
          />

          <div className="flex justify-between mt-6">
            <button
              onClick={previousQuestion}
              className="bg-white/10 px-6 py-3 rounded-xl hover:bg-white/20"
            >
              ← Previous
            </button>

            <div className="space-x-4">
              <button
                onClick={nextQuestion}
                className="bg-blue-500 px-6 py-3 rounded-xl hover:bg-blue-600"
              >
                Next →
              </button>

              <button
                onClick={submitInterview}
                className="bg-gradient-to-r from-blue-500 to-purple-500 px-6 py-3 rounded-xl font-semibold"
              >
                Submit Interview
              </button>
            </div>
          </div>
        </div>

        {/* Debug Panel */}
        <div className="mt-8 bg-white/5 border border-white/10 rounded-3xl p-6">
          <h3 className="text-xl font-semibold mb-4">
            Stored Answers (Debug)
          </h3>

          <pre className="text-sm text-gray-300 whitespace-pre-wrap">
            {JSON.stringify(answers, null, 2)}
          </pre>
        </div>
      </div>
    </main>
  );
}