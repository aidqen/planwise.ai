import { streamText, generateObject, generateText } from "ai";
import { openai } from '@ai-sdk/openai';
import { ScheduleSchema } from '../../../types/schedule.types';

const mainModel = openai('gpt-4o')

export async function completeScheduleGenFlow(input) {
    // Generate a new schedule with AI based on the input and prompt
    const schedule = generateSchedule(input)
    // Judge the schedule by a few parameters from 1-10
    // Check if the schedule fits the parameters' standards
    const { needsFix, review } = validateAndReview(schedule)
    // If it doesn't, run it again with the improvement suggestions
    // And then review it again
    if (needsFix) improveSchedule(schedule, review)
}

export async function streamResponse(messages) {
    const result = streamText({
        model: mainModel,
        messages: messages,
        system: '',
        tools: ''
    })

    return result.toUIMessageStreamResponse();
}

function validateAndReview(schedule, preferences, goals, routines) {
    // Receive preferences, goals, routines
    // Checks if the schedule follows the routines precisely and if not returns false
    // Checks if the schedule adds enough tasks following the goals and returns a score from 1-10
    // Checks if the schedule is according to preferences
    // Gives an overall score of the schedule from 1-10
    
    const result = generateObject({
        model: mainModel,
        system: prompt,
        
    })
    
}

export async function generateSchedule(prompt) {
    const { object } = await generateObject({
        model: mainModel,
        prompt: prompt,
        schema: ScheduleSchema
    });

    return object;
}

async function improveSchedule(schedule, review) {
    const { object } = await generateObject({
        model: mainModel,
        prompt: prompt,
        schema: ScheduleSchema
    })
}