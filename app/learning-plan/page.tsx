"use client";

import { useState } from "react";
import Link from "next/link";

export default function LearningPlanPage() {
  const [skill, setSkill] = useState("");
  const [roadmap, setRoadmap] = useState<string[]>([]);

  const generateRoadmap = () => {
    if (!skill.trim()) {
      alert("Please enter a skill first.");
      return;
    }

    const plan = [
      `Week 1: Learn the basics of ${skill}`,
      `Week 2: Practice core concepts and simple examples`,
      `Week 3: Build small projects using ${skill}`,
      `Week 4: Learn advanced concepts and best practices`,
      `Week 5: Solve interview questions related to ${skill}`,
      `Week 6: Build a final project and revise everything`,
    ];

    setRoadmap(plan);
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
              Enter any skill and MockMate AI will create a personalized learning path.
            </p>
          </div>

          <Link href="/" className="bg-white/10 px-4 py-2 rounded-xl hover:bg-white/20">
            ← Dashboard
          </Link>
        </div>

        <div className="bg-white/5 border border-white/10 rounded-3xl p-8 mb-8">
          <label className="block mb-4 text-lg font-medium">
            What skill do you want to learn?
          </label>

          <input
            type="text"
            value={skill}
            onChange={(e) => setSkill(e.target.value)}
            placeholder="Example: React, JavaScript, System Design"
            className="w-full bg-black/30 border border-white/10 rounded-2xl p-4 outline-none mb-6"
          />

          <button
            onClick={generateRoadmap}
            className="bg-gradient-to-r from-blue-500 to-cyan-400 px-8 py-3 rounded-xl font-semibold shadow-lg shadow-cyan-500/30 hover:scale-105 transition-all"
          >
            Generate Roadmap
          </button>
        </div>

        {roadmap.length > 0 && (
          <div className="bg-white/5 border border-white/10 rounded-3xl p-8">
            <h2 className="text-2xl font-semibold mb-6">
              Roadmap for {skill}
            </h2>

            <div className="space-y-4">
              {roadmap.map((item, index) => (
                <div
                  key={index}
                  className="bg-white/5 border border-white/10 p-5 rounded-2xl"
                >
                  ✅ {item}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </main>
  );
}