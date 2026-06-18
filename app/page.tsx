import Link from "next/link";
import Sidebar from "@/components/Sidebar";
import DashboardCard from "@/components/DashboardCard";
import SkillBadge from "@/components/SkillBadge";
import ProgressBar from "@/components/ProgressBar";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#0A0A0A] text-white relative overflow-hidden">

      {/* Glow Effects */}
      <div className="absolute top-0 left-0 h-96 w-96 rounded-full bg-blue-500/20 blur-[120px]" />
      <div className="absolute bottom-0 right-0 h-96 w-96 rounded-full bg-purple-500/20 blur-[120px]" />

      <div className="flex min-h-screen">

        <Sidebar />

        {/* Main Content */}
        <section className="flex-1 p-8 relative z-10">

          <div className="mb-8">
            <h1 className="text-5xl font-bold mb-3">
              Welcome Back 👋
            </h1>

            <p className="text-gray-400 text-lg">
              Upload your resume and start practicing with AI-powered interviews.
            </p>
          </div>

          {/* Upload Card */}
          <div className="bg-white/5 backdrop-blur-xl border border-white/10 shadow-2xl shadow-black/30 rounded-3xl p-8">

            <h2 className="text-2xl font-semibold mb-4">
              📄 Upload Resume
            </h2>

            <p className="text-gray-400 mb-6">
              Supported formats: PDF, DOC, DOCX
            </p>

            <input
              type="file"
              accept=".pdf,.doc,.docx"
              className="w-full text-sm text-gray-300 mb-6"
            />

            <button className="bg-gradient-to-r from-blue-500 to-purple-500 px-8 py-3 rounded-xl font-semibold hover:scale-105 transition-all">
              Upload Resume
            </button>
          </div>

          {/* Stats */}
          <div className="grid md:grid-cols-3 gap-6 mt-8">

            <DashboardCard
              title="Interviews Generated"
              value="5,000+"
            />

            <DashboardCard
              title="Success Rate"
              value="92%"
            />

            <DashboardCard
              title="AI Availability"
              value="24/7"
            />

          </div>

          <div className="mt-8">
            <Link
              href="/interview"
              className="inline-block bg-white text-black px-8 py-4 rounded-2xl font-bold hover:bg-gray-200 transition-all"
            >
              Start Interview →
            </Link>
          </div>

        </section>

        {/* AI Insights */}
        <aside className="w-96 border-l border-white/10 bg-white/5 backdrop-blur-xl p-6 hidden lg:block relative z-10">

          <h2 className="text-xl font-bold mb-6">
            AI Insights
          </h2>

          {/* Resume Score */}
          <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-5 mb-5">
            <p className="text-gray-400 text-sm">
              Resume Score
            </p>

            <h3 className="text-5xl font-bold mt-2 text-blue-400">
              87/100
            </h3>
          </div>

          {/* Skills */}
          <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-5 mb-5">
            <h3 className="font-semibold mb-4">
              Skills Found
            </h3>

            <div className="flex flex-wrap gap-2">
              <SkillBadge skill="React" />
              <SkillBadge skill="Next.js" />
              <SkillBadge skill="TypeScript" />
              <SkillBadge skill="SQL" />
            </div>
          </div>

          {/* Readiness */}
          <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-5">

            <h3 className="font-semibold mb-5">
              Interview Readiness
            </h3>

            <ProgressBar
              label="Technical"
              value={90}
            />

            <ProgressBar
              label="Communication"
              value={75}
            />

            <ProgressBar
              label="Confidence"
              value={82}
            />

          </div>

        </aside>

      </div>

    </main>
  );
}