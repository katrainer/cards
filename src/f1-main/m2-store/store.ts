import {applyMiddleware, combineReducers, createStore} from 'redux';
import thunk from 'redux-thunk';
import {authRed} from './reducers/authRed';
import {SomeRed2} from './reducers/SomeRed2';
import {profileReducer} from "./reducers/ProfileReducer";

export type rootReducerType = ReturnType<typeof rootReducer>
const rootReducer = combineReducers({
    auth: authRed,
    profilePage: profileReducer,
    SomeRed2,
})

export const store = createStore(rootReducer, applyMiddleware(thunk))


//@ts-ignore
window.store = store
