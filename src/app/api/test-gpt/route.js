import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY, // API key stored in .env
});

export async function POST(request) {
  try {
    const { preferences, routines, goals } = await request.json();

    if (!preferences || !routines || !goals) {
      return new Response(JSON.stringify({ error: "Missing required fields" }), {
        status: 400,
      });
    }

    // Prompt to send to GPT-3.5
    const prompt = `
      Based on the following preferences, routines, and goals, create an optimized daily schedule in JSON format.

      Preferences: ${preferences}
      Routines: ${routines}
      Goals: ${goals}

      Output the schedule in the following JSON format:
      [
        {
          "summary": "Task Name",
          "description": "Details about the task",
          "start": "YYYY-MM-DDTHH:MM:SS±HH:MM",
          "end": "YYYY-MM-DDTHH:MM:SS±HH:MM",
          "timeZone": "Time Zone"
        }
      ]
    `;

    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: prompt }],
      max_tokens: 1000, // Adjust as needed
    });

    const responseContent = completion.choices[0]?.message?.content;

    // Validate JSON output
    let schedule;
    try {
      schedule = JSON.parse(responseContent);
    } catch (error) {
      throw new Error("Invalid JSON format returned by GPT-3.5");
    }

    return new Response(JSON.stringify({ schedule }), { status: 200 });
  } catch (error) {
    console.error("Error:", error.message);
    return new Response(
      JSON.stringify({ error: "Failed to generate schedule" }),
      { status: 500 }
    );
  }
}
