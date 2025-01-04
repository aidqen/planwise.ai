import { scheduleService } from '@/services/scheduleService'
import { ADD_TASK_TO_AI_SCHEDULE, RESET_SCHEDULE, SET_AI_SCHEDULE } from '../reducers/schedule.reducer'
import { store } from '../store'
import { userService } from '@/services/user.service'
import { addScheduleToUser } from './user.actions'
import { makeId } from '@/services/util.service'

export async function generateAiSchedule(parameters) {
    var { preferences, routines, goals } = parameters;
    try {
        const aiSchedule = await scheduleService.fetchAiSchedule({ preferences, routines, goals });
        const scheduleToSave = formatSchedule(aiSchedule.schedule, preferences, routines, goals);
        const schedule = await saveScheduleToDB(scheduleToSave);
        await addScheduleToUser(schedule);
        store.dispatch(getCmdAiSchedule(scheduleToSave));
        return schedule
    } catch (err) {
        throw err;
    }
}

async function saveScheduleToDB(schedule) {
    return await scheduleService.insertScheduleToDB(schedule)
}

function formatSchedule(schedule, preferences, routines, goals) {
    if (!schedule) return
    const now = new Date()
    const timestamp = now.getTime()
    return { name: 'Daily Schedule', schedule: [...schedule], createdAt: timestamp, updatedAt: timestamp, preferences, routines, goals }
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
        type: SET_AI_SCHEDULE,
        aiSchedule
    }
}

