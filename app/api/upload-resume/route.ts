import { NextResponse } from "next/server";
import mammoth from "mammoth";

export async function POST(req: Request) {
  try {
    console.log("NEW UPLOAD ROUTE RUNNING");
    const formData = await req.formData();

    const file = formData.get("file") as File;

    if (!file) {
      return NextResponse.json(
        {
          success: false,
          error: "No file uploaded",
        },
        {
          status: 400,
        }
      );
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    let extractedText = "";

    // PDF
    if (file.name.toLowerCase().endsWith(".pdf")) {
      const pdfParse = (await import("pdf-parse")).default;

      const pdfData = await pdfParse(buffer);

      extractedText = pdfData.text;
    }

    // DOCX
    else if (file.name.toLowerCase().endsWith(".docx")) {
      const result = await mammoth.extractRawText({
        buffer,
      });

      extractedText = result.value;
    }

    // Invalid file
    else {
      return NextResponse.json(
        {
          success: false,
          error: "Only PDF and DOCX files are supported",
        },
        {
          status: 400,
        }
      );
    }

    return NextResponse.json({
      success: true,
      fileName: file.name,
      extractedText,
    });
  } catch (error) {
    console.error("Resume Upload Error:", error);

    return NextResponse.json(
      {
        success: false,
        error: "Failed to process resume",
      },
      {
        status: 500,
      }
    );
  }
}