import { streamText, generateObject, generateText } from "ai";
import { openai } from '@ai-sdk/openai';
import { ScheduleSchema, TaskListSchema, TaskSuggestions, EditTaskSuggestions } from '../../../types/schedule.types';
import { buildSchedulePrompt, editSchedulePrompt, experimentalScheduleBuildPrompt, taskSuggestionPrompt, editTaskSuggestionPrompt } from "@/constants/prompt.constant";

const mainModel = openai('gpt-4o')

export async function completeScheduleGenFlow({ goals, schedule, intensity, review }) {
    try {

        // Generate a new schedule with AI based on the input and prompt
        let AISchedule
        if (review) {
            AISchedule = await improveSchedule(AISchedule, review)
        } else {
            const { taskSuggestions } = await suggestTasks(goals)
            AISchedule = await generateSchedule(schedule, intensity, taskSuggestions)
            console.log("🚀 ~ completeScheduleGenFlow ~ AISchedule:", AISchedule)
            return { schedule: AISchedule, taskSuggestions }
        }
    } catch (e) {
        throw e
    }
    // Judge the schedule by a few parameters from 1-10
    // Check if the schedule fits the parameters' standards
    // const { needsFix, improvements } = validateAndReview(AISchedule)
    // // If it doesn't, run it again with the improvement suggestions
    // // And then review it again
    // if (needsFix) completeScheduleGenFlow(AISchedule, improvements)
}

export async function suggestTasks(goals) {
    try {
        const result = await generateObject({
            model: openai('gpt-4o'),
            schema: TaskSuggestions,
            prompt: taskSuggestionPrompt(goals),
            temperature: 0,
            maxRetries: 2,
            providerOptions: { openai: { strictJsonSchema: true } }
        })
        console.log("🚀 ~ suggestTasks ~ result:", result.object)

        const usage = result.usage || result.response?.usage || null
        console.log("🚀 ~ suggestTasks ~ usage:", usage)

        return result.object;
    } catch (e) {
        throw e
    }
}

export async function suggestTasksWithMessage(schedule, message) {
    try {
        const result = await generateObject({
            model: openai('gpt-4o'),
            schema: EditTaskSuggestions,
            prompt: editTaskSuggestionPrompt(schedule, message),
            temperature: 0.2,
            maxRetries: 2,
            providerOptions: { openai: { strictJsonSchema: true } }
        })
        console.log("🚀 ~ suggestTasksWithMessage ~ result:", result.object)
        return result.object;
    } catch (e) {
        throw e
    }
}

export async function generateEditedSchedule(schedule, message, taskSuggestions) {
    const result = await generateObject({
        model: openai('gpt-4o'),
        schema: TaskListSchema,
        prompt: editSchedulePrompt(schedule, message, taskSuggestions),
        temperature: 0.2,
        maxRetries: 3,
        providerOptions: { openai: { strictJsonSchema: true } }
    })
    return result.object.taskList
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

export async function generateSchedule(schedule, intensity, taskSuggestions) {
    const { object } = await generateObject({
        model: mainModel,
        prompt: experimentalScheduleBuildPrompt(schedule, intensity, taskSuggestions),
        schema: TaskListSchema
    });
    console.log("🚀 ~ generateSchedule ~ object:", object)

    return object.taskList;
}

export async function evaluateAndFeedback(schedule) {
    const { object } = await generateObject({
        model: mainModel,
        prompt: '',
        schema: ''
    })
}

async function improveSchedule(schedule, review) {
    const { object } = await generateObject({
        model: mainModel,
        prompt: prompt,
        schema: ScheduleSchema
    })
}