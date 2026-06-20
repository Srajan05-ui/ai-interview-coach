"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function InterviewPage() {
  const [questions, setQuestions] = useState<string[]>([]);

const [currentQuestion, setCurrentQuestion] = useState(0);

const [answers, setAnswers] = useState<string[]>([]);

useEffect(() => {
  const storedQuestions =
    localStorage.getItem("questions");

  if (storedQuestions) {
    const parsedQuestions =
      JSON.parse(storedQuestions);

    setQuestions(parsedQuestions);

    setAnswers(
      Array(parsedQuestions.length).fill("")
    );
  }
}, []);

  

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
  if (questions.length === 0) {
  return (
    <main className="min-h-screen bg-[#050816] text-white flex items-center justify-center">
      <h1 className="text-3xl font-bold">
        No Questions Generated Yet
      </h1>
    </main>
  );
}

  return (
    <main className="min-h-screen bg-[#050816] text-white p-8 relative overflow-hidden">
      <div className="absolute top-0 left-0 h-96 w-96 rounded-full bg-blue-500/20 blur-[130px]" />
      <div className="absolute bottom-0 right-0 h-96 w-96 rounded-full bg-cyan-400/20 blur-[130px]" />

      <div className="max-w-5xl mx-auto relative z-10">
        <div className="flex justify-between items-center mb-10">
          <div>
            <h1 className="text-4xl font-bold">
              🎤 MockMate Interview Session
            </h1>
            <p className="text-gray-400 mt-2">
              Practice with AI-generated questions tailored to your resume.
            </p>
          </div>

          <Link
            href="/"
            className="bg-white/10 px-4 py-2 rounded-xl hover:bg-white/20"
          >
            ← Dashboard
          </Link>
        </div>

        <div className="grid md:grid-cols-3 gap-4 mb-8">
          <div className="bg-white/5 border border-white/10 rounded-2xl p-5">
            <p className="text-gray-400 text-sm">Question Number</p>
            <h3 className="text-3xl font-bold">
              {currentQuestion + 1} / {questions.length}
            </h3>
          </div>

          <div className="bg-white/5 border border-white/10 rounded-2xl p-5">
            <p className="text-gray-400 text-sm">Category</p>
            <h3 className="text-3xl font-bold">Resume-Based</h3>
          </div>

          <div className="bg-white/5 border border-white/10 rounded-2xl p-5">
            <p className="text-gray-400 text-sm">Time Left</p>
            <h3 className="text-3xl font-bold">15:00</h3>
          </div>
        </div>

        <div className="bg-white/5 border border-white/10 rounded-3xl p-8 mb-8">
          <p className="text-sm text-cyan-300 mb-3">
            Resume-Based Question
          </p>
          <h2 className="text-2xl font-semibold">
            {questions[currentQuestion]}
          </h2>
        </div>

        <div className="bg-white/5 border border-white/10 rounded-3xl p-8">
          <label className="block mb-4 text-lg font-medium">
            Your Response
          </label>

          <textarea
            value={answers[currentQuestion]}
            onChange={handleAnswerChange}
            placeholder="Type your response here..."
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
                className="bg-gradient-to-r from-blue-500 to-cyan-400 px-6 py-3 rounded-xl font-semibold shadow-lg shadow-cyan-500/30 hover:scale-105 transition-all"
              >
                Submit Interview
              </button>
            </div>
          </div>
        </div>

        <div className="mt-8 bg-white/5 border border-white/10 rounded-3xl p-6">
          <h3 className="text-xl font-semibold mb-4">
            Stored Responses
          </h3>
          <pre className="text-sm text-gray-300 whitespace-pre-wrap">
            {JSON.stringify(answers, null, 2)}
          </pre>
        </div>
      </div>
    </main>
  );
}