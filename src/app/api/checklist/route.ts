import { NextRequest, NextResponse } from "next/server";
import Anthropic from "@anthropic-ai/sdk";
import { RawTasksSchema } from "@/lib/types";

// Initialize the Anthropic client
const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

// In-memory cache for today's tasks
let cache: {
  date: string;
  tasks: string[];
} | null = null;

// Default tasks to use as fallback
const DEFAULT_TASKS = [
  "Drink 8 glasses of water",
  "Take a 10-minute walk",
  "Practice mindful breathing for 5 minutes",
] satisfies string[];

// Helper to get today's date as a string in format YYYY-MM-DD
const getTodayDateString = () => {
  return new Date().toISOString().split("T")[0];
};

// Generate a checklist of 3 simple self-improvement tasks
async function generateChecklist(): Promise<string[]> {
  try {
    const prompt = `Generate a list of 3 simple self-improvement tasks for today. These should be quick, actionable tasks that can be easily completed in a day, such as "Drink 8 glasses of water", "Take a 10-minute walk", or "Practice deep breathing for 5 minutes". 

Please respond with ONLY a JSON array of 3 strings, each string being a task. Example format:
["Drink 8 glasses of water", "Take a 10-minute walk", "Read for 15 minutes"]`;

    const response = await anthropic.messages.create({
      model: "claude-3-sonnet-20240229",
      max_tokens: 1000,
      system:
        "You are a helpful assistant that generates simple, achievable daily self-improvement tasks. Respond only with a valid JSON array of 3 string tasks.",
      messages: [{ role: "user", content: prompt }],
    });

    // Extract content from the response
    const content =
      response.content[0].type === "text" ? response.content[0].text : "";

    // Parse and validate the JSON response
    try {
      const parsedContent = JSON.parse(content);
      // Validate that we have exactly 3 string tasks
      const tasks = RawTasksSchema.parse(parsedContent);
      return [...tasks]; // Return a new mutable array
    } catch (parseError) {
      console.error("Error parsing or validating tasks:", parseError);
      return [...DEFAULT_TASKS]; // Return a new mutable array
    }
  } catch (error) {
    console.error("Error generating checklist:", error);
    return [...DEFAULT_TASKS]; // Return a new mutable array
  }
}

export async function GET(request: NextRequest) {
  const today = getTodayDateString();

  // Return cached tasks if they exist for today
  if (cache && cache.date === today) {
    return NextResponse.json({ tasks: cache.tasks });
  }

  // Generate new tasks for today
  const tasks = await generateChecklist();

  // Cache the tasks for today
  cache = {
    date: today,
    tasks,
  };

  return NextResponse.json({ tasks });
}
