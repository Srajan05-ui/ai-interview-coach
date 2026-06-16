import { model } from "@/lib/gemini";

export async function GET() {
  try {
    const result = await model.generateContent(
      "Say Gemini Connected Successfully"
    );

    return Response.json({
      success: true,
      message: result.response.text(),
    });
  } catch (error) {
    return Response.json({
      success: false,
      error: String(error),
    });
  }
}