import { getUserSession } from '@/lib/session';
import { SET_USER } from './../reducers/user.reducer';
import { store } from '../store';
import { userService } from '@/services/user.service';
import { makeId } from '@/services/util.service';

export async function getUser() {
        const { email } = await getUserSession()
        const user = await userService.getUser(email)
        store.dispatch({ type: SET_USER, user })
        return user
}

export function getLocalUser() {
        console.log("🚀 ~ file: user.actions.js:23 ~ store.getState().userModule.user:", store.getState().userModule.user)
        return store.getState().userModule.user
}

export async function addScheduleToUser(schedule) {
        const { id, name, updatedAt, preferences, routines, goals } = schedule
        const user = getLocalUser()
        const scheduleToSave = { id, name, updatedAt, preferences, routines, goals }

        const userToSave = { ...user, schedules: user?.schedules ? [...user.schedules, scheduleToSave] : [scheduleToSave] }
        await userService.updateUser(userToSave)
}

export async function updateScheduleInUser(schedule) {
        try {
                const { _id: id, name, updatedAt, preferences, routines, goals } = schedule
                const user = getLocalUser()
                const scheduleToSave = { id, name, updatedAt, preferences, routines, goals }
                const updatedSchedules = user?.schedules?.map(s => s.id === id ? scheduleToSave : s) || [scheduleToSave]
                const userToSave = { ...user, schedules: updatedSchedules }
                const userAfterUpdate = await userService.updateUser(userToSave)
                store.dispatch({ type: SET_USER, user: userAfterUpdate })
        } catch (err) {
                throw err
        }
}

export async function deleteScheduleFromUser(scheduleId) {
        const user = getLocalUser()
        const nextSchedules = (user?.schedules || []).filter(schedule => schedule.id !== scheduleId)
        const updatedUser = { ...user, schedules: nextSchedules }
        await userService.updateUser(updatedUser)
        store.dispatch({ type: SET_USER, user: updatedUser })
}

export function appendScheduleToUserState(schedule) {
        const user = getLocalUser()
        const { _id: id, name, updatedAt, preferences, routines, goals } = schedule || {}
        const scheduleSummary = { id, name, updatedAt, preferences, routines, goals }
        const existing = Array.isArray(user?.schedules) ? user.schedules : []
        const nextSchedules = [scheduleSummary, ...existing]
        const updatedUser = { ...user, schedules: nextSchedules }
        store.dispatch({ type: SET_USER, user: updatedUser })
}

export async function updateUser(user) {
        try {
                await userService.updateUser(user)
                store.dispatch({ type: SET_USER, user })
        } catch (err) {
                throw err
        }
}