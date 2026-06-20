"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

type ResumeAnalysis = {
  skills?: string[];
  experience?: string;
  strengths?: string[];
  summary?: string;
  weaknesses?: string[];
  suggestions?: string[];
};

export default function ResumeAnalysisPage() {
  const router = useRouter();

  const [analysis, setAnalysis] = useState<ResumeAnalysis | null>(null);
  const [loadingQuestions, setLoadingQuestions] = useState(false);

  useEffect(() => {
    const storedAnalysis = localStorage.getItem("resumeAnalysis");

    if (storedAnalysis) {
      setAnalysis(JSON.parse(storedAnalysis));
    }
  }, []);

  const generateQuestions = async () => {
    const skillsForQuestions =
  analysis?.skills && analysis.skills.length > 0
    ? analysis.skills
    : ["React", "Next.js", "TypeScript", "Tailwind CSS"];

    try {
      setLoadingQuestions(true);

      const response = await fetch("/api/generate-questions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          skills: skillsForQuestions,
        }),
      });

      const data = await response.json();

      localStorage.setItem(
        "interviewQuestions",
        JSON.stringify(data.questions || [])
      );

      router.push("/interview");
    } catch (error) {
      console.error(error);
      alert("Failed to generate questions.");
    } finally {
      setLoadingQuestions(false);
    }
  };

  const skills = analysis?.skills || [
    "React",
    "Next.js",
    "TypeScript",
    "Tailwind CSS",
  ];

  const strengths = analysis?.strengths || [
    "Good frontend fundamentals",
    "Strong UI development skills",
    "Beginner-friendly project experience",
  ];

  const summary =
    analysis?.summary ||
    "Your resume shows interest in frontend development and modern web technologies. MockMate AI will use these skills to generate personalized interview questions.";

  return (
    <main className="min-h-screen bg-[#050816] text-white p-8 relative overflow-hidden">
      <div className="absolute top-0 left-0 h-96 w-96 rounded-full bg-blue-500/20 blur-[130px]" />
      <div className="absolute bottom-0 right-0 h-96 w-96 rounded-full bg-cyan-400/20 blur-[130px]" />

      <div className="max-w-6xl mx-auto relative z-10">
        <div className="flex justify-between items-center mb-10">
          <div>
            <h1 className="text-4xl font-bold">📄 Resume Analysis</h1>
            <p className="text-gray-400 mt-2">
              MockMate AI analyzed your resume and extracted key insights.
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
            <p className="text-gray-400 text-sm">Resume Score</p>
            <h2 className="text-5xl font-bold text-cyan-300 mt-2">87/100</h2>
          </div>

          <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
            <p className="text-gray-400 text-sm">Experience</p>
            <h2 className="text-3xl font-bold mt-2">
              {analysis?.experience || "Beginner"}
            </h2>
          </div>

          <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
            <p className="text-gray-400 text-sm">Recommended Role</p>
            <h2 className="text-3xl font-bold mt-2">Based on Skills</h2>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 mb-8">
          <div className="bg-white/5 border border-white/10 rounded-3xl p-8">
            <h3 className="text-2xl font-semibold mb-4">Detected Skills</h3>

            <div className="flex flex-wrap gap-3">
              {skills.map((skill) => (
                <span
                  key={skill}
                  className="bg-cyan-500/20 px-4 py-2 rounded-full"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>

          <div className="bg-white/5 border border-white/10 rounded-3xl p-8">
            <h3 className="text-2xl font-semibold mb-4">Strengths</h3>

            <ul className="space-y-3 text-gray-300">
              {strengths.map((strength) => (
                <li key={strength}>✅ {strength}</li>
              ))}
            </ul>
          </div>
        </div>

        <div className="bg-white/5 border border-white/10 rounded-3xl p-8 mb-8">
          <h3 className="text-2xl font-semibold mb-4">Resume Summary</h3>

          <p className="text-gray-300 leading-8">{summary}</p>
        </div>

        <div className="flex gap-4">
          <button
            onClick={generateQuestions}
            disabled={loadingQuestions}
            className="bg-gradient-to-r from-blue-500 to-cyan-400 px-8 py-4 rounded-2xl font-bold shadow-lg shadow-cyan-500/40 hover:scale-105 transition-all disabled:opacity-50"
          >
            {loadingQuestions
              ? "Generating Questions..."
              : "Generate Interview Questions →"}
          </button>

          <Link
            href="/"
            className="bg-white/10 px-8 py-4 rounded-2xl font-bold hover:bg-white/20"
          >
            Upload Another Resume
          </Link>
        </div>
      </div>
    </main>
  );
}