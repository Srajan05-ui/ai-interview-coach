import { openrouter } from "@/lib/openrouter";
import { MODEL } from "@/lib/constants";

export async function GET() {
  try {
    const completion = await openrouter.chat.completions.create({
      model: MODEL,
      messages: [
        {
          role: "user",
          content: "Say hello"
        }
      ]
    });

    return Response.json({
      success: true,
      response: completion.choices[0].message.content
    });

  } catch (error: any) {
    return Response.json({
      success: false,
      error: error.message
    });
  }
}