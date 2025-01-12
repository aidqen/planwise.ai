export const SAVE_PREFERENCES = 'SAVE_MULTI_STEP_FORM'
export const SAVE_GOALS = 'SAVE_GOALS'
export const EDIT_GOAL = 'EDIT_GOAL'
export const REMOVE_GOAL = 'REMOVE_GOAL'
export const SAVE_ROUTINES = 'SAVE_ROUTINES'
export const SET_WAKEUP = 'SET_WAKEUP'
export const SET_SLEEP = 'SET_SLEEP'
export const SET_INTENSITY = 'SET_INTENSITY'
export const SET_SCHEDULE = 'SET_SCHEDULE'
export const ADD_TASK_TO_AI_SCHEDULE = 'ADD_TASK_TO_AI_SCHEDULE'
export const RESET_SCHEDULE = 'RESET_SCHEDULE'
export const ADD_GOAL = 'ADD_GOAL'
export const ADD_ROUTINE = 'ADD_ROUTINE'
// export const ADD_GOAL = 'ADD_GOAL'

const initialState = {
    multiStepForm: { preferences: { wakeup: '7:00', sleep: '22:00', intensity: 'moderate' }, goals: [], routines: [] },
    schedule: [],
}

export function scheduleReducer(state = initialState, action) {
    var newState = state
    switch (action.type) {
        case SAVE_PREFERENCES:
            newState = { ...state, multiStepForm: { ...state.multiStepForm, preferences: { ...action.preferences } } }
            break
        case SET_WAKEUP:
            newState = { ...state, multiStepForm: { ...state.multiStepForm, preferences: { ...state.multiStepForm.preferences, wakeup: action.wakeup } } }
            break
        case SET_SLEEP:
            newState = { ...state, multiStepForm: { ...state.multiStepForm, preferences: { ...state.multiStepForm.preferences, sleep: action.sleep } } }
            break
        case SET_INTENSITY:
            newState = { ...state, multiStepForm: { ...state.multiStepForm, preferences: { ...state.multiStepForm.preferences, intensity: action.intensity } } }
            break
        case SAVE_GOALS:
            newState = { ...state, multiStepForm: { ...state.multiStepForm, goals: [...action.goals] } }
            break
        case EDIT_GOAL:
            newState = { ...state, multiStepForm: { ...state.multiStepForm, goals: [goals.map(goal => (goal.id === action.goal.id ? action.goal : goal))] } }
        case SAVE_ROUTINES:
            newState = { ...state, multiStepForm: { ...state.multiStepForm, routines: [...action.routines] } }
            break
        case SET_SCHEDULE:
            newState = { ...state, schedule: action.schedule }
            break
        case RESET_SCHEDULE:
            newState = { ...state, aiSchedule: [] }
            break
        case ADD_TASK_TO_AI_SCHEDULE:
            newState = {
                ...state,
                schedule: [...state.aiSchedule, action.task], // Append the new task
            };
        default:
    }
    return newState
}

// unitTestReducer()

// function unitTestReducer() {
//     var state = initialState
//     const car1 = { _id: 'b101', vendor: 'Car ' + parseInt(Math.random() * 10), msgs: [] }
//     const car2 = { _id: 'b102', vendor: 'Car ' + parseInt(Math.random() * 10), msgs: [] }

//     state = carReducer(state, { type: SET_CARS, cars: [car1] })
//     console.log('After SET_CARS:', state)

//     state = carReducer(state, { type: ADD_CAR, car: car2 })
//     console.log('After ADD_CAR:', state)

//     state = carReducer(state, { type: UPDATE_CAR, car: { ...car2, vendor: 'Good' } })
//     console.log('After UPDATE_CAR:', state)

//     state = carReducer(state, { type: REMOVE_CAR, carId: car2._id })
//     console.log('After REMOVE_CAR:', state)

//     const msg = { id: 'm' + parseInt(Math.random() * 100), txt: 'Some msg' }
//     state = carReducer(state, { type: ADD_CAR_MSG, carId: car1._id, msg })
//     console.log('After ADD_CAR_MSG:', state)

//     state = carReducer(state, { type: REMOVE_CAR, carId: car1._id })
//     console.log('After REMOVE_CAR:', state)
// }

