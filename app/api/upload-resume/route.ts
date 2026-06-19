import { NextResponse } from "next/server";
import pdfParse from "pdf-parse";
import mammoth from "mammoth";

export async function POST(req: Request) {
  try {
    const formData = await req.formData();

    const file = formData.get("file") as File;

    if (!file) {
      return NextResponse.json(
        {
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
    if (file.name.endsWith(".pdf")) {
      const pdfData = await pdfParse(buffer);
      extractedText = pdfData.text;
    }

    // DOCX
    else if (file.name.endsWith(".docx")) {
      const result = await mammoth.extractRawText({
        buffer,
      });

      extractedText = result.value;
    }

    else {
      return NextResponse.json(
        {
          error:
            "Only PDF and DOCX files are supported",
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
    console.error(
      "Resume Upload Error:",
      error
    );

    return NextResponse.json(
      {
        success: false,
        error:
          "Failed to process resume",
      },
      {
        status: 500,
      }
    );
  }
}