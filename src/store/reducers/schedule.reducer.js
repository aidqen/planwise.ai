export const SAVE_PREFERENCES = 'SAVE_MULTI_STEP_FORM'
export const SAVE_GOALS = 'SAVE_GOALS'
export const SAVE_ROUTINES = 'SAVE_ROUTINES'
export const SET_WAKEUP = 'SET_WAKEUP'
export const SET_SLEEP = 'SET_SLEEP'
export const SET_INTENSITY = 'SET_INTENSITY'
export const SET_AI_SCHEDULE = 'SET_AI_SCHEDULE'

const initialState = {
    multiStepForm: { preferences: {wakeup: '7:00 AM', sleep: '10:00 PM', intensity: 'moderate'}, goals: [], routines: [] },
    aiSchedule: []
}

export function scheduleReducer(state = initialState, action) {
    var newState = state
    switch (action.type) {
        case SAVE_PREFERENCES:
            newState = { ...state, multiStepForm: {...state.multiStepForm, preferences: {...action.preferences}} }
            break
        case SET_WAKEUP:
            newState = { ...state, multiStepForm: {...state.multiStepForm, preferences: {...state.multiStepForm.preferences, wakeup: action.wakeup}} }
            break
        case SET_SLEEP:
            newState = { ...state, multiStepForm: {...state.multiStepForm, preferences: {...state.multiStepForm.preferences, sleep: action.sleep}} }
            break
        case SET_INTENSITY:
            newState = { ...state, multiStepForm: {...state.multiStepForm, preferences: {...state.multiStepForm.preferences, intensity: action.intensity}} }
            break
        case SAVE_GOALS:
            newState = { ...state, multiStepForm: {...state.multiStepForm, goals: [...action.goals]} }
            break
        case SAVE_ROUTINES:
            newState = { ...state, multiStepForm: {...state.multiStepForm, routines: [...action.routines]} }
            break
        case SET_AI_SCHEDULE:
            newState = { ...state, aiSchedule: action.aiSchedule }
            break

        // case SET_CARS:
        //     newState = { ...state, cars: action.cars }
        //     break
        // case SET_CAR:
        //     newState = { ...state, car: action.car }
        //     break
        // case REMOVE_CAR:
        //     const lastRemovedCar = state.cars.find(car => car._id === action.carId)
        //     cars = state.cars.filter(car => car._id !== action.carId)
        //     newState = { ...state, cars, lastRemovedCar }
        //     break
        // case ADD_CAR:
        //     newState = { ...state, cars: [...state.cars, action.car] }
        //     break
        // case UPDATE_CAR:
        //     cars = state.cars.map(car => (car._id === action.car._id) ? action.car : car)
        //     newState = { ...state, cars }
        //     break
        // case ADD_CAR_MSG:
        //     newState = { ...state, car: { ...state.car, msgs: [...state.car.msgs || [], action.msg] } }
        //     break
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

