"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function ResumeAnalysisPage() {
  const [loading, setLoading] = useState(true);
  const [analysis, setAnalysis] = useState<any>(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const analyzeResume = async () => {
      try {
        const resumeText = localStorage.getItem("resumeText");

        if (!resumeText) {
          setError("No resume found. Please upload a resume first.");
          setLoading(false);
          return;
        }

        const response = await fetch("/api/resume-analysis", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            resumeText,
          }),
        });

        const data = await response.json();

        if (!data.success) {
          setError(data.error || "Analysis failed");
          setLoading(false);
          return;
        }

        setAnalysis(data.data);
        const questionResponse = await fetch("/api/generate-questions", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    skills: data.data.skills,
  }),
});

const questionData = await questionResponse.json();

localStorage.setItem(
  "questions",
  JSON.stringify(questionData.questions)
);

console.log("Generated Questions:", questionData.questions);
      } catch (err) {
        console.error(err);
        setError("Failed to analyze resume");
      }

      setLoading(false);
    };

    analyzeResume();
  }, []);

  if (loading) {
    return (
      <main className="min-h-screen bg-[#050816] text-white flex items-center justify-center">
        <h1 className="text-3xl font-bold">
          Analyzing Resume...
        </h1>
      </main>
    );
  }

  if (error) {
    return (
      <main className="min-h-screen bg-[#050816] text-white flex flex-col items-center justify-center gap-4">
        <h1 className="text-2xl text-red-400">{error}</h1>

        <Link
          href="/"
          className="bg-cyan-500 px-6 py-3 rounded-xl"
        >
          Go Back
        </Link>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#050816] text-white p-8">
      <div className="max-w-6xl mx-auto">

        <div className="flex justify-between items-center mb-10">
          <div>
            <h1 className="text-4xl font-bold">
              📄 Resume Analysis
            </h1>

            <p className="text-gray-400 mt-2">
              AI generated analysis of your resume
            </p>
          </div>

          <Link
            href="/"
            className="bg-white/10 px-4 py-2 rounded-xl"
          >
            ← Dashboard
          </Link>
        </div>

        <div className="bg-white/5 border border-white/10 rounded-3xl p-8 mb-8">
          <h2 className="text-2xl font-bold mb-4">
            Resume Summary
          </h2>

          <p className="text-gray-300">
            {analysis.summary}
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-8">

          <div className="bg-white/5 border border-white/10 rounded-3xl p-8">
            <h2 className="text-2xl font-bold mb-4">
              Skills
            </h2>

            <div className="flex flex-wrap gap-3">
              {analysis.skills?.map(
                (skill: string, index: number) => (
                  <span
                    key={index}
                    className="bg-cyan-500/20 px-4 py-2 rounded-full"
                  >
                    {skill}
                  </span>
                )
              )}
            </div>
          </div>

          <div className="bg-white/5 border border-white/10 rounded-3xl p-8">
            <h2 className="text-2xl font-bold mb-4">
              Strengths
            </h2>

            <ul className="space-y-2">
              {analysis.strengths?.map(
                (item: string, index: number) => (
                  <li key={index}>
                    ✅ {item}
                  </li>
                )
              )}
            </ul>
          </div>

        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-8">

          <div className="bg-white/5 border border-white/10 rounded-3xl p-8">
            <h2 className="text-2xl font-bold mb-4">
              Weaknesses
            </h2>

            <ul className="space-y-2">
              {analysis.weaknesses?.map(
                (item: string, index: number) => (
                  <li key={index}>
                    ⚠️ {item}
                  </li>
                )
              )}
            </ul>
          </div>

          <div className="bg-white/5 border border-white/10 rounded-3xl p-8">
            <h2 className="text-2xl font-bold mb-4">
              Suggestions
            </h2>

            <ul className="space-y-2">
              {analysis.suggestions?.map(
                (item: string, index: number) => (
                  <li key={index}>
                    🚀 {item}
                  </li>
                )
              )}
            </ul>
          </div>

        </div>

        <div className="flex gap-4">

          <Link
            href="/interview"
            className="bg-gradient-to-r from-blue-500 to-cyan-400 px-8 py-4 rounded-2xl font-bold"
          >
            Generate Interview Questions →
          </Link>

          <Link
            href="/"
            className="bg-white/10 px-8 py-4 rounded-2xl font-bold"
          >
            Upload Another Resume
          </Link>

        </div>

      </div>
    </main>
  );
}