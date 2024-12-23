import OpenAI from 'openai'
import { jsonrepair } from 'jsonrepair'

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY, // API key stored in .env
})

export async function POST(request) {
  try {
    const { preferences, routines, goals, timezone } = await request.json()

    if (!preferences || !routines || !goals) {
      return new Response(JSON.stringify({ error: 'Missing required fields' }), {
        status: 400,
      })
    }

    const prompt = `You are an AI assistant that generates optimized daily schedules based on the user's preferences, routines, and goals. Your task is to create a daily schedule that strictly respects routines, includes meals and morning/night routines, and effectively allocates time to goals based on their importance. Every hour of the day must be accounted for, with no gaps left unscheduled.

**Instructions**:
- Always return a valid JSON array of objects.
- Each object must have the following keys:
  - "id" (string): A unique identifier for the task.
  - "summary" (string): The task name.
  - "description" (string): A brief description of the task.
  - "timeZone" (string): Use this time zone: "${timezone}".
  - "start" (string): Start time in "hh:mm" format (24-hour).
  - "end" (string): End time in "hh:mm" format (24-hour).
- Do not include additional text, explanations, or comments outside the JSON.

---

**Rules**:

1. **Routines and Meals**:
   - Morning and night routines must always be included.
   - Include three meals (breakfast, lunch, dinner):
     - Breakfast: Within 1 hour of wake-up time.
     - Lunch: Between 12:00 and 14:00.
     - Dinner: Between 18:00 and 20:00.
   - Meals may overlap with flexible tasks.

2. **Intensity-Based Scheduling**:
   - For **intense**, the entire day must be filled with tasks, leaving minimal room for breaks, but still accounting for short recovery breaks.
   - For **medium**, mix tasks and breaks evenly, allowing time for both work and relaxation.
   - For **relaxed**, prioritize frequent and longer breaks, with fewer tasks spread across the day.

3. **Breaks**:
   - Breaks should always be explicitly included in the schedule to cover any gaps between tasks.
   - Examples of breaks include:
     - "Short Break" (15-30 minutes).
     - "Relaxation Time" (30 minutes to 1 hour).
     - "Outdoor Walk" (specific to evenings or afternoons).

4. **Goals**:
   - Allocate more time to high-importance goals.
   - Break medium- and low-importance goals into smaller tasks with clear descriptions.
   - Schedule tasks around routines, meals, and breaks, ensuring proper time allocation.

5. **Ensure No Gaps**:
   - **Every hour of the day must be filled** with either a task, break, or meal.
   - Gaps between tasks must be explicitly scheduled as breaks or additional tasks.
   - Example:
     
     {
       "id": "break1",
       "summary": "Short Break",
       "description": "Take a short break to recharge",
       "start": "16:30",
       "end": "17:00",
       "timeZone": "${timezone}"
     }
     

---

**Preferences**:
- Wake: ${preferences.wakeup}
- Sleep: ${preferences.sleep}
- Intensity: ${preferences.intensity}

**Routines**:
${routines?.map(r => `Routine: ${r.name}: Start: ${r.startTime}, End: ${r.endTime}`).join('\n')}

**Goals**:
${goals?.map(g => `Goal: ${g.name}, Importance: ${g.importance}`).join('\n')}

---

**Output Example**:
[
  {
    "id": "t1",
    "summary": "Morning Routine",
    "description": "Hygiene and getting dressed for the day",
    "start": "07:00",
    "end": "07:30",
    "timeZone": "${timezone}"
  },
  {
    "id": "t2",
    "summary": "Breakfast",
    "description": "Enjoy a nutritious breakfast",
    "start": "07:30",
    "end": "08:00",
    "timeZone": "${timezone}"
  },
  {
    "id": "break1",
    "summary": "Short Break",
    "description": "Take a short break to relax",
    "start": "16:30",
    "end": "17:00",
    "timeZone": "${timezone}"
  },
  {
    "id": "t10",
    "summary": "Evening Routine",
    "description": "Relax and prepare for bed",
    "start": "22:00",
    "end": "22:30",
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
