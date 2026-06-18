import Link from "next/link";

export default function Sidebar() {
  return (
    <aside className="w-64 border-r border-white/10 bg-white/5 backdrop-blur-xl p-6 hidden md:block">
      <h1 className="text-2xl font-bold mb-10">
        🤖 AI Coach
      </h1>

      <nav className="space-y-4">
        <Link
          href="/"
          className="block p-3 rounded-xl hover:bg-white/10"
        >
          🏠 Dashboard
        </Link>

        <Link
          href="/interview"
          className="block p-3 rounded-xl hover:bg-white/10"
        >
          🎤 Interview
        </Link>

        <Link
          href="/results"
          className="block p-3 rounded-xl hover:bg-white/10"
        >
          📊 Results
        </Link>

        <div className="p-3 rounded-xl hover:bg-white/10 cursor-pointer">
          📚 Roadmap
        </div>
      </nav>
    </aside>
  );
}