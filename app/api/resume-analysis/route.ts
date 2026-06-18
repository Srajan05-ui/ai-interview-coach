import { model } from "@/lib/openrouter";

export async function POST(req: Request) {
  try {
    const { skills } = await req.json();

    if (!skills || !Array.isArray(skills)) {
      return Response.json(
        { error: "Skills array is required" },
        { status: 400 }
      );
    }

    const prompt = `
Generate exactly 10 interview questions based on these skills:

${skills.join(", ")}

Return JSON only:

{
  "questions": []
}
`;

    const result = await model.generateContent(prompt);
    const text = result.response.text();

    const cleaned = text
      .replace(/```json/g, "")
      .replace(/```/g, "")
      .trim();

    return Response.json(JSON.parse(cleaned));
  } catch (error) {
    console.error("FULL ERROR:", error);

    return Response.json(
      { error: "Failed to generate questions" },
      { status: 500 }
    );
  }
}