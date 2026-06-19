import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export async function GET() {
  try {
    const { data, error } = await supabase
      .from("interviews")
      .select("id, created_at, total_score, feedback")
      .order("created_at", { ascending: false });

    if (error) {
      return NextResponse.json(
        { error: error.message },
        { status: 500 }
      );
    }

    const history = data.map((item) => ({
      interviewId: item.id,
      date: item.created_at,
      overallScore: item.total_score,
      feedback: item.feedback,
    }));

    return NextResponse.json(history);
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { error: "Failed to fetch interview history" },
      { status: 500 }
    );
  }
}