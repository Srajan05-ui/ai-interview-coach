import { NextResponse } from "next/server";
import { openrouter } from "@/lib/openrouter";
import { MODEL } from "@/lib/constants";

export async function POST(req: Request) {
  try {
    const { weakSkill } = await req.json();

    if (!weakSkill) {
      return NextResponse.json(
        { error: "Weak skill is required" },
        { status: 400 }
      );
    }

    const prompt = `
You are an AI learning coach.

The user says they are weak at:
"${weakSkill}"

Create a personalized learning roadmap.

Return ONLY valid JSON in this format:

{
  "roadmap": [
    "Step 1: ...",
    "Step 2: ...",
    "Step 3: ...",
    "Step 4: ...",
    "Step 5: ...",
    "Step 6: ..."
  ]
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

    const text = completion?.choices?.[0]?.message?.content || "";

    const cleaned = text
      .replace(/```json/g, "")
      .replace(/```/g, "")
      .trim();

    const data = JSON.parse(cleaned);

    return NextResponse.json({
      roadmap: data.roadmap || [],
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { error: "Roadmap generation failed" },
      { status: 500 }
    );
  }
}