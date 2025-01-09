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
    Return a JSON object that follows EXACTLY this structure:
    {
      "name": "${scheduleData.name}",
      "schedule": [ array of tasks with id, summary, description, start, end, category ],
      "preferences": {
        "wakeup": "HH:mm",
        "sleep": "HH:mm",
        "intensity": "low|moderate|high"
      },
      "routines": [ array of routines with name, startTime, endTime, id ],
      "goals": [ array of goals with id, name, importance ]
    }
    
    Original schedule details:
    Wake up: ${scheduleData.preferences?.wakeup}
    Sleep: ${scheduleData.preferences?.sleep}
    Intensity: ${scheduleData.preferences?.intensity}
    
    Current schedule:
    ${JSON.stringify(scheduleData, null, 2)}
    
    Important Rules:
    1. Maintain the same JSON structure exactly as shown above
    2. Keep all existing task IDs when possible
    3. For new tasks, create new unique IDs
    4. Ensure all times are in "HH:mm" 24-hour format
    5. Return ONLY the JSON object, no additional text
    6. Every minute of the day must be accounted for
    7. DO NOT modify tasks with category "routine" unless explicitly mentioned in explanation
    8. DO NOT schedule tasks before wake up time or after sleep time
    9. Keep all task categories as one of: routine, meal, break, goal
    10. Update preferences.wakeup/sleep only if specified in explanation.
    11. Keep createdAt if it exists in the original schedule
    12. DO NOT PLACE TASKS BEFORE ${scheduleData.preferences.wakeup} and AFTER ${scheduleData.preferences.sleep}.
    `;


    const completion = await openai.chat.completions.create({
      model: 'gpt-4o-2024-08-06',
      messages: [{ role: 'user', content: updatePrompt }],
      max_tokens: 2000,
      temperature: 0.3,
    });

    const content = completion.choices[0].message.content;
    const cleanContent = content.replace(/^```(?:json)?\n?|\n?```$/g, '');

    let updatedSchedule;
    try {
      updatedSchedule = JSON.parse(cleanContent);
    } catch (error) {
      console.error('Parse error:', error);
      throw new Error('Failed to parse schedule update');
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

      // Validate category
      // if (!['routine', 'meal', 'break', 'goal'].includes(task.category)) {
      //   throw new Error(`Invalid category: ${task.category}`);
      // }

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
