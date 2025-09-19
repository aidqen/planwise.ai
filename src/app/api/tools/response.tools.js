import { TaskListSchema } from "@/types/schedule.types"
import { openai } from "@ai-sdk/openai"
import { generateObject } from "ai"
import { z } from "zod"
import { tool } from "ai"
import { editSchedulePrompt } from "@/constants/prompt.constant"
import { suggestTasksWithMessage, generateEditedSchedule } from "../services/schedule.service"
import { getServerSession } from "next-auth"
import { authOptions } from "../auth/[...nextauth]/route"
import { fetchGoogleCalendarEventsByDate } from "../services/calendar.service"

export const editSchedule = (schedule) => {
    return tool({
        description: 'Edit the current schedule based on user instructions',
        inputSchema: z.object({
            message: z.string().describe("What needs to change in the schedule")
        }),
        execute: async ({ message }) => {
            console.log("🚀 ~ editSchedule ~ schedule:", schedule)
            try {
                // Step 1: Generate task suggestions with recommended time slots based on user message
                const { taskSuggestions } = await suggestTasksWithMessage(schedule, message);
                // Step 2: Generate the complete edited schedule incorporating the suggestions
                const editedSchedule = await generateEditedSchedule(schedule, message, taskSuggestions);
                return editedSchedule;
            }
            catch (error) {
                console.error("Error in editSchedule tool:", error);
                throw error;
            }
        }
    });
}

export const fetchGoogleEvents = tool({
    description: 'Fetch events from Google Calendar.',
    inputSchema: z.object({
        date: z.string().describe("The date to fetch events for (YYYY-MM-DD format)")
    }),
    execute: async ({ date }) => {
        try {
            const events = await fetchGoogleCalendarEventsByDate(date)
            return events
        } catch (error) {
            console.error('Error fetching Google events:', error);
            throw new Error(`Failed to fetch Google Calendar events: ${error.message}`);
        }
    }
})
