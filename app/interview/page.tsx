"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function InterviewPage() {
  const router = useRouter();

  const [questions, setQuestions] = useState<string[]>([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<string[]>([]);
  const [evaluating, setEvaluating] = useState(false);

  useEffect(() => {
  const loadQuestions = async () => {
    const storedQuestions =
      localStorage.getItem("interviewQuestions") ||
      localStorage.getItem("questions");

    if (storedQuestions) {
      const parsedQuestions = JSON.parse(storedQuestions);

      const questionList = Array.isArray(parsedQuestions)
        ? parsedQuestions
        : parsedQuestions.questions || [];

      setTimeout(() => {
        setQuestions(questionList);
        setAnswers(Array(questionList.length).fill(""));
      }, 0);
    }
  };

  loadQuestions();
}, []);

  const nextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    }
  };

  const previousQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const handleAnswerChange = (
    e: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    const updatedAnswers = [...answers];
    updatedAnswers[currentQuestion] = e.target.value;
    setAnswers(updatedAnswers);
  };

  const submitInterview = async () => {
    if (questions.length === 0) {
      alert("No questions found. Please generate questions first.");
      return;
    }

    const emptyAnswer = answers.some((answer) => !answer.trim());

    if (emptyAnswer) {
      alert("Please answer all questions before submitting.");
      return;
    }

    try {
  setEvaluating(true);

  const interviewId =
    localStorage.getItem("interviewId") || crypto.randomUUID();

  localStorage.setItem("interviewId", interviewId);

  const evaluationResults = [];

  for (let i = 0; i < questions.length; i++) {
        const response = await fetch("/api/evaluate-answer", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
  interview_id: interviewId,
  question: questions[i],
  answer: answers[i],
}),
        });

        const data = await response.json();

        evaluationResults.push({
          question: questions[i],
          answer: answers[i],
          score: data.score,
          feedback: data.feedback,
          weak_areas: data.weak_areas || [],
          strengths: data.strengths || [],
          improvements: data.improvements || [],
        });
      }

      localStorage.setItem(
        "evaluationResults",
        JSON.stringify(evaluationResults)
      );

      router.push("/evaluation");
    } catch (error) {
      console.error(error);
      alert("Evaluation failed. Please try again.");
    } finally {
      setEvaluating(false);
    }
  };

  if (questions.length === 0) {
    return (
      <main className="min-h-screen bg-[#050816] text-white flex items-center justify-center p-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold mb-4">
            No Questions Generated Yet
          </h1>

          <p className="text-gray-400 mb-6">
            Please upload your resume and generate interview questions first.
          </p>

          <Link
            href="/resume-analysis"
            className="inline-block bg-gradient-to-r from-blue-500 to-cyan-400 px-8 py-4 rounded-2xl font-bold"
          >
            Go to Resume Analysis
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#050816] text-white p-8 relative overflow-hidden">
      <div className="absolute top-0 left-0 h-96 w-96 rounded-full bg-blue-500/20 blur-[130px]" />
      <div className="absolute bottom-0 right-0 h-96 w-96 rounded-full bg-cyan-400/20 blur-[130px]" />

      <div className="max-w-5xl mx-auto relative z-10">
        <div className="flex justify-between items-center mb-10">
          <div>
            <h1 className="text-4xl font-bold">
              🎤 MockMate Interview Session
            </h1>

            <p className="text-gray-400 mt-2">
              Practice with AI-generated questions tailored to your resume.
            </p>
          </div>

          <Link
            href="/"
            className="bg-white/10 px-4 py-2 rounded-xl hover:bg-white/20"
          >
            ← Dashboard
          </Link>
        </div>

        <div className="grid md:grid-cols-3 gap-4 mb-8">
          <div className="bg-white/5 border border-white/10 rounded-2xl p-5">
            <p className="text-gray-400 text-sm">Question Number</p>
            <h3 className="text-3xl font-bold">
              {currentQuestion + 1} / {questions.length}
            </h3>
          </div>

          <div className="bg-white/5 border border-white/10 rounded-2xl p-5">
            <p className="text-gray-400 text-sm">Category</p>
            <h3 className="text-3xl font-bold">Resume-Based</h3>
          </div>

          <div className="bg-white/5 border border-white/10 rounded-2xl p-5">
            <p className="text-gray-400 text-sm">Time Left</p>
            <h3 className="text-3xl font-bold">15:00</h3>
          </div>
        </div>

        <div className="bg-white/5 border border-white/10 rounded-3xl p-8 mb-8">
          <p className="text-sm text-cyan-300 mb-3">
            Resume-Based Question
          </p>

          <h2 className="text-2xl font-semibold">
            {questions[currentQuestion]}
          </h2>
        </div>

        <div className="bg-white/5 border border-white/10 rounded-3xl p-8">
          <label className="block mb-4 text-lg font-medium">
            Your Response
          </label>

          <textarea
            value={answers[currentQuestion] || ""}
            onChange={handleAnswerChange}
            placeholder="Type your response here..."
            className="w-full h-56 bg-black/30 border border-white/10 rounded-2xl p-4 outline-none"
          />

          <div className="flex justify-between mt-6">
            <button
              onClick={previousQuestion}
              className="bg-white/10 px-6 py-3 rounded-xl hover:bg-white/20"
            >
              ← Previous
            </button>

            <div className="space-x-4">
              <button
                onClick={nextQuestion}
                className="bg-blue-500 px-6 py-3 rounded-xl hover:bg-blue-600"
              >
                Next →
              </button>

              <button
                onClick={submitInterview}
                disabled={evaluating}
                className="bg-gradient-to-r from-blue-500 to-cyan-400 px-6 py-3 rounded-xl font-semibold shadow-lg shadow-cyan-500/30 hover:scale-105 transition-all disabled:opacity-50"
              >
                {evaluating ? "Evaluating..." : "Submit Interview"}
              </button>
            </div>
          </div>
        </div>

        <div className="mt-8 bg-white/5 border border-white/10 rounded-3xl p-6">
          <h3 className="text-xl font-semibold mb-4">
            Stored Responses
          </h3>

          <pre className="text-sm text-gray-300 whitespace-pre-wrap">
            {JSON.stringify(answers, null, 2)}
          </pre>
        </div>
      </div>
    </main>
  );
}