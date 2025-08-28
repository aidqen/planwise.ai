import { buildSchedulePrompt, TaskSuggestionPrompt } from "@/constants/prompt.constant";
import { TaskSuggestions } from "@/types/schedule.types";
import { generateObject } from "ai";
import { openai } from "@ai-sdk/openai";
import { completeScheduleGenFlow, suggestTasks } from "../../services/schedule.service";
import { NextResponse } from "next/server";

export async function POST(request) {
    try {
        const data = await request.json()
        const { schedule, goals, intensity } = data || {}
        console.log("🚀 ~ POST ~ goals:", goals)
        console.log("🚀 ~ POST ~ data:", data)

        const result = await completeScheduleGenFlow({ goals, schedule, intensity })
        console.log("🚀 ~ POST ~ result:", result)

        return new NextResponse(JSON.stringify(result))
    } catch (err) {
        console.error("/api/experimental-ai/new error:", err)
        return new NextResponse(JSON.stringify({ error: 'Failed to generate task suggestions' }), { status: 500, headers: { 'Content-Type': 'application/json' } })
    }
}