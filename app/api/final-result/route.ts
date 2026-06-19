import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";
import { openrouter } from "@/lib/openrouter";

export async function POST(req: Request) {
  try {
    const { interview_id } = await req.json();

    if (!interview_id) {
      return NextResponse.json(
        { error: "interview_id is required" },
        { status: 400 }
      );
    }

    const { data: answers, error } = await supabase
      .from("answers")
      .select("*")
      .eq("interview_id", interview_id);

    if (error) {
      return NextResponse.json(
        { error: error.message },
        { status: 500 }
      );
    }

    if (!answers || answers.length === 0) {
      return NextResponse.json(
        { error: "No answers found for this interview" },
        { status: 404 }
      );
    }

    const totalScore = answers.reduce(
      (sum, item) => sum + (item.score || 0),
      0
    );

    const averageScore = Number(
      (totalScore / answers.length).toFixed(2)
    );

    const weakAreas = answers
      .map((item) => item.weak_areas)
      .filter(Boolean)
      .join(", ");

    let performance = "Needs Improvement";

    if (averageScore >= 8) performance = "Excellent";
    else if (averageScore >= 6) performance = "Good";
    else if (averageScore >= 4) performance = "Average";

    const prompt = `
You are an expert interview coach.

Interview average score: ${averageScore}/10
Performance level: ${performance}
Weak areas: ${weakAreas}

Generate final interview feedback in 3-4 lines.
`;

    const completion = await openrouter.chat.completions.create({
      model: "google/gemma-4-31b-it:free",
      messages: [
        {
          role: "user",
          content: prompt,
        },
      ],
    });

    const finalFeedback =
      completion?.choices?.[0]?.message?.content ||
      "Final feedback could not be generated.";

    await supabase
      .from("interviews")
      .update({
        total_score: averageScore,
        weak_areas: weakAreas,
        feedback: finalFeedback,
      })
      .eq("id", interview_id);

    const scoreOutOf100 = Math.round(averageScore * 10);

     
return NextResponse.json({
  overallScore: scoreOutOf100,
  technicalScore: scoreOutOf100,
  communicationScore: scoreOutOf100,
  strengthAreas: [],
  weakAreas: weakAreas
    ? weakAreas.split(",").map((item) => item.trim())
    : [],
  improvementSuggestions: [],
  finalFeedback,
});

  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { error: "Final result calculation failed" },
      { status: 500 }
    );
  }
}