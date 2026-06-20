import { NextResponse } from "next/server";
import { openrouter } from "@/lib/openrouter";
import { supabase } from "@/lib/supabase";
import { MODEL } from "@/lib/constants";

export async function POST(req: Request) {
  try {
    const { interview_id, question, answer } = await req.json();

    if (!question || !answer) {
      return NextResponse.json(
        {
          error: "Question and answer are required",
        },
        { status: 400 }
      );
    }

    const prompt = `
You are an expert technical interviewer.

Question:
${question}

Candidate Answer:
${answer}

Evaluate the answer and return ONLY valid JSON.

{
  "score": 0,
  "technicalAccuracy": 0,
  "communicationScore": 0,
  "strengths": [],
  "weaknesses": [],
  "suggestions": [],
  "finalFeedback": ""
}
`;

    const completion = await openrouter.chat.completions.create({
  model: MODEL,
  messages: [
    {
      role: "user",
      content: prompt,
    },
  ],
});
 

const text =
  completion?.choices?.[0]?.message?.content || "";

    const cleaned = text
      .replace(/```json/g, "")
      .replace(/```/g, "")
      .trim();

    const evaluation = JSON.parse(cleaned);

    const { error } = await supabase
  .from("answers")
  .insert([
    {
      interview_id,
      question,
      answer,
      score: evaluation.score,
      feedback: evaluation.finalFeedback,
      weak_areas: evaluation.weaknesses.join(", "),
    },
  ]);

    if (error) {
      console.error(error);
    }

   return NextResponse.json({
  score: evaluation.score,
  feedback: evaluation.finalFeedback,
  strengths: evaluation.strengths || [],
  improvements: evaluation.suggestions || [],
});
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        error: "Evaluation failed",
      },
      { status: 500 }
    );
  }
}