import {auth, LogInArgsType, ProfileType} from '../../m3-API/api';
import {AppThunk} from '../store';

enum EnumAuthRedActionType {
    logIn = 'AUTH/LOG-IN',
    isMe = 'AUTH/IS-ME',
}

const initialState = {
    profile: {},
    isMe: false,
}

export const authRed = (state: initialStateType = initialState, action: AuthRedActionType) => {
    switch (action.type) {
        case EnumAuthRedActionType.logIn:
            return {...state, profile: {...action.payload.profileData}}
        case EnumAuthRedActionType.isMe:
            return {...state, isMe: true}
        default:
            return {...state}
    }
}

// action creator
const logInAC = (profileData: ProfileType) => {
    return {
        type: EnumAuthRedActionType.logIn,
        payload: {profileData}
    } as const
}
const isMe = () => {
    return {type: EnumAuthRedActionType.isMe} as const
}


//thunk creator
export const logInTC = (data: LogInArgsType): AppThunk => async dispatch => {
    try {
        const res = await auth.logIn(data)
        dispatch(logInAC(res.data))
        dispatch(isMe())
    } catch (error) {
        alert(error)
    }
}


//type
type initialStateType = typeof initialState
export type AuthRedActionType =
    | ReturnType<typeof logInAC>
    | ReturnType<typeof isMe>
