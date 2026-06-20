import { NextResponse } from "next/server";
import mammoth from "mammoth";

export async function POST(req: Request) {
  try {
    const formData = await req.formData();

    const file = formData.get("file") as File;

    if (!file) {
      return NextResponse.json(
        {
          success: false,
          error: "No file uploaded",
        },
        { status: 400 }
      );
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    if (!file.name.toLowerCase().endsWith(".docx")) {
      return NextResponse.json(
        {
          success: false,
          error: "Only DOCX files are supported",
        },
        { status: 400 }
      );
    }

    const result = await mammoth.extractRawText({
      buffer,
    });

    return NextResponse.json({
      success: true,
      fileName: file.name,
      extractedText: result.value,
    });
  } catch (error) {
    console.error("Resume Upload Error:", error);

    return NextResponse.json(
      {
        success: false,
        error: "Failed to process resume",
      },
      { status: 500 }
    );
  }
}