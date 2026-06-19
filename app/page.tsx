"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Sidebar from "@/components/Sidebar";
import DashboardCard from "@/components/DashboardCard";
import SkillBadge from "@/components/SkillBadge";
import ProgressBar from "@/components/ProgressBar";

export default function Home() {
  const router = useRouter();

  const [resumeFile, setResumeFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);

  const handleResumeUpload = async () => {
    if (!resumeFile) {
      alert("Please select a resume file first.");
      return;
    }

    try {
      setLoading(true);

      const formData = new FormData();
      formData.append("resume", resumeFile);

      const uploadResponse = await fetch("/api/upload-resume", {
        method: "POST",
        body: formData,
      });

      const uploadData = await uploadResponse.json();

      const resumeText =
        uploadData.resumeText || uploadData.text || uploadData.extractedText;

      if (!resumeText) {
        alert("Resume text could not be extracted.");
        return;
      }

      const analysisResponse = await fetch("/api/resume-analysis", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          resumeText: resumeText,
        }),
      });

      const analysisData = await analysisResponse.json();

      localStorage.setItem("resumeAnalysis", JSON.stringify(analysisData));

      const questionResponse = await fetch("/api/generate-questions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          skills: analysisData.skills || [],
        }),
      });

      const questionData = await questionResponse.json();

      localStorage.setItem("interviewQuestions", JSON.stringify(questionData));

      router.push("/resume-analysis");
    } catch (error) {
      console.error("Upload failed:", error);
      alert("Something went wrong while uploading resume.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#050816] text-white relative overflow-hidden">
      <div className="absolute top-0 left-0 h-96 w-96 rounded-full bg-blue-500/20 blur-[130px]" />
      <div className="absolute bottom-0 right-0 h-96 w-96 rounded-full bg-cyan-400/20 blur-[130px]" />

      <div className="flex min-h-screen relative z-10">
        <Sidebar />

        <section className="flex-1 p-8">
          <div className="mb-8">
            <span className="inline-block mb-4 rounded-full border border-cyan-400/30 bg-cyan-400/10 px-4 py-2 text-sm text-cyan-300">
              Practice. Improve. Get Hired.
            </span>

            <h1 className="text-5xl font-bold mb-4 leading-tight">
              Ace Your Next Interview with{" "}
              <span className="bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent">
                AI
              </span>
            </h1>

            <p className="text-gray-400 text-lg max-w-2xl">
              Upload your resume, get AI-powered analysis, generate interview
              questions, and improve with a personalized roadmap.
            </p>

            <p className="mt-4 inline-block rounded-full bg-white/5 border border-white/10 px-4 py-2 text-sm text-gray-300">
              Built with ❤️ by Team AI Pioneers
            </p>
          </div>

          <div className="bg-white/5 backdrop-blur-xl border border-white/10 shadow-2xl shadow-black/30 rounded-3xl p-8">
            <h2 className="text-2xl font-semibold mb-4">📄 Upload Resume</h2>

            <p className="text-gray-400 mb-6">
              Select your PDF, DOC, or DOCX resume to start the MockMate AI
              interview flow.
            </p>

            <input
              type="file"
              accept=".pdf,.doc,.docx"
              onChange={(e) => setResumeFile(e.target.files?.[0] || null)}
              className="w-full text-sm text-gray-300 mb-6"
            />

            {resumeFile && (
              <p className="text-sm text-cyan-300 mb-4">
                Selected File: {resumeFile.name}
              </p>
            )}

            <button
              onClick={handleResumeUpload}
              disabled={loading}
              className="bg-gradient-to-r from-blue-500 to-cyan-400 px-8 py-3 rounded-xl font-semibold shadow-lg shadow-cyan-500/30 hover:scale-105 transition-all disabled:opacity-50"
            >
              {loading ? "Analyzing Resume..." : "Upload Resume"}
            </button>
          </div>

          <div className="grid md:grid-cols-3 gap-6 mt-8">
            <DashboardCard title="📄 Resume Analyses" value="1,000+" />
            <DashboardCard title="🎤 Mock Interviews" value="500+" />
            <DashboardCard title="🏆 Success Stories" value="200+" />
          </div>

          <div className="mt-8">
            <Link
              href="/interview"
              className="inline-block bg-gradient-to-r from-blue-500 to-cyan-400 text-white px-8 py-4 rounded-2xl font-bold shadow-lg shadow-cyan-500/40 hover:scale-105 transition-all"
            >
              Start Interview →
            </Link>
          </div>
        </section>

        <aside className="w-96 border-l border-white/10 bg-white/5 backdrop-blur-xl p-6 hidden lg:block">
          <h2 className="text-xl font-bold mb-6">MockMate Insights</h2>

          <div className="bg-white/5 border border-white/10 rounded-2xl p-5 mb-5">
            <p className="text-gray-400 text-sm">Resume Score</p>
            <h3 className="text-5xl font-bold mt-2 text-cyan-300">87/100</h3>
          </div>

          <div className="bg-white/5 border border-white/10 rounded-2xl p-5 mb-5">
            <h3 className="font-semibold mb-4">Top Skills</h3>
            <div className="flex flex-wrap gap-2">
              <SkillBadge skill="React" />
              <SkillBadge skill="Next.js" />
              <SkillBadge skill="TypeScript" />
              <SkillBadge skill="SQL" />
            </div>
          </div>

          <div className="bg-white/5 border border-white/10 rounded-2xl p-5 mb-5">
            <p className="text-gray-400 text-sm">Recommended Role</p>
            <h3 className="text-2xl font-bold mt-2">
              Based on uploaded resume
            </h3>
          </div>

          <div className="bg-white/5 border border-white/10 rounded-2xl p-5">
            <h3 className="font-semibold mb-5">Interview Readiness</h3>
            <ProgressBar label="Technical" value={90} />
            <ProgressBar label="Communication" value={75} />
            <ProgressBar label="Confidence" value={82} />
          </div>
        </aside>
      </div>
    </main>
  );
}