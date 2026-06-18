import { openrouter } from "@/lib/openrouter";
import { MODEL } from "@/lib/constants";
const completion = await openrouter.chat.completions.create({
  model: MODEL,
  messages: [
    {
      role: "user",
      content: "Generate 10 interview questions on Python"
    }
  ]
});