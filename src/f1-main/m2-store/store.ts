import { TypedUseSelectorHook, useSelector } from 'react-redux';
import {applyMiddleware, combineReducers, createStore} from 'redux';
import thunk, {ThunkAction} from 'redux-thunk';
import {authRed, AuthRedActionType} from './reducers/authRed';
import {SomeRed2} from './reducers/SomeRed2';
import {ProfileActionType, profileReducer} from "./reducers/ProfileReducer";
import {authRed} from './reducers/authRed';
import {RegisterReducer, RegisterReducerActionType} from './reducers/signUp-reducer';


const rootReducer = combineReducers({
    auth: authRed,
    profilePage: profileReducer,
    SomeRed2,
    register: RegisterReducer,
})
export const store = createStore(rootReducer, applyMiddleware(thunk))


//type

//Типизация санок
export type AppActionType = AuthRedActionType | ProfileActionType | RegisterReducerActionType
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, AppRootStateType, unknown, AppActionType>
export const useAppSelector: TypedUseSelectorHook<AppRootStateType> = useSelector

//Типизация стора
export type AppRootStateType = ReturnType<typeof rootReducer>

//@ts-ignore
window.store = store
