import OpenAI from 'openai';
import { NextResponse } from 'next/server';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(request) {
  try {
    const { scheduleData, explanation } = await request.json();
    console.log("🚀 ~ file: route.js:11 ~ scheduleData:", scheduleData)

    const updatePrompt = `You are an AI assistant that modifies daily schedules to make the user's life better. Based on this explanation of changes:
    ${explanation}
    
    Create an updated version of the schedule that implements these changes.
    Return a JSON object that follows EXACTLY this structure, with no additional text or formatting:
    {
      "id": "${scheduleData._id}",
      "schedule": [ array of tasks with id, summary, description, start, end, category ],
      "preferences": {
        "wakeup": "HH:mm",
        "sleep": "HH:mm",
        "intensity": "low|moderate|high"
      }
    }
    
    Original schedule details:
    Wake up: ${scheduleData.preferences?.wakeup}
    Sleep: ${scheduleData.preferences?.sleep}
    Intensity: ${scheduleData.preferences?.intensity}
    
    Current schedule:
    ${JSON.stringify(scheduleData, null, 2)}
    
    Important Rules:
    1. Return ONLY valid JSON - no markdown, no backticks, no explanations
    2. Keep all existing task IDs when possible
    3. For new tasks, create new unique IDs using format "task_[number]"
    4. Ensure all times are in "HH:mm" 24-hour format (e.g. "09:00", "14:30")
    5. Every minute of the day must be accounted for
    6. DO NOT modify tasks with category "routine" unless explicitly mentioned
    7. DO NOT schedule tasks before ${scheduleData.preferences.wakeup} or after ${scheduleData.preferences.sleep}
    8. Keep task categories as: "routine", "meal", "break", or "goal"
    9. Update preferences.wakeup/sleep only if specified in explanation
    10. Keep createdAt if it exists in the original schedule
    11. Keep the schedule id exactly as provided
    12. Ensure all JSON strings are properly escaped`;

    const completion = await openai.chat.completions.create({
      model: 'gpt-4',
      messages: [{ role: 'user', content: updatePrompt }],
      max_tokens: 2000,
      temperature: 0.3,
    });

    const content = completion.choices[0].message.content;
    console.log("🚀 ~ file: route.js:62 ~ content:", content)
    
    let updatedSchedule;
    try {
      // Remove any potential markdown or code block formatting
      const cleanContent = content.replace(/^```(?:json)?\s*|\s*```$/g, '').trim();
      console.log("Cleaned content:", cleanContent);
      
      updatedSchedule = JSON.parse(cleanContent);
    } catch (error) {
      console.error('Parse error:', error);
      console.error('Content received:', content);
      throw new Error(`Failed to parse schedule update: ${error.message}`);
    }

    if (!Array.isArray(updatedSchedule.schedule)) {
      throw new Error('Updated schedule must be an array');
    }

    // Validate each task
    updatedSchedule.schedule.forEach(task => {
      const requiredFields = ['id', 'summary', 'description', 'start', 'end', 'category'];
      requiredFields.forEach(field => {
        if (!task[field]) {
          throw new Error(`Task missing required field: ${field}`);
        }
      });

      // Validate time format
      const timeRegex = /^([0-1][0-9]|2[0-3]):[0-5][0-9]$/;
      if (!timeRegex.test(task.start) || !timeRegex.test(task.end)) {
        throw new Error(`Invalid time format for task: ${task.id}`);
      }
    });

    // Return the complete updated schedule object
    return NextResponse.json({
      ...updatedSchedule,
      updatedAt: Date.now()
    });
  } catch (error) {
    console.error('Update error:', error);
    return NextResponse.json(
      { error: 'Failed to update schedule', details: error.message },
      { status: 500 }
    );
  }
}
