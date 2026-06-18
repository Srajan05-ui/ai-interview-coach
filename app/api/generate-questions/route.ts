import { openrouter } from "@/lib/openrouter";
import { MODEL } from "@/lib/constants";

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
      completion.choices?.[0]?.message?.content || '{"questions": []}';

    const cleaned = text
      .replace(/```json/g, "")
      .replace(/```/g, "")
      .trim();

    return Response.json(JSON.parse(cleaned));
  } catch (error) {
    console.error("GENERATE QUESTIONS ERROR:", error);

    return Response.json(
      { error: "Failed to generate questions" },
      { status: 500 }
    );
  }
}