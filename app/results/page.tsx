import Link from "next/link";

export default function ResultsPage() {
  return (
    <main className="min-h-screen bg-[#0A0A0A] text-white p-8">

      <div className="max-w-6xl mx-auto">

        {/* Header */}
        <div className="flex justify-between items-center mb-10">

          <div>
            <h1 className="text-4xl font-bold">
              📊 Interview Results
            </h1>

            <p className="text-gray-400 mt-2">
              AI-generated feedback based on your interview performance.
            </p>
          </div>

          <Link
            href="/"
            className="bg-white/10 px-4 py-2 rounded-xl hover:bg-white/20"
          >
            ← Dashboard
          </Link>

        </div>

        {/* Score Cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">

          <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
            <p className="text-gray-400 text-sm">
              Technical Score
            </p>

            <h2 className="text-5xl font-bold text-blue-400 mt-2">
              88
            </h2>
          </div>

          <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
            <p className="text-gray-400 text-sm">
              Communication
            </p>

            <h2 className="text-5xl font-bold text-purple-400 mt-2">
              75
            </h2>
          </div>

          <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
            <p className="text-gray-400 text-sm">
              Confidence
            </p>

            <h2 className="text-5xl font-bold text-green-400 mt-2">
              82
            </h2>
          </div>

        </div>

        {/* Overall Score */}
        <div className="bg-white/5 border border-white/10 rounded-3xl p-8 mb-8">

          <p className="text-gray-400">
            Overall Performance
          </p>

          <h2 className="text-7xl font-bold text-blue-400 mt-3">
            87/100
          </h2>

        </div>

        {/* Feedback */}
        <div className="bg-white/5 border border-white/10 rounded-3xl p-8 mb-8">

          <h3 className="text-2xl font-semibold mb-4">
            AI Feedback
          </h3>

          <p className="text-gray-300 leading-8">
            Strong knowledge of React and frontend development.
            Improve confidence while explaining concepts and
            practice system design questions for better performance.
          </p>

        </div>

        {/* Weak Areas */}
        <div className="bg-white/5 border border-white/10 rounded-3xl p-8 mb-8">

          <h3 className="text-2xl font-semibold mb-4">
            Weak Areas
          </h3>

          <div className="flex flex-wrap gap-3">

            <span className="bg-red-500/20 px-4 py-2 rounded-full">
              System Design
            </span>

            <span className="bg-red-500/20 px-4 py-2 rounded-full">
              Redis
            </span>

            <span className="bg-red-500/20 px-4 py-2 rounded-full">
              Databases
            </span>

          </div>

        </div>

        {/* Learning Roadmap */}
        <div className="bg-white/5 border border-white/10 rounded-3xl p-8">

          <h3 className="text-2xl font-semibold mb-5">
            Learning Roadmap
          </h3>

          <div className="space-y-4">

            <div className="bg-white/5 p-4 rounded-xl">
              ✅ Learn Database Indexing
            </div>

            <div className="bg-white/5 p-4 rounded-xl">
              ✅ Practice Redis Basics
            </div>

            <div className="bg-white/5 p-4 rounded-xl">
              ✅ Study System Design Fundamentals
            </div>

            <div className="bg-white/5 p-4 rounded-xl">
              ✅ Complete 5 Mock Interviews
            </div>

          </div>

        </div>

      </div>

    </main>
  );
}