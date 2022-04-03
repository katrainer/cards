import {applyMiddleware, combineReducers, createStore} from 'redux';
import thunk, {ThunkAction} from 'redux-thunk';
import {appRed, AppRedActionType} from './reducers/appRed';
import {authRed, AuthRedActionType} from './reducers/authRed';

const rootReducer = combineReducers({
    auth: authRed,
    app: appRed,
})
export const store = createStore(rootReducer, applyMiddleware(thunk))


//type

//Типизация санок
export type AppActionType = AuthRedActionType | AppRedActionType
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, AppRootStateType, unknown, AppActionType>

//Типизация стора
export type AppRootStateType = ReturnType<typeof rootReducer>


//@ts-ignore
window.store = store
