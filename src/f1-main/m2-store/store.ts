import {applyMiddleware, combineReducers, createStore} from 'redux';
import thunk, {ThunkAction} from 'redux-thunk';
import {authRed, AuthRedActionType} from './reducers/authRed';
import {SomeRed2, SomeRed2ActionType} from './reducers/SomeRed2';


const rootReducer = combineReducers({
    auth: authRed,
    SomeRed2,
})
export const store = createStore(rootReducer, applyMiddleware(thunk))


//type

//Типизация санок
export type AppActionType = AuthRedActionType | SomeRed2ActionType
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, AppRootStateType, unknown, AppActionType>

//Типизация стора
type AppRootStateType = ReturnType<typeof rootReducer>


//@ts-ignore
window.store = store
