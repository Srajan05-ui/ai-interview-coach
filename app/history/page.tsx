import Link from "next/link";

export default function HistoryPage() {
  const history = [
    {
      id: 1,
      role: "Frontend Developer",
      date: "18 June 2026",
      score: "87/100",
      status: "Completed",
      weakArea: "System Design",
    },
    {
      id: 2,
      role: "React Developer",
      date: "15 June 2026",
      score: "82/100",
      status: "Completed",
      weakArea: "Communication",
    },
    {
      id: 3,
      role: "Software Engineer",
      date: "10 June 2026",
      score: "78/100",
      status: "Completed",
      weakArea: "Databases",
    },
  ];

  return (
    <main className="min-h-screen bg-[#050816] text-white p-8 relative overflow-hidden">
      <div className="absolute top-0 left-0 h-96 w-96 rounded-full bg-blue-500/20 blur-[130px]" />
      <div className="absolute bottom-0 right-0 h-96 w-96 rounded-full bg-cyan-400/20 blur-[130px]" />

      <div className="max-w-6xl mx-auto relative z-10">
        <div className="flex justify-between items-center mb-10">
          <div>
            <h1 className="text-4xl font-bold">📜 Interview History</h1>
            <p className="text-gray-400 mt-2">
              View your past mock interviews and performance progress.
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
            <p className="text-gray-400 text-sm">Total Interviews</p>
            <h2 className="text-5xl font-bold text-cyan-300 mt-2">3</h2>
          </div>

          <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
            <p className="text-gray-400 text-sm">Best Score</p>
            <h2 className="text-5xl font-bold text-cyan-300 mt-2">87</h2>
          </div>

          <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
            <p className="text-gray-400 text-sm">Most Common Weak Area</p>
            <h2 className="text-3xl font-bold mt-2">System Design</h2>
          </div>
        </div>

        <div className="bg-white/5 border border-white/10 rounded-3xl p-8">
          <h2 className="text-2xl font-semibold mb-6">
            Previous Interview Sessions
          </h2>

          <div className="space-y-4">
            {history.map((item) => (
              <div
                key={item.id}
                className="bg-white/5 border border-white/10 rounded-2xl p-5 flex flex-col md:flex-row md:items-center md:justify-between gap-4"
              >
                <div>
                  <h3 className="text-xl font-bold">{item.role}</h3>
                  <p className="text-gray-400 text-sm">{item.date}</p>
                </div>

                <div>
                  <p className="text-gray-400 text-sm">Score</p>
                  <p className="text-cyan-300 font-bold">{item.score}</p>
                </div>

                <div>
                  <p className="text-gray-400 text-sm">Weak Area</p>
                  <p>{item.weakArea}</p>
                </div>

                <span className="bg-green-500/20 text-green-300 px-4 py-2 rounded-full text-sm">
                  {item.status}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-8">
          <Link
            href="/interview"
            className="inline-block bg-gradient-to-r from-blue-500 to-cyan-400 px-8 py-4 rounded-2xl font-bold shadow-lg shadow-cyan-500/40 hover:scale-105 transition-all"
          >
            Start New Interview →
          </Link>
        </div>
      </div>
    </main>
  );
}