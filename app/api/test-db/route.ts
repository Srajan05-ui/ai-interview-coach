import { supabase } from "@/lib/supabase";

export async function GET() {
  const { data, error } = await supabase
    .from("resumes")
    .select("*");

  return Response.json({
    success: !error,
    data,
    error,
  });
}