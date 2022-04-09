import {auth, ProfileType} from 'f1-main/m3-API/apiAuth'
import {AppThunk} from '../store';
import axios from 'axios';
import {loadingAC} from './appReducer';

enum EnumProfileActionType {
    setProfile = 'PROFILE/SET-PROFILE',
    updateProfile = 'PROFILE/UPDATE-PROFILE',
    deleteProfile = 'PROFILE/DELETE-PROFILE',
}

const initialState = {
    profile: {} as ProfileType,
}

export const profileReducer = (state: initialStateType = initialState, action: ProfileActionType): initialStateType => {
    switch (action.type) {
        case EnumProfileActionType.setProfile:
            return {...state, ...action.payload}
        case EnumProfileActionType.updateProfile:
            return {...state, profile: {...state.profile, ...action.payload}}
        case EnumProfileActionType.deleteProfile:
            return {...state, profile: action.payload}
        default:
            return {...state}
    }
}

//action
export const setProfileAC = (profile: ProfileType) => {
    return {
        type: EnumProfileActionType.setProfile,
        payload: {profile}
    } as const
}
export const updateProfileAC = (name: string, avatar: string) => {
    return {
        type: EnumProfileActionType.updateProfile,
        payload: {
            name,
            avatar,
        }
    } as const
}
export const deleteProfileAC = () => {
    return {
        type: EnumProfileActionType.deleteProfile,
        payload: {} as ProfileType
    } as const
}

//thunk
export const updateProfileTC = (name: string, avatar: string): AppThunk => async dispatch => {
    dispatch(loadingAC(true))
    try {
        const res = await auth.updateMe(name, avatar)
        dispatch(updateProfileAC(res.updatedUser.name, res.updatedUser.avatar))
    } catch (e) {
        if (axios.isAxiosError(e) && e.response) {
            const errorMessage = e.response.data.error;
            alert(errorMessage)
        }
    } finally {
        dispatch(loadingAC(false))
    }
}


//type
type initialStateType = typeof initialState
export type ProfileActionType =
    | ReturnType<typeof setProfileAC>
    | ReturnType<typeof updateProfileAC>
    | ReturnType<typeof deleteProfileAC>
