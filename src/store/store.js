import { configureStore } from '@reduxjs/toolkit';
import { carReducer } from './reducers/car.reducer';
import { userReducer } from './reducers/user.reducer';
import { systemReducer } from './reducers/system.reducer';

export const store = configureStore({
    reducer: {
        carModule: carReducer,
        userModule: userReducer,
        systemModule: systemReducer,
    },
});

// const middleware = (window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__)? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__() : undefined

// For debug:
// store.subscribe(() => {
//     console.log('**** Store state changed: ****')
//     console.log('storeState:\n', store.getState())
//     console.log('*******************************')
// })