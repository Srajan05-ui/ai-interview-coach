"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

type ResumeAnalysis = {
  skills?: string[];
  experience?: string;
  strengths?: string[];
  weaknesses?: string[];
  suggestions?: string[];
  summary?: string;
};

export default function ResumeAnalysisPage() {
  const router = useRouter();

  const [loading, setLoading] = useState(true);
  const [generatingQuestions, setGeneratingQuestions] = useState(false);
  const [analysis, setAnalysis] = useState<ResumeAnalysis | null>(null);
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
          body: JSON.stringify({ resumeText }),
        });

        const data = await response.json();

        if (!data.success) {
          setError(data.error || "Analysis failed");
          setLoading(false);
          return;
        }

        setAnalysis(data.data);
        localStorage.setItem("resumeAnalysis", JSON.stringify(data.data));
      } catch (err) {
        console.error(err);
        setError("Failed to analyze resume");
      } finally {
        setLoading(false);
      }
    };

    analyzeResume();
  }, []);

  const generateQuestions = async () => {
    if (!analysis?.skills || analysis.skills.length === 0) {
      alert("No skills found to generate questions.");
      return;
    }

    try {
      setGeneratingQuestions(true);

      const response = await fetch("/api/generate-questions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          skills: analysis.skills,
        }),
      });

      const data = await response.json();

      const questions = data.questions || data.data?.questions || [];

      if (!questions || questions.length === 0) {
        alert("No questions were generated.");
        return;
      }

      localStorage.setItem("interviewQuestions", JSON.stringify(questions));
      localStorage.setItem("questions", JSON.stringify(questions));

      router.push("/interview");
    } catch (err) {
      console.error(err);
      alert("Failed to generate interview questions.");
    } finally {
      setGeneratingQuestions(false);
    }
  };

  if (loading) {
    return (
      <main className="min-h-screen bg-[#050816] text-white flex items-center justify-center">
        <h1 className="text-3xl font-bold">Analyzing Resume...</h1>
      </main>
    );
  }

  if (error) {
    return (
      <main className="min-h-screen bg-[#050816] text-white flex flex-col items-center justify-center gap-4">
        <h1 className="text-2xl text-red-400">{error}</h1>

        <Link href="/" className="bg-cyan-500 px-6 py-3 rounded-xl">
          Go Back
        </Link>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#050816] text-white p-8 relative overflow-hidden">
      <div className="absolute top-0 left-0 h-96 w-96 rounded-full bg-blue-500/20 blur-[130px]" />
      <div className="absolute bottom-0 right-0 h-96 w-96 rounded-full bg-cyan-400/20 blur-[130px]" />

      <div className="max-w-6xl mx-auto relative z-10">
        <div className="flex justify-between items-center mb-10">
          <div>
            <h1 className="text-4xl font-bold">📄 Resume Analysis</h1>

            <p className="text-gray-400 mt-2">
              AI generated analysis of your resume.
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
            <h2 className="text-2xl font-bold mb-4">Skills</h2>

            <div className="flex flex-wrap gap-3">
              {analysis?.skills?.map((skill, index) => (
                <span
                  key={index}
                  className="bg-cyan-500/20 px-4 py-2 rounded-full"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>

          <div className="bg-white/5 border border-white/10 rounded-3xl p-8">
            <h2 className="text-2xl font-bold mb-4">Strengths</h2>

            <ul className="space-y-2 text-gray-300">
              {analysis?.strengths?.map((item, index) => (
                <li key={index}>✅ {item}</li>
              ))}
            </ul>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 mb-8">
          <div className="bg-white/5 border border-white/10 rounded-3xl p-8">
            <h2 className="text-2xl font-bold mb-4">Weaknesses</h2>

            <ul className="space-y-2 text-gray-300">
              {analysis?.weaknesses?.map((item, index) => (
                <li key={index}>⚠️ {item}</li>
              ))}
            </ul>
          </div>

          <div className="bg-white/5 border border-white/10 rounded-3xl p-8">
            <h2 className="text-2xl font-bold mb-4">Suggestions</h2>

            <ul className="space-y-2 text-gray-300">
              {analysis?.suggestions?.map((item, index) => (
                <li key={index}>🚀 {item}</li>
              ))}
            </ul>
          </div>
        </div>

        {analysis?.summary && (
          <div className="bg-white/5 border border-white/10 rounded-3xl p-8 mb-8">
            <h2 className="text-2xl font-bold mb-4">Summary</h2>

            <p className="text-gray-300 leading-8">{analysis.summary}</p>
          </div>
        )}

        <div className="flex gap-4">
          <button
            onClick={generateQuestions}
            disabled={generatingQuestions}
            className="bg-gradient-to-r from-blue-500 to-cyan-400 px-8 py-4 rounded-2xl font-bold disabled:opacity-50"
          >
            {generatingQuestions
              ? "Generating Questions..."
              : "Generate Interview Questions →"}
          </button>

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