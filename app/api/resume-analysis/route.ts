import { NextResponse } from "next/server";
import { openrouter } from "@/lib/openrouter";
import { MODEL } from "@/lib/constants";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { resumeText } = body;

    // Validate input
    if (!resumeText || resumeText.trim() === "") {
      return NextResponse.json(
        {
          success: false,
          error: "Resume text is required",
        },
        {
          status: 400,
        }
      );
    }

    // AI Prompt
    const prompt = `
Analyze the following resume.

Return ONLY valid JSON.

{
  "summary": "",
  "skills": [],
  "strengths": [],
  "weaknesses": [],
  "suggestions": []
}

Resume:
${resumeText}
`;

    // OpenRouter API Call
    const completion = await openrouter.chat.completions.create({
      model: MODEL,
      messages: [
        {
          role: "user",
          content: prompt,
        },
      ],
    });

    const analysis =
      completion.choices?.[0]?.message?.content || "";

    if (!analysis) {
      throw new Error("No response received from AI");
    }

    // Remove markdown formatting if AI returns it
    const cleaned = analysis
      .replace(/```json/g, "")
      .replace(/```/g, "")
      .trim();

    let parsedResponse;

    try {
      parsedResponse = JSON.parse(cleaned);
    } catch {
      throw new Error("Invalid JSON returned by AI");
    }

    return NextResponse.json({
      success: true,
      data: parsedResponse,
    });

  } catch (error) {
    console.error("Resume Analysis Error:", error);

    return NextResponse.json(
      {
        success: false,
        error: "Failed to analyze resume",
      },
      {
        status: 500,
      }
    );
  }
}
