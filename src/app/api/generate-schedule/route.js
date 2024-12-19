import OpenAI from 'openai'
import { jsonrepair } from 'jsonrepair'

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY, // API key stored in .env
})

export async function POST(request) {
  try {
    console.log('request:', request)
    const { preferences, routines, goals } = await request.json()

    if (!preferences || !routines || !goals) {
      return new Response(JSON.stringify({ error: 'Missing required fields' }), {
        status: 400,
      })
    }

    const prompt = `
      You are an AI assistant that generates daily schedules.

      **Scheduling Rules**:
        - Do not overlap tasks or place two tasks at the same time.
        - Add morning routine between when you wake up and 30 minutes afterwards.
        - The schedule should be optimized based on the intensity:
            - For moderate intensity: Include some breaks but not too many.
            - For high intensity: Include more tasks and fewer breaks.
            - For relaxed intensity: include more breaks and fewer tasks.
        - Routines must stay between the start time and end time.
        - Try to include all of the goals within the day without exceeding sleep time.
        - Add night routine 30 minutes before sleep time.
        - For goals, you want to generate tasks to help you achieve them.

      **Preferences**:
      - Wake: ${preferences.wakeup}
      - Sleep: ${preferences.sleep}
      - Intensity: ${preferences.intensity}

      **Routines**:
      ${routines?.map(r => `${r.title}: ${r.start} - ${r.end}`).join('\n')}

      **Goals**:
      ${goals?.map(g => g.title).join(', ')}

      Generate a valid JSON schedule like this:
      [
        {
            "summary": "Workout",
            "description": "Morning workout session",
            "timeZone": "America/Los_Angeles",
            "start": "12:00",
            "end": "13:00",
        },
      ]
            `
            // "start": "2024-12-18T07:30:00-07:00",
            // "end": "2024-12-18T08:30:00-07:00",

    const completion = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [{ role: 'user', content: prompt }],
      max_tokens: 1500,
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
