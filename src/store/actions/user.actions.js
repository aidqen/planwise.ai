import { getUserSession } from '@/lib/session';
import { SET_USER } from './../reducers/user.reducer';
import { store } from '../store';
import { userService } from '@/services/user.service';
import { makeId } from '@/services/util.service';

const LOCAL_USER_KEY = 'planwise_user';

function isBrowser() {
        return typeof window !== 'undefined';
}

function loadUserFromStorage() {
        if (!isBrowser()) return null;

        try {
                const raw = window.localStorage.getItem(LOCAL_USER_KEY);
                if (!raw) return null;
                return JSON.parse(raw);
        } catch (err) {
                console.warn('Failed to parse stored user', err);
                return null;
        }
}

function deriveUsername(user) {
        if (!user) return null;
        if (user.username) return user.username;
        if (user.name) return user.name;
        if (user.email && typeof user.email === 'string') {
                return user.email.split('@')[0];
        }
        return null;
}

function persistUserToStorage(user) {
        if (!isBrowser() || !user) return;

        const id = user._id || user.id;
        const email = user.email;
        const username = deriveUsername(user);
        if (!id || !email || !username) return;

        const minimalUser = { id, email, name:username };

        try {
                window.localStorage.setItem(LOCAL_USER_KEY, JSON.stringify(minimalUser));
        } catch (err) {
                console.warn('Failed to persist user locally', err);
        }
}

export async function getUser() {
        const localUser = loadUserFromStorage();
        let email = localUser.email
        console.log("🚀 ~ getUser ~ localUser:", localUser)

        if (localUser) {
                store.dispatch({ type: SET_USER, user: localUser });
        } else if (!localUser.email) {
                const session = await getUserSession();
                email = session?.email || localUser?.email;
        }

        if (!email) {
                console.log('No email');
                return localUser;
        }

        try {
                const user = await userService.getUser(email);
                store.dispatch({ type: SET_USER, user });
                if (!localUser) {
                        persistUserToStorage(user);
                }

                return user;
        } catch (err) {
                console.error('Failed to fetch user from backend', err);
                return localUser;
        }
}

export function getLocalUser() {
        return store.getState().userModule.user;
}

export async function addScheduleToUser(schedule) {
        const { id, name, updatedAt, preferences, routines, goals } = schedule;
        const user = getLocalUser();
        const scheduleToSave = { id, name, updatedAt, preferences, routines, goals };

        const userToSave = { ...user, schedules: user?.schedules ? [...user.schedules, scheduleToSave] : [scheduleToSave] };
        await userService.updateUser(userToSave);
}

export async function updateScheduleInUser(schedule) {
        try {
                const { _id: id, name, updatedAt, preferences, routines, goals } = schedule;
                const user = getLocalUser();
                const scheduleToSave = { id, name, updatedAt, preferences, routines, goals };
                const updatedSchedules = user?.schedules?.map(s => s.id === id ? scheduleToSave : s) || [scheduleToSave];
                const userToSave = { ...user, schedules: updatedSchedules };
                const userAfterUpdate = await userService.updateUser(userToSave);
                store.dispatch({ type: SET_USER, user: userAfterUpdate });
        } catch (err) {
                throw err;
        }
}

export async function deleteScheduleFromUser(scheduleId) {
        const user = getLocalUser();
        const nextSchedules = (user?.schedules || []).filter(schedule => schedule.id !== scheduleId);
        const updatedUser = { ...user, schedules: nextSchedules };
        await userService.updateUser(updatedUser);
        store.dispatch({ type: SET_USER, user: updatedUser });
}

export function appendScheduleToUserState(schedule) {
        const user = getLocalUser();
        const { _id: id, name, updatedAt, preferences, routines, goals } = schedule || {};
        const scheduleSummary = { id, name, updatedAt, preferences, routines, goals };
        const existing = Array.isArray(user?.schedules) ? user.schedules : [];
        const nextSchedules = [scheduleSummary, ...existing];
        const updatedUser = { ...user, schedules: nextSchedules };
        store.dispatch({ type: SET_USER, user: updatedUser });
}

export async function updateUser(user) {
        try {
                await userService.updateUser(user);
                store.dispatch({ type: SET_USER, user: { ...user } });
        } catch (err) {
                throw err;
        }
}
