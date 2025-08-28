import { generateSchedule2, scheduleService } from '@/services/scheduleService'
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

function formatSchedule(schedule, preferences, routines, goals, user) {
    if (!schedule) return
    const now = new Date()
    const timestamp = now.getTime()
    return { 
        name: 'Daily Schedule', 
        schedule: [...schedule], 
        createdAt: timestamp, 
        updatedAt: timestamp, 
        preferences,
        routines, 
        goals, creator: { id: user?._id, name: user?.name }, 
        chat: []
    }
}

export async function createSchedule(parameters) {
    var { intensity, routines, goals } = parameters;

    const user = store.getState().userModule.user
    const schedule = scheduleBoilerplate(preferences, routines, goals, user)
    const aiResponse = await generateSchedule2(schedule.schedule, goals, intensity)
    return aiResponse
}

function formatTask({summary, start, end, type}) {
    if (!end) {
        const end = addDurationToTime(start, 30)
        console.log("🚀 ~ formatTask ~ end:", end)
    }
    return {
        summary,
        start,
        end,
        category: type
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

export function scheduleBoilerplate(preferences, routines, goals, user) {
    const { wakeup, sleep } = preferences
    let schedule

    const now = new Date()
    const timestamp = now.getTime()

    const wakeupTask = formatTask({summary: "Wake up", start: wakeup, end: addDurationToTime(wakeup, 110), type: "break"})
    const sleepTask = formatTask({summary: "Sleep", start: addDurationToTime(sleep, -15), end: sleep, type: "break"})

    if (routines.length > 0) {
        const routineTasks = routines.map(routine => formatTask({summary: routine.name, start: routine.startTime,  end: routine.endTime, type: "routine"}))
        schedule = [wakeupTask, ...routineTasks, sleepTask]
    } else {
        schedule = [wakeupTask, sleepTask]
    }
    return { 
        name: 'Daily Schedule', 
        schedule, 
        createdAt: timestamp, 
        updatedAt: timestamp, 
        preferences, routines, 
        goals, 
        creator: { id: user?._id, name: user?.name }, 
        chat: []
    }
}

// Action creators


export const addTaskToSchedule = (task) => ({
    type: ADD_TASK_TO_AI_SCHEDULE,
    task,
});

export const resetSchedule = () => ({
    type: RESET_SCHEDULE,
});

export function getCmdAiSchedule(aiSchedule) {
    return {
        type: SET_SCHEDULE,
        aiSchedule
    }
}

