import { scheduleAssistantPrompt } from "@/constants/prompt.constant";
import { streamText, stepCountIs } from "ai";
import { openai } from "@ai-sdk/openai";
import { editSchedule, fetchGoogleEvents } from "../../tools/response.tools";

export async function POST(request) {
    try {
        const data = await request.json()
        console.log("🚀 ~ POST ~ data:", data)
        const { schedule, messages } = data || {}
        console.log("🚀 ~ POST ~ schedule:", schedule)
        
        const formattedMessages = messages.map(msg => ({
            role: msg.role,
            content: msg.parts?.[0]?.text || ""
        }));
        
        const result = streamText({
            model: openai('gpt-4o'),
            messages: formattedMessages,
            system: scheduleAssistantPrompt(schedule),
            tools: {
                editSchedule: editSchedule(schedule),
                fetchGoogleEvents
            },
            stopWhen: stepCountIs(3)
        })

        return result.toUIMessageStreamResponse()
    } catch (err) {
        console.error("/api/experimental-ai/new error:", err)
        return new NextResponse(JSON.stringify({ error: 'Failed to generate task suggestions' }), { status: 500, headers: { 'Content-Type': 'application/json' } })
    }
}