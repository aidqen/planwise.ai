import OpenAI from 'openai';
import { NextResponse } from 'next/server';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(request) {
  try {
    const { schedule, explanation } = await request.json();

    const updatePrompt = `You are an AI assistant that modifies daily schedules. Based on this explanation of changes:
${explanation}

Create an updated version of the schedule that implements these changes.
Return ONLY a valid JSON array that follows exactly the same format as the original schedule.
Each task in the array must have these exact keys: id, summary, description, start, end, category

Original schedule for reference:
${JSON.stringify(schedule, null, 2)}

Important Rules:
1. Maintain the same JSON structure exactly
2. Keep all existing task IDs when possible
3. For new tasks, create new unique IDs
4. Ensure all times are in "HH:mm" 24-hour format
5. Return ONLY the JSON array, no additional text or explanations
6. Every minute of the day must be accounted for`;

    const completion = await openai.chat.completions.create({
      model: 'gpt-4o-2024-08-06',
      messages: [{ role: 'user', content: updatePrompt }],
      max_tokens: 2000,
      temperature: 0.3,
    });

    const content = completion.choices[0].message.content;
    console.log('Raw GPT response:', content);

    // Remove any markdown or backticks if present
    const cleanContent = content.replace(/^```(?:json)?\n?|\n?```$/g, '');
    console.log('Cleaned content:', cleanContent);

    let updatedSchedule;
    try {
      updatedSchedule = JSON.parse(cleanContent);
    } catch (error) {
      console.error('Parse error:', error);
      throw new Error('Failed to parse schedule update');
    }

    if (!Array.isArray(updatedSchedule)) {
      throw new Error('Updated schedule must be an array');
    }

    updatedSchedule.forEach(task => {
      const requiredFields = ['id', 'summary', 'description', 'start', 'end', 'category'];
      requiredFields.forEach(field => {
        if (!task[field]) {
          throw new Error(`Task missing required field: ${field}`);
        }
      });
    });

    return NextResponse.json(updatedSchedule);
  } catch (error) {
    console.error('Update error:', error);
    return NextResponse.json(
      { error: 'Failed to update schedule', details: error.message },
      { status: 500 }
    );
  }
}
