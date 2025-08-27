import OpenAI from 'openai'
import { jsonrepair } from 'jsonrepair'
import { buildSchedulePrompt } from '@/constants/prompt.constant'

// const openai = new OpenAI({
//   baseURL: 'https://api.deepseek.com',
//   apiKey: process.env.DEEPSEEK_API_KEY
// });
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});
export async function POST(request) {
  try {
    const { preferences, routines, goals } = await request.json();

    if (!preferences || !routines || !goals) {
      return new Response(JSON.stringify({ error: 'Missing required fields' }), {
        status: 400,
      });
    }

 
    const prompt = buildSchedulePrompt(preferences, routines, goals)


    const completion = await openai.chat.completions.create({
      model: 'gpt-4o',
      messages: [{ role: 'user', content: prompt }],
      max_tokens: 2000,
    })

    let responseContent = completion.choices[0]?.message?.content.trim()

    let schedule
    try {
      schedule = JSON.parse(responseContent)
      console.log("🚀 ~ file: route.js:140 ~ schedule:", schedule)
    } catch (error) {
      console.warn('Invalid JSON, attempting repair...')
      try {
        responseContent = jsonrepair(responseContent)
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
