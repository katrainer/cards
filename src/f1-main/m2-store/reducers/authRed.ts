import {auth, LogInArgsType, RegisterType} from '../../m3-API/api';
import {AppThunk} from '../store';
import axios from 'axios';
import {deleteProfile, setProfile} from './ProfileReducer';
import {loadingAC} from "./appReducer";

enum EnumAuthRedActionType {
    logIn = 'AUTH/LOG-IN',
    isMe = 'AUTH/IS-ME',
    register = 'AUTH/IS-REGISTER',
    logOut = 'AUTH/LOG-OUT',
}

const initialState = {
    isMe: false,
    isRegister: false
}

export const authRed = (state: initialStateType = initialState, action: AuthRedActionType): initialStateType => {
    switch (action.type) {
        case EnumAuthRedActionType.isMe:
        case EnumAuthRedActionType.register:
        case EnumAuthRedActionType.logOut:
            return {...state, ...action.payload}
        default:
            return {...state}
    }
}

// action creator
const isMeAC = () => {
    return {
        type: EnumAuthRedActionType.isMe,
        payload: {isMe: true}
    } as const
}
const registerAC = () => {
    return {
        type: EnumAuthRedActionType.register,
        payload: {isRegister: true}
    } as const
}
const logOutAC = () => {
    return {
        type: EnumAuthRedActionType.logOut,
        payload: {
            isMe: false,
            isRegister: false,
        },
    } as const
}

//thunk creator
export const logInTC = (data: LogInArgsType): AppThunk => async dispatch => {
    try {
        const res = await auth.logIn(data)
        dispatch(setProfile(res.data))
        dispatch(isMeAC())
    } catch (error: any) {
        alert(error.error)
    }
}
export const isMeTC = (): AppThunk => async (dispatch) => {
    dispatch(loadingAC(true))
    try {
        const response = await auth.me()
        dispatch(setProfile(response.data))
        dispatch(isMeAC())
    } catch (error) {
        if (axios.isAxiosError(error) && error.response) {
            const errorMessage = error.response.data.error;
            console.log(errorMessage)
        }
    } finally {
        dispatch(loadingAC(false))
    }
}
export const registerTC = (data: RegisterType): AppThunk => async dispatch => {
    try {
        const res = await auth.register(data)
        dispatch(registerAC())
    } catch (e: any) {
        alert(e)
    }
}
export const logOutTC = (): AppThunk => async dispatch => {
    try {
        const res = await auth.logOut()
        dispatch(logOutAC())
        dispatch(deleteProfile())
    } catch (e) {
        alert(e)
    }
}


//type
type initialStateType = typeof initialState
export type AuthRedActionType =
    | ReturnType<typeof isMeAC>
    | ReturnType<typeof registerAC>
    | ReturnType<typeof logOutAC>
