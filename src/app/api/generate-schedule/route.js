import OpenAI from 'openai'
import { jsonrepair } from 'jsonrepair'

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY, // API key stored in .env
})

export async function POST(request) {
  try {
    const { preferences, routines, goals, timezone } = await request.json()
    console.log('timezone:', timezone)
    console.log('preferences:', preferences)
    console.log('routines:', routines)
    console.log('goals:', goals)

    if (!preferences || !routines || !goals) {
      return new Response(JSON.stringify({ error: 'Missing required fields' }), {
        status: 400,
      })
    }

    // **Scheduling Rules**:
    //   - Do not overlap tasks or place two tasks at the same time.
    //   - Add morning routine between when you wake up and 30 minutes afterwards.
    //   - The schedule should be optimized based on the intensity:
    //       - For moderate intensity: Include some breaks but not too many.
    //       - For high intensity: Include more tasks and fewer breaks.
    //       - For relaxed intensity: include more breaks and fewer tasks.
    //   - Routines must stay between the start time and end time.
    //   - Try to include all of the goals within the day without exceeding sleep time.
    //   - Add night routine 30 minutes before sleep time.
    //   - For goals, you want to generate tasks to help you achieve them.
    const prompt = `
You are an AI assistant that generates optimized daily schedules based on the user's preferences, routines, and goals. Your task is to create a daily schedule that strictly respects routines, includes meals and morning/night routines, and effectively allocates time to goals based on their importance.

**Instructions**:
- Always return a valid JSON array of objects.
- Each object must have the following keys:
  - "id" (string): A unique identifier for the task.
  - "summary" (string): The task name.
  - "description" (string): A brief description of the task.
  - "timeZone" (string): Use this time zone: "${timezone}".
  - "start" (string): Start time in ISO 8601 timestamp.
  - "end" (string): End time in ISO 8601 timestamp.
- Do not include additional text, explanations, or comments outside the JSON.

**Rules for Including Routines**:
- Routines are fixed tasks and must be included as provided.
- Do not modify the "start" and "end" times of routines.
- Example Routine:
  Input: "Work: 09:00 - 17:00"
  Output:
  {
    "id": "routine1",
    "summary": "Work",
    "description": "Scheduled work hours",
    "start": "2024-12-18T09:00:00+02:00",
    "end": "2024-12-18T17:00:00+02:00",
    "timeZone": "${timezone}"
  }

**Rules for Meals**:
- Include 3 meals in the schedule:
  - **Breakfast**: 30 minutes within 1 hour of wake-up time.
  - **Lunch**: 1 hour between 12:00 PM and 2:00 PM, which can overlap with work or other activities.
  - **Dinner**: 1 hour between 6:00 PM and 8:00 PM.
- Meals can overlap with other tasks (e.g., lunch can occur during work).
- Example:
  {
    "id": "meal1",
    "summary": "Lunch",
    "description": "Enjoy a quick lunch break during work",
    "start": "2024-12-18T12:00:00+02:00",
    "end": "2024-12-18T13:00:00+02:00",
    "timeZone": "${timezone}"
  }

**Rules for Morning and Night Routines**:
- Morning routine starts **30 minutes after wake-up time** and lasts 30 minutes.
- Night routine starts **30 minutes before sleep time** and lasts 30 minutes.
- These routines must be included in the schedule.
- Example:
  {
    "id": "routine2",
    "summary": "Morning Routine",
    "description": "Prepare for the day",
    "start": "2024-12-18T07:00:00+02:00",
    "end": "2024-12-18T07:30:00+02:00",
    "timeZone": "${timezone}"
  }

**Rules for Allocating Goals**:
- Goals should be scheduled **around routines and meals** and must not overlap with fixed routines like morning or night routines.
- Allocate more time to high-importance goals.
- If a goal has "medium" or "low" importance, allocate shorter tasks.
- Break goals into smaller tasks if needed.
- Example:
  Input: "Develop my app: high importance"
  Output:
  [
    {
      "id": "goal1",
      "summary": "Develop my app",
      "description": "Morning app development session",
      "start": "2024-12-18T08:00:00+02:00",
      "end": "2024-12-18T09:00:00+02:00",
      "timeZone": "${timezone}"
    },
    {
      "id": "goal2",
      "summary": "Develop my app",
      "description": "Afternoon app development session",
      "start": "2024-12-18T17:30:00+02:00",
      "end": "2024-12-18T19:00:00+02:00",
      "timeZone": "${timezone}"
    }
  ]

**Preferences**:
- Wake: ${preferences.wakeup}
- Sleep: ${preferences.sleep}
- Intensity: ${preferences.intensity}

**Routines**:
${routines?.map(r => `Routine: ${r.name}: Start: ${r.startTime}, End: ${r.endTime}`).join('\n')}

**Goals**:
${goals?.map(g => `Goal: ${g.text}, Importance: ${g.importance}`).join('\n')}

**Output Example**:
[
  {
    "id": "routine1",
    "summary": "Work",
    "description": "Scheduled work hours",
    "start": "2024-12-18T09:00:00+02:00",
    "end": "2024-12-18T17:00:00+02:00",
    "timeZone": "${timezone}"
  },
  {
    "id": "meal1",
    "summary": "Lunch",
    "description": "Enjoy a quick lunch break during work",
    "start": "2024-12-18T12:00:00+02:00",
    "end": "2024-12-18T13:00:00+02:00",
    "timeZone": "${timezone}"
  },
  {
    "id": "routine2",
    "summary": "Morning Routine",
    "description": "Prepare for the day",
    "start": "2024-12-18T07:00:00+02:00",
    "end": "2024-12-18T07:30:00+02:00",
    "timeZone": "${timezone}"
  }
]
`;


    const completion = await openai.chat.completions.create({
      model: 'gpt-4',
      messages: [{ role: 'user', content: prompt }],
      max_tokens: 2000,
    })

    let responseContent = completion.choices[0]?.message?.content.trim()
    console.log('GPT Response:', responseContent)

    let schedule
    try {
      schedule = JSON.parse(responseContent)
    } catch (error) {
      console.warn('Invalid JSON, attempting repair...')
      try {
        responseContent = jsonrepair(responseContent)
        console.log('Repaired JSON:', responseContent)
        schedule = JSON.parse(responseContent)
      } catch (repairError) {
        console.error('Failed to repair JSON:', repairError.message)
        throw new Error('Invalid JSON format from GPT')
      }
    }

    return new Response(JSON.stringify({ schedule }), { status: 200 })
  } catch (error) {
    console.error('Error:', error.message)
    return new Response(
      JSON.stringify({ error: 'Failed to generate schedule', details: error.message }),
      { status: 500 }
    )
  }
}
