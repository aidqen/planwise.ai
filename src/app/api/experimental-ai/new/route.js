import { completeScheduleGenFlow } from "../../services/schedule.service";
import { NextResponse } from "next/server";

export async function POST(request) {
    try {
        const data = await request.json()
        const { schedule, goals, intensity } = data || {}
        console.log("🚀 ~ POST ~ data:", data)

        const result = await completeScheduleGenFlow({ goals, schedule, intensity })
        console.log("🚀 ~ POST ~ result:", result)

        return new NextResponse(JSON.stringify({schedule: result.schedule, taskSuggestions: result.taskSuggestions}))
    } catch (err) {
        console.error("/api/experimental-ai/new error:", err)
        throw new Error('Failed to generate task suggestions')
    }
}