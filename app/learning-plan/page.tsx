"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

type EvaluationItem = {
  improvements?: string[] | string;
  weak_areas?: string[] | string;
};

export default function LearningPlanPage() {
  const [weakSkill, setWeakSkill] = useState("");
  const [suggestedSkills, setSuggestedSkills] = useState<string[]>([]);
  const [roadmap, setRoadmap] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const storedResults = localStorage.getItem("evaluationResults");

    if (!storedResults) return;

    try {
      const results: EvaluationItem[] = JSON.parse(storedResults);

      const areas = Array.from(
        new Set(
          results.flatMap((item) => {
            const improvements = Array.isArray(item.improvements)
              ? item.improvements
              : item.improvements
              ? [item.improvements]
              : [];

            const weakAreas = Array.isArray(item.weak_areas)
              ? item.weak_areas
              : item.weak_areas
              ? [item.weak_areas]
              : [];

            return [...improvements, ...weakAreas];
          })
        )
      );

      Promise.resolve().then(() => {
 Promise.resolve().then(() => {
  setSuggestedSkills(areas);
});
});
    } catch (error) {
      console.error("Could not load weak areas:", error);
    }
  }, []);

  const generateRoadmap = async () => {
    if (!weakSkill.trim()) {
      alert("Please type a skill or weak area first.");
      return;
    }

    try {
      setLoading(true);
      setRoadmap([]);

      const response = await fetch("/api/generate-roadmap", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          weakSkill,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        alert(data.error || "Roadmap generation failed.");
        return;
      }

      setRoadmap(data.roadmap || []);
    } catch (error) {
      console.error(error);
      alert("Roadmap generation failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#050816] text-white p-8 relative overflow-hidden">
      <div className="absolute top-0 left-0 h-96 w-96 rounded-full bg-blue-500/20 blur-[130px]" />
      <div className="absolute bottom-0 right-0 h-96 w-96 rounded-full bg-cyan-400/20 blur-[130px]" />

      <div className="max-w-4xl mx-auto relative z-10">
        <div className="flex justify-between items-center mb-10">
          <div>
            <h1 className="text-4xl font-bold">🎯 Learning Roadmap</h1>
            <p className="text-gray-400 mt-2">
              Enter any weak skill and MockMate AI will create a personalized roadmap.
            </p>
          </div>

          <Link
            href="/"
            className="bg-white/10 px-4 py-2 rounded-xl hover:bg-white/20"
          >
            ← Dashboard
          </Link>
        </div>

        {suggestedSkills.length > 0 && (
          <div className="bg-white/5 border border-white/10 rounded-3xl p-6 mb-8">
            <h2 className="text-xl font-semibold mb-4">
              Weak Areas Found in Your Interview
            </h2>

            <div className="flex flex-wrap gap-3">
              {suggestedSkills.slice(0, 6).map((item, index) => (
                <button
                  key={index}
                  onClick={() => setWeakSkill(item)}
                  className="bg-red-500/20 px-4 py-2 rounded-full hover:bg-red-500/30 transition"
                >
                  {item}
                </button>
              ))}
            </div>
          </div>
        )}

        <div className="bg-white/5 border border-white/10 rounded-3xl p-8 mb-8">
          <label className="block mb-4 text-lg font-medium">
            What are you weak at?
          </label>

          <textarea
            value={weakSkill}
            onChange={(e) => setWeakSkill(e.target.value)}
            placeholder="Example: I am weak at remembering Python variables and data types."
            className="w-full min-h-32 bg-black/30 border border-white/10 rounded-2xl p-4 outline-none mb-6 resize-none"
          />

          <button
            onClick={generateRoadmap}
            disabled={loading}
            className="bg-gradient-to-r from-blue-500 to-cyan-400 px-8 py-3 rounded-xl font-semibold shadow-lg shadow-cyan-500/30 hover:scale-105 transition-all disabled:opacity-50 disabled:hover:scale-100"
          >
            {loading ? "Generating Roadmap..." : "Generate Roadmap"}
          </button>
        </div>

        {roadmap.length > 0 && (
          <div className="bg-white/5 border border-white/10 rounded-3xl p-8">
            <h2 className="text-2xl font-semibold mb-2">
              Your Personalized Learning Roadmap
            </h2>

            <p className="text-gray-400 mb-6">
              Focus area: {weakSkill}
            </p>
            

            <div className="space-y-4">
              {roadmap.map((item, index) => (
                <div
                  key={index}
                  className="bg-white/5 border border-white/10 p-5 rounded-2xl leading-7"
                >
                  <span className="text-cyan-300 font-bold mr-2">
                    {index + 1}.
                  </span>
                  {item.replace(/^Step \d+:\s*/i, "")}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
