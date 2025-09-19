import { generateSchedule2, scheduleService } from '@/services/schedule.service'
import { ADD_TASK_TO_AI_SCHEDULE, REORDER_GOALS, RESET_SCHEDULE, SET_SCHEDULE } from '../reducers/schedule.reducer'
import { store } from '../store'
import { userService } from '@/services/user.service'
import { addScheduleToUser, appendScheduleToUserState, deleteScheduleFromUser, getLocalUser } from './user.actions'
import { makeId } from '@/services/util.service'

export async function saveScheduleToRedux(schedule) {
    store.dispatch({
        type: SET_SCHEDULE,
        schedule
    })
}

export async function generateAiSchedule(parameters) {
    var { preferences, routines, goals } = parameters;
    try {
        const user = store.getState().userModule.user
        const aiResponse = await scheduleService.fetchAiSchedule({ preferences, routines, goals });
        console.log("🚀 ~ generateAiSchedule ~ aiResponse:", aiResponse)
        const scheduleToSave = formatSchedule(aiResponse.schedule, preferences, routines, goals, user);
        const schedule = await saveScheduleToDB(scheduleToSave);
        await addScheduleToUser(schedule);
        store.dispatch(getCmdAiSchedule(scheduleToSave));
        appendScheduleToUserState(schedule)
        return schedule
    } catch (err) {
        throw err;
    }
}

export async function updateSchedule(schedule) {
    try {
        scheduleService.updateSchedule(schedule)
    } catch (err) {
        throw err
    }
}

export function reorderGoals(newOrder) {
    return {
        type: REORDER_GOALS,
        payload: newOrder,
    }
}

export async function deleteSchedule(id) {
    try {
        const user = getLocalUser()
        await scheduleService.deleteScheduleById(id, user?._id)
        deleteScheduleFromUser(id)
    } catch (error) {
        throw error
    }
}


async function saveScheduleToDB(schedule) {
    return await scheduleService.insertScheduleToDB(schedule)
}

function formatSchedule(scheduleInput, preferences, routines, goals, user) {
    if (!scheduleInput) return
    const now = new Date()
    const timestamp = now.getTime()

    // Normalize to array of tasks (support array or { schedule: Task[] })
    const tasks = Array.isArray(scheduleInput) ? scheduleInput : scheduleInput?.schedule

    if (!Array.isArray(tasks)) {
       throw 'An error occured'
    }

    // Add unique IDs to each task in the schedule - shorter and unique only to this schedule
    const scheduleWithIds = tasks.map((task, index) => {
        // Create a shorter ID using just index and a small random component
        const uniqueId = `t${index}_${Math.random().toString(36).substring(2, 6)}`
        return { ...task, id: uniqueId }
    })

    return {
        name: 'Daily Schedule',
        schedule: scheduleWithIds,
        createdAt: timestamp,
        updatedAt: timestamp,
        preferences,
        routines,
        goals, 
        creator: { id: user?._id, name: user?.name },
        chat: []
    }
}

export async function createSchedule(parameters) {
    var { preferences, routines, goals, googleEvents } = parameters;

    const user = store.getState().userModule.user
    const scheduleStarter = createScheduleStarter(preferences, routines, googleEvents)
    console.log("🚀 ~ createSchedule ~ scheduleStarter:", scheduleStarter)
    const aiResponse = await generateSchedule2({ schedule: scheduleStarter, goals, intensity: preferences.intensity })
    console.log("🚀 ~ createSchedule ~ aiResponse:", aiResponse)
    const aiTasks = Array.isArray(aiResponse) ? aiResponse : aiResponse?.schedule
    const completeSchedule = formatSchedule(aiTasks, preferences, routines, goals, user)
    const completeScheduleWithId = await saveScheduleToDB(completeSchedule)
    await addScheduleToUser(completeScheduleWithId)
    appendScheduleToUserState(completeScheduleWithId)
    console.log("🚀 ~ createSchedule ~ completeSchedule:", completeSchedule)
    return completeScheduleWithId
}

function formatTask({ summary, start, end, category }) {
    let endTime = end
    if (!end) {
        endTime = addDurationToTime(start, 30)
        console.log("🚀 ~ formatTask ~ end:", end)
    }
    return {
        summary,
        start,
        end: endTime,
        category
    }

}

function addDurationToTime(time, duration) {
    if (!time || typeof time !== 'string') return ''
    const [hhStr, mmStr] = time.split(':')
    const startH = Number(hhStr)
    const startM = Number(mmStr)
    if (Number.isNaN(startH) || Number.isNaN(startM)) return ''
    const totalStart = startH * 60 + startM
    const totalEndRaw = totalStart + Number(duration || 0)
    const DAY_MINUTES = 24 * 60
    // Normalize to 0..1439 to handle negative and overflow
    const totalEnd = ((totalEndRaw % DAY_MINUTES) + DAY_MINUTES) % DAY_MINUTES
    const endH = Math.floor(totalEnd / 60)
    const endM = totalEnd % 60
    const pad = (n) => String(n).padStart(2, '0')
    return `${pad(endH)}:${pad(endM)}`
}

export function createScheduleStarter(preferences, routines, googleEvents) {
    console.log("🚀 ~ createScheduleStarter ~ routines:", routines)
    const { wakeup, sleep } = preferences
    let schedule

    const now = new Date()
    const timestamp = now.getTime()

    const wakeupTask = formatTask({ summary: "Wake up", start: wakeup, end: addDurationToTime(wakeup, 15), category: "break" })
    const sleepTask = formatTask({ summary: "Sleep", start: addDurationToTime(sleep, -15), end: sleep, category: "break" })

    if (routines.length > 0) {
        const routineTasks = routines.map(routine => formatTask({ summary: routine.name, start: routine.startTime, end: routine.endTime, category: "routine" }))
        console.log("🚀 ~ createScheduleStarter ~ routineTasks:", routineTasks)
        const googleTasks = googleEvents.map(task => formatTask({ ...task, category: "routine" }))
        schedule = [wakeupTask, ...routineTasks, ...googleTasks, sleepTask]
    } else {
        schedule = [wakeupTask, sleepTask]
    }
    return (
        // name: 'Daily Schedule', 
        schedule
        // createdAt: timestamp, 
        // updatedAt: timestamp, 
        // preferences, routines, 
        // goals, 
        // creator: { id: user?._id, name: user?.name }, 
        // chat: []
    )
}

// Action creators


export const addTaskToSchedule = (task) => ({
    type: ADD_TASK_TO_AI_SCHEDULE,
    task,
});

export function getCmdAiSchedule(aiSchedule) {
    return {
        type: SET_SCHEDULE,
        aiSchedule
    }
}
