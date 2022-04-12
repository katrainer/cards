import {TypedUseSelectorHook, useSelector} from 'react-redux';
import {applyMiddleware, combineReducers, createStore} from 'redux';
import thunk, {ThunkAction} from 'redux-thunk';
import {AuthRedActionType, authReducer} from './reducers/authReducer';
import {ProfileActionType, profileReducer} from './reducers/profileReducer';
import {appReducer, LoadingActionType} from './reducers/appReducer';
import {packsReducer, PacksReducerActionType} from './reducers/packsReducer';
import {cardsReducer, CardsReducerActionType} from "./reducers/cardsReducer";


const rootReducer = combineReducers({
    auth: authReducer,
    profile: profileReducer,
    app: appReducer,
    packs: packsReducer,
    cards: cardsReducer,
})
export const store = createStore(rootReducer, applyMiddleware(thunk))


//type

//Типизация санок
export type AppActionType = AuthRedActionType | ProfileActionType | LoadingActionType | PacksReducerActionType | CardsReducerActionType
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, AppRootStateType, unknown, AppActionType>
export const useAppSelector: TypedUseSelectorHook<AppRootStateType> = useSelector

//Типизация стора
export type AppRootStateType = ReturnType<typeof rootReducer>

//@ts-ignore
window.store = store
