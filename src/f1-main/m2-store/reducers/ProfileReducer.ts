import {ProfileType} from 'f1-main/m3-API/api'

type initialStateType = typeof initialState


const initialState = {
    profile: {} as ProfileType,
}

export const profileReducer = (state: initialStateType = initialState, action: ProfileActionType): initialStateType => {
    switch (action.type) {
        case 'SET_PROFILE':
            return {...state, profile: action.profile}
        case 'DELETE-PROFILE':
            return {...state, profile: action.payload}
        default:
            return {...state}
    }
}

// action creator
export type ProfileActionType =
    | ReturnType<typeof setProfile>
    | ReturnType<typeof updateProfile>
    | ReturnType<typeof isLoggedIn>
    | ReturnType<typeof deleteProfile>

export const setProfile = (profile: ProfileType) => {
    return {
        type: 'SET_PROFILE',
        profile,
    } as const
}

export const updateProfile = (name: string, avatar: string) => {
    return {
        type: 'UPDATE_PROFILE',
        name,
        avatar,
    } as const
}

export const isLoggedIn = (isAuth: boolean) => {
    return {
        type: 'IS_LOGGED_IN',
        isAuth,
    } as const
}
export const deleteProfile = () => {
    return {
        type: 'DELETE-PROFILE',
        payload: {} as ProfileType
    } as const
}


//thunk creator