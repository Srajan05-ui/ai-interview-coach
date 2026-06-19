import Link from "next/link";

export default function ResultsPage() {
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
            <h2 className="text-5xl font-bold text-cyan-300 mt-2">88</h2>
          </div>

          <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
            <p className="text-gray-400 text-sm">Communication</p>
            <h2 className="text-5xl font-bold text-blue-400 mt-2">75</h2>
          </div>

          <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
            <p className="text-gray-400 text-sm">Confidence</p>
            <h2 className="text-5xl font-bold text-cyan-300 mt-2">82</h2>
          </div>
        </div>

        <div className="bg-white/5 border border-white/10 rounded-3xl p-8 mb-8">
          <p className="text-gray-400">Interview Score</p>
          <h2 className="text-7xl font-bold text-cyan-300 mt-3">87/100</h2>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 mb-8">
          <div className="bg-white/5 border border-white/10 rounded-3xl p-8">
            <h3 className="text-2xl font-semibold mb-4">
              Performance Analysis
            </h3>

            <p className="text-gray-300 leading-8">
              You demonstrated strong frontend knowledge and explained core
              concepts clearly. To improve further, focus on giving structured
              answers, adding examples, and practicing system design basics.
            </p>
          </div>

          <div className="bg-white/5 border border-white/10 rounded-3xl p-8">
            <h3 className="text-2xl font-semibold mb-4">Key Strengths</h3>

            <div className="flex flex-wrap gap-3">
              <span className="bg-cyan-500/20 px-4 py-2 rounded-full">
                React Fundamentals
              </span>

              <span className="bg-blue-500/20 px-4 py-2 rounded-full">
                Frontend Concepts
              </span>

              <span className="bg-cyan-500/20 px-4 py-2 rounded-full">
                Clear Explanation
              </span>
            </div>
          </div>
        </div>

        <div className="bg-white/5 border border-white/10 rounded-3xl p-8 mb-8">
          <h3 className="text-2xl font-semibold mb-4">
            Areas for Improvement
          </h3>

          <div className="flex flex-wrap gap-3">
            <span className="bg-red-500/20 px-4 py-2 rounded-full">
              System Design
            </span>

            <span className="bg-red-500/20 px-4 py-2 rounded-full">
              Databases
            </span>

            <span className="bg-red-500/20 px-4 py-2 rounded-full">
              Confidence
            </span>
          </div>
        </div>

        <div className="bg-white/5 border border-white/10 rounded-3xl p-8">
          <h3 className="text-2xl font-semibold mb-5">
            Personalized Learning Plan
          </h3>

          <div className="space-y-4">
            <div className="bg-white/5 p-4 rounded-xl">
              ✅ Practice explaining React and Next.js with real examples.
            </div>

            <div className="bg-white/5 p-4 rounded-xl">
              ✅ Study database basics and indexing concepts.
            </div>

            <div className="bg-white/5 p-4 rounded-xl">
              ✅ Learn system design fundamentals step by step.
            </div>

            <div className="bg-white/5 p-4 rounded-xl">
              ✅ Complete at least 5 mock interviews using MockMate AI.
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}