// import { userService } from '../../services/user'
// import { socketService } from '../../services/socket.service'
// import { store } from '../store'

// import { showErrorMsg } from '../../services/event-bus.service'
// import { LOADING_DONE, LOADING_START } from '../reducers/system.reducer'
// import { REMOVE_USER, SET_USERS, SET_WATCHED_USER } from '../reducers/user.reducer'
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
        return store.getState().userModule.user
}

export async function addScheduleToUser(schedule) {
        const { id, name, updatedAt, preferences, routines, goals } = schedule
        const user = store.getState().userModule.user
        const scheduleToSave = { id, name, updatedAt, preferences, routines, goals }

        const userToSave = { ...user, schedules: user?.schedules ? [...user.schedules, scheduleToSave] : [scheduleToSave] }
        await userService.updateUser(userToSave)
}

export async function updateScheduleInUser(schedule) {
        try {
                const { _id: id, name, updatedAt, preferences, routines, goals } = schedule
                const user = store.getState().userModule.user
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
        user.schedules = user.schedules.filter(schedule => schedule.id !== scheduleId)
        await userService.updateUser(user)
        store.dispatch({ type: SET_USER, user })
}

export function appendScheduleToUserState(schedule) {
        const user = getLocalUser()
        if (!user.schedules) user.schedules = [...schedule]
        user?.schedules.unshift(schedule)
        store.dispatch({ type: SET_USER, user: userToSave })
}

export async function updateUser(user) {
        try {
                await userService.updateUser(user)
                store.dispatch({ type: SET_USER, user })
        } catch (err) {
                throw err
        }
}
// export async function loadUsers() {
//     try {
//         store.dispatch({ type: LOADING_START })
//         const users = await userService.getUsers()
//         store.dispatch({ type: SET_USERS, users })
//     } catch (err) {
//         console.log('UserActions: err in loadUsers', err)
//     } finally {
//         store.dispatch({ type: LOADING_DONE })
//     }
// }

// export async function removeUser(userId) {
//     try {
//         await userService.remove(userId)
//         store.dispatch({ type: REMOVE_USER, userId })
//     } catch (err) {
//         console.log('UserActions: err in removeUser', err)
//     }
// }

// export async function login(credentials) {
//     try {
//         const user = await userService.login(credentials)
//         store.dispatch({
//             type: SET_USER,
//             user
//         })
//         socketService.login(user._id)
//         return user
//     } catch (err) {
//         console.log('Cannot login', err)
//         throw err
//     }
// }

// export async function signup(credentials) {
//     try {
//         const user = await userService.signup(credentials)
//         store.dispatch({
//             type: SET_USER,
//             user
//         })
//         socketService.login(user._id)
//         return user
//     } catch (err) {
//         console.log('Cannot signup', err)
//         throw err
//     }
// }

// export async function logout() {
//     try {
//         await userService.logout()
//         store.dispatch({
//             type: SET_USER,
//             user: null
//         })
//         socketService.logout()
//     } catch (err) {
//         console.log('Cannot logout', err)
//         throw err
//     }
// }

// export async function loadUser(userId) {
//     try {
//         const user = await userService.getById(userId)
//         store.dispatch({ type: SET_WATCHED_USER, user })
//     } catch (err) {
//         showErrorMsg('Cannot load user')
//         console.log('Cannot load user', err)
//     }
// }