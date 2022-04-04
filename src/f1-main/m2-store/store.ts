import {applyMiddleware, combineReducers, createStore} from 'redux';
import thunk, {ThunkAction} from 'redux-thunk';
import {authRed, AuthRedActionType} from './reducers/authRed';
import {SomeRed2} from './reducers/SomeRed2';
import {ProfileActionType, profileReducer} from "./reducers/ProfileReducer";


const rootReducer = combineReducers({
    auth: authRed,
    profilePage: profileReducer,
    SomeRed2,
})

export const store = createStore(rootReducer, applyMiddleware(thunk))



//type

//Типизация санок
export type AppActionType = AuthRedActionType | ProfileActionType
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, AppRootStateType, unknown, AppActionType>

//Типизация стора
export type AppRootStateType = ReturnType<typeof rootReducer>

//@ts-ignore
window.store = store
