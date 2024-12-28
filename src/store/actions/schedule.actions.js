import { scheduleService } from '@/services/scheduleService'
import { ADD_TASK_TO_AI_SCHEDULE, RESET_SCHEDULE, SET_AI_SCHEDULE } from '../reducers/schedule.reducer'
import { store } from '../store'
import { userService } from '@/services/user.service'
import { addScheduleToUser } from './user.actions'

export async function generateAiSchedule(parameters) {
    const { preferences, routines, goals } = parameters
    try {
        const timezone = await scheduleService.fetchUserTimezone()
        console.log('timezone:', timezone)
        const aiSchedule = await scheduleService.fetchAiSchedule({ preferences, routines, goals, timezone })
        await addScheduleToUser(aiSchedule)
        store.dispatch(getCmdAiSchedule(aiSchedule.schedule))
    } catch (err) {
        console.log('Cannot fetch ai schedule', err)
        throw err
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
    console.log('aiSchedule:', aiSchedule)
    return {
        type: SET_AI_SCHEDULE,
        aiSchedule
    }
}

