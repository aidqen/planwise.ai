import { scheduleService } from '@/services/scheduleService'
import { SET_AI_SCHEDULE } from '../reducers/schedule.reducer'
import { store } from '../store'

export async function generateAiSchedule(parameters) {
   try {
    const aiSchedule = await scheduleService.fetchAiSchedule(parameters)
    store.dispatch(getCmdAiSchedule(aiSchedule))
   } catch (err) {
    console.log('Cannot fetch ai schedule', err)
    throw err
   }
}

function getCmdAiSchedule(aiSchedule) {
    return {
        type: SET_AI_SCHEDULE,
        aiSchedule
    }
}

// export async function loadCars(filterBy) {
//     try {
//         const cars = await carService.query(filterBy)
//         store.dispatch(getCmdSetCars(cars))
//     } catch (err) {
//         console.log('Cannot load cars', err)
//         throw err
//     }
// }

// export async function loadCar(carId) {
//     try {
//         const car = await carService.getById(carId)
//         store.dispatch(getCmdSetCar(car))
//     } catch (err) {
//         console.log('Cannot load car', err)
//         throw err
//     }
// }


// export async function removeCar(carId) {
//     try {
//         await carService.remove(carId)
//         store.dispatch(getCmdRemoveCar(carId))
//     } catch (err) {
//         console.log('Cannot remove car', err)
//         throw err
//     }
// }

// export async function addCar(car) {
//     try {
//         const savedCar = await carService.save(car)
//         store.dispatch(getCmdAddCar(savedCar))
//         return savedCar
//     } catch (err) {
//         console.log('Cannot add car', err)
//         throw err
//     }
// }

// export async function updateCar(car) {
//     try {
//         const savedCar = await carService.save(car)
//         store.dispatch(getCmdUpdateCar(savedCar))
//         return savedCar
//     } catch (err) {
//         console.log('Cannot save car', err)
//         throw err
//     }
// }

// export async function addCarMsg(carId, txt) {
//     try {
//         const msg = await carService.addCarMsg(carId, txt)
//         store.dispatch(getCmdAddCarMsg(msg))
//         return msg
//     } catch (err) {
//         console.log('Cannot add car msg', err)
//         throw err
//     }
// }

// // Command Creators:
// function getCmdSetCars(cars) {
//     return {
//         type: SET_CARS,
//         cars
//     }
// }
// function getCmdSetCar(car) {
//     return {
//         type: SET_CAR,
//         car
//     }
// }
// function getCmdRemoveCar(carId) {
//     return {
//         type: REMOVE_CAR,
//         carId
//     }
// }
// function getCmdAddCar(car) {
//     return {
//         type: ADD_CAR,
//         car
//     }
// }
// function getCmdUpdateCar(car) {
//     return {
//         type: UPDATE_CAR,
//         car
//     }
// }
// function getCmdAddCarMsg(msg) {
//     return {
//         type: ADD_CAR_MSG,
//         msg
//     }
// }

// // unitTestActions()
// async function unitTestActions() {
//     await loadCars()
//     await addCar(carService.getEmptyCar())
//     await updateCar({
//         _id: 'm1oC7',
//         title: 'Car-Good',
//     })
//     await removeCar('m1oC7')
//     // TODO unit test addCarMsg
// }
