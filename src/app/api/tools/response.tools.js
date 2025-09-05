import { TaskListSchema } from "@/types/schedule.types"
import { openai } from "@ai-sdk/openai"
import { generateObject } from "ai"
import { z } from "zod"
import { tool } from "ai"
import { editSchedulePrompt } from "@/constants/prompt.constant"

export const editSchedule = (schedule) => tool({
    description: 'Edit the current schedule based on user instructions',
    inputSchema: z.object({
        message: z.string().describe("What needs to change in the schedule")
    }),
    execute: async ({ message }) => {
        const result = await generateObject({
            model: openai('gpt-4o'),
            schema: TaskListSchema,
            prompt: editSchedulePrompt(schedule, message),
            temperature: 0.2,
            maxRetries: 3,
            providerOptions: { openai: { strictJsonSchema: true } }
        })
        return result.object.taskList
    }
})
