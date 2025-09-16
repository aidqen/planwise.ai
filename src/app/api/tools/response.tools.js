import { TaskListSchema } from "@/types/schedule.types"
import { openai } from "@ai-sdk/openai"
import { generateObject } from "ai"
import { z } from "zod"
import { tool } from "ai"
import { editSchedulePrompt } from "@/constants/prompt.constant"
import { suggestTasksWithMessage, generateEditedSchedule } from "../services/schedule.service"
import { getServerSession } from "next-auth"
import { authOptions } from "../auth/[...nextauth]/route"
import { google } from "googleapis"

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
            const session = await getServerSession(authOptions)
            if (!session?.accessToken) {
                throw new Error("No access token available");
            }

            const auth = new google.auth.OAuth2(
                process.env.GOOGLE_CLIENT_ID,
                process.env.GOOGLE_CLIENT_SECRET
            );
            auth.setCredentials({ 
                access_token: session.accessToken,
                refresh_token: session.refreshToken 
            });

            const calendar = google.calendar({ version: "v3", auth });

            const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone || 'UTC';

            const start = new Date(`${date}T00:00:00`);
            const end = new Date(`${date}T23:59:59`);


            const { data } = await calendar.events.list({
                calendarId: "primary",
                singleEvents: true,
                orderBy: "startTime",
                timeMin: start.toISOString(),
                timeMax: end.toISOString(),
                timeZone,
                maxResults: 25,
            });

            const events = (data.items ?? []).map(e => ({
                id: e.id,
                summary: e.summary ?? '',
                start: e.start?.dateTime ?? e.start?.date ?? null,
                end: e.end?.dateTime ?? e.end?.date ?? null,
                location: e.location ?? null,
                attendees: e.attendees ?? [],
                hangoutLink: e.hangoutLink ?? null,
            }));

            return events;
        } catch (error) {
            console.error('Error fetching Google events:', error);
            throw new Error(`Failed to fetch Google Calendar events: ${error.message}`);
        }
    }
})