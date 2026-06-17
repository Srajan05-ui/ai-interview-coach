import { openrouter } from "@/lib/openrouter";

export async function GET() {
  try {
    const completion = await openrouter.chat.completions.create({
      model: "google/gemma-4-31b-it:free",
      messages: [
        {
          role: "user",
          content: "Say hello",
        },
      ],
    });

    return Response.json({
      success: true,
      response: completion.choices[0].message.content,
    });
  } catch (error) {
    return Response.json({
      success: false,
      error: String(error),
    });
  }
}