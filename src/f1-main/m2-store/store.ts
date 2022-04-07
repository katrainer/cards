import {TypedUseSelectorHook, useSelector} from 'react-redux';
import {applyMiddleware, combineReducers, createStore} from 'redux';
import thunk, {ThunkAction} from 'redux-thunk';
import {authRed, AuthRedActionType} from './reducers/authRed';
import {ProfileActionType, profileReducer} from './reducers/ProfileReducer';
import {LoadingActionType, appReducer} from "./reducers/appReducer";


const rootReducer = combineReducers({
    auth: authRed,
    profilePage: profileReducer,
    app: appReducer
})
export const store = createStore(rootReducer, applyMiddleware(thunk))


//type

//Типизация санок
export type AppActionType = AuthRedActionType | ProfileActionType | LoadingActionType
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, AppRootStateType, unknown, AppActionType>
export const useAppSelector: TypedUseSelectorHook<AppRootStateType> = useSelector

//Типизация стора
export type AppRootStateType = ReturnType<typeof rootReducer>

//@ts-ignore
window.store = store
