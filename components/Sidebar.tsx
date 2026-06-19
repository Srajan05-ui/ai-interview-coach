import Link from "next/link";

export default function Sidebar() {
  return (
    <aside className="w-64 border-r border-white/10 bg-white/5 backdrop-blur-xl p-6 hidden md:block">
      <h1 className="text-2xl font-bold mb-10">
        🤖 MockMate AI
      </h1>

      <nav className="space-y-4">
        <Link
          href="/"
          className="block p-3 rounded-xl hover:bg-white/10 transition"
        >
          🏠 Dashboard
        </Link>

        <Link
          href="/resume-analysis"
          className="block p-3 rounded-xl hover:bg-white/10 transition"
        >
          📄 Resume Analysis
        </Link>

        <Link
          href="/interview"
          className="block p-3 rounded-xl hover:bg-white/10 transition"
        >
          🎤 Interview
        </Link>

        <Link
          href="/evaluation"
          className="block p-3 rounded-xl hover:bg-white/10 transition"
        >
          🧠 Evaluation
        </Link>

        <Link
          href="/results"
          className="block p-3 rounded-xl hover:bg-white/10 transition"
        >
          📊 Results
        </Link>

        <Link
          href="/learning-plan"
          className="block p-3 rounded-xl hover:bg-white/10 transition"
        >
          🎯 Learning Roadmap
        </Link>

        <Link
          href="/history"
          className="block p-3 rounded-xl hover:bg-white/10 transition"
        >
          📜 History
        </Link>
      </nav>
    </aside>
  );
}