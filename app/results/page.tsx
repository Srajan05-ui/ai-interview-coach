"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

type EvaluationItem = {
  question: string;
  answer: string;
  score: number;
  feedback: string;
  strengths?: string[] | string;
  improvements?: string[] | string;
  weak_areas?: string[] | string;
};

export default function ResultsPage() {
  const [results, setResults] = useState<EvaluationItem[]>([]);

 useEffect(() => {
  const storedResults = localStorage.getItem("evaluationResults");

  if (storedResults) {
    const parsedResults = JSON.parse(storedResults);

    Promise.resolve().then(() => {
      setResults(parsedResults);
    });
  }
}, []);
  const averageScore =
    results.length > 0
      ? Math.round(
          results.reduce((total, item) => total + Number(item.score || 0), 0) /
            results.length
        )
      : 0;

  const interviewScore = averageScore * 10;

  const allStrengths = Array.from(
    new Set(
      results.flatMap((item) => {
        return Array.isArray(item.strengths)
          ? item.strengths
          : item.strengths
          ? [item.strengths]
          : [];
      })
    )
  );

  const allImprovements = Array.from(
    new Set(
      results.flatMap((item) => {
        const improvements = Array.isArray(item.improvements)
          ? item.improvements
          : item.improvements
          ? [item.improvements]
          : [];

        const weakAreas = Array.isArray(item.weak_areas)
          ? item.weak_areas
          : item.weak_areas
          ? [item.weak_areas]
          : [];

        return [...improvements, ...weakAreas];
      })
    )
  );

  
  

  return (
    <main className="min-h-screen bg-[#050816] text-white p-8 relative overflow-hidden">
      <div className="absolute top-0 left-0 h-96 w-96 rounded-full bg-blue-500/20 blur-[130px]" />
      <div className="absolute bottom-0 right-0 h-96 w-96 rounded-full bg-cyan-400/20 blur-[130px]" />

      <div className="max-w-6xl mx-auto relative z-10">
        <div className="flex justify-between items-center mb-10">
          <div>
            <h1 className="text-4xl font-bold">📊 Interview Results</h1>
            <p className="text-gray-400 mt-2">
              Your MockMate AI performance summary and improvement plan.
            </p>
          </div>
          
      

          <Link
            href="/"
            className="bg-white/10 px-4 py-2 rounded-xl hover:bg-white/20"
          >
            ← Dashboard
          </Link>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
            <p className="text-gray-400 text-sm">Technical Score</p>
            <h2 className="text-5xl font-bold text-cyan-300 mt-2">
              {interviewScore}
            </h2>
          </div>

          <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
            <p className="text-gray-400 text-sm">Questions Evaluated</p>
            <h2 className="text-5xl font-bold text-blue-400 mt-2">
              {results.length}
            </h2>
          </div>

          <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
            <p className="text-gray-400 text-sm">Status</p>
            <h2 className="text-3xl font-bold text-cyan-300 mt-4">
              {results.length > 0 ? "Completed" : "Pending"}
            </h2>
          </div>
        </div>

        <div className="bg-white/5 border border-white/10 rounded-3xl p-8 mb-8">
          <p className="text-gray-400">Interview Score</p>
          <h2 className="text-7xl font-bold text-cyan-300 mt-3">
            {interviewScore}/100
          </h2>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 mb-8">
          <div className="bg-white/5 border border-white/10 rounded-3xl p-8">
            <h3 className="text-2xl font-semibold mb-4">
              Performance Analysis
            </h3>

            <div className="space-y-4">
  {results.map((item, index) => (
    <div
      key={index}
      className="bg-white/5 border border-white/10 rounded-2xl p-4"
    >
      <h4 className="font-semibold text-cyan-300 mb-2">
        Question {index + 1}
      </h4>

      <p className="text-gray-300 text-sm leading-7">
        {item.feedback || "No feedback received."}
      </p>
    </div>
  ))}
</div>
          </div>

          <div className="bg-white/5 border border-white/10 rounded-3xl p-8">
            <h3 className="text-2xl font-semibold mb-4">Key Strengths</h3>

            <div className="flex flex-wrap gap-3">
              {allStrengths.length > 0 ? (
                allStrengths.map((strength, index) => (
                  <span
                    key={index}
                    className="bg-cyan-500/20 px-4 py-2 rounded-full"
                  >
                    {strength}
                  </span>
                ))
              ) : (
                <p className="text-gray-400">No strengths available yet.</p>
              )}
            </div>
          </div>
        </div>

        <div className="bg-white/5 border border-white/10 rounded-3xl p-8 mb-8">
          <h3 className="text-2xl font-semibold mb-4">
            Areas for Improvement
          </h3>

          <div className="flex flex-wrap gap-3">
            {allImprovements.length > 0 ? (
              allImprovements.map((item, index) => (
                <span
                  key={index}
                  className="bg-red-500/20 px-4 py-2 rounded-full"
                >
                  {item}
                </span>
              ))
            ) : (
              <p className="text-gray-400">
                No improvement areas available yet.
              </p>
            )}
          </div>
        </div>

        <div className="bg-white/5 border border-white/10 rounded-3xl p-8">
          <h3 className="text-2xl font-semibold mb-5">
            Personalized Learning Plan
          </h3>

          <div className="space-y-4">
            {allImprovements.length > 0 ? (
              allImprovements.slice(0, 5).map((item, index) => (
                <div key={index} className="bg-white/5 p-4 rounded-xl">
                  ✅ Practice and improve: {item}
                </div>
              ))
            ) : (
              <div className="bg-white/5 p-4 rounded-xl">
                ✅ Complete an interview to generate a personalized learning
                plan.
              </div>
            )}
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 mt-8">
          <Link
            href="/learning-plan"
            className="inline-block bg-gradient-to-r from-blue-500 to-cyan-400 px-8 py-4 rounded-2xl font-bold shadow-lg shadow-cyan-500/40 hover:scale-105 transition-all text-center"
          >
            Generate Learning Roadmap →
          </Link>

          <Link
            href="/history"
            className="inline-block bg-white/10 px-8 py-4 rounded-2xl font-bold hover:bg-white/20 text-center"
          >
            View History
          </Link>
        </div>
      </div>
    </main>
  );
}