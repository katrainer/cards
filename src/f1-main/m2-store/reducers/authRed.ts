import {auth, LogInArgsType, PasswordRecoveryType, ProfileType} from '../../m3-API/api';
import {AppThunk} from '../store';
import {isInitializedAC} from './appRed';

enum EnumAuthRedActionType {
    setProfile = 'AUTH/SET-PROFILE',
    isMe = 'AUTH/IS-ME',
    isRegister = 'AUTH/IS-REGISTER',
    deleteProfile = 'AUTH/DELETE-PROFILE',
}


const initialState = {
    profile: {} as ProfileType,
    isMe: false,
    isRegister: false
}

export const authRed = (state: initialStateType = initialState, action: AuthRedActionType): initialStateType => {
    switch (action.type) {
        case EnumAuthRedActionType.setProfile:
            return {...state, profile: {...action.payload.profileData}}
        case EnumAuthRedActionType.isMe:
        case EnumAuthRedActionType.isRegister:
        case EnumAuthRedActionType.deleteProfile:
            return {...state, ...action.payload}
        default:
            return {...state}
    }
}

// action creator
const setProfileAC = (profileData: ProfileType) => {
    return {
        type: EnumAuthRedActionType.setProfile,
        payload: {profileData}
    } as const
}
const isMeAC = () => {
    return {
        type: EnumAuthRedActionType.isMe,
        payload: {
            isMe: true,
            isRegister: true,
        },
    } as const
}
const isRegisterAC = () => {
    return {
        type: EnumAuthRedActionType.isRegister,
        payload: {isRegister: true}
    } as const
}
const deleteProfileAC = () => {
    return {
        type: EnumAuthRedActionType.deleteProfile,
        payload: {
            isMe: false,
            isRegister: false,
            profile: {} as ProfileType,
        },
    } as const
}


//thunk creator
export const logInTC = (data: LogInArgsType): AppThunk => async dispatch => {
    try {
        const res = await auth.logIn(data)
        dispatch(setProfileAC(res.data))
        dispatch(isMeAC())
    } catch (e: any) {
        alert(e)
    }
}

export const isRegisterTC = (data: LogInArgsType): AppThunk => async dispatch => {
    try {
        const res = await auth.register(data.email, data.password)
        dispatch(isRegisterAC())
    } catch (e: any) {
        alert(e)
    }
}

export const isMeTC = (): AppThunk => async dispatch => {
    try {
        const res = await auth.me()
        dispatch(setProfileAC(res.data))
        dispatch(isMeAC())
    } catch (e) {
        // alert(e)
    }
    dispatch(isInitializedAC())
}
export const logOutTC = (): AppThunk => async dispatch => {
    try {
        const res = await auth.logOut()
        dispatch(deleteProfileAC())
    } catch (e) {
        alert(e)
    }
}
export const passwordRecoveryTC = (email: string): AppThunk => async dispatch => {
    const data: PasswordRecoveryType = {
        email: email,
        from: 'test-front-admin <laub94@list.ru>',
        message: (`<div style="background-color: lime; padding: 15px">
password recovery link: 
<a href='http://localhost:3000/#/set-new-password/$token$'>
link</a>
</div>`)
    }
    try {
        const res = await auth.passwordRecovery(data)
        alert('Смотри почту')
    } catch (e) {
        alert(e)
    }
}
export const passwordChangeTC = (password: string, param: string = ''): AppThunk => async dispatch => {
    try {
        const res = await auth.setNewPassword(password, param)
        dispatch(deleteProfileAC())
        alert('пароль поменялся')
    } catch (e) {
        alert(e)
    }
}


//type
type initialStateType = typeof initialState
export type AuthRedActionType =
    | ReturnType<typeof setProfileAC>
    | ReturnType<typeof isMeAC>
    | ReturnType<typeof isRegisterAC>
    | ReturnType<typeof deleteProfileAC>
