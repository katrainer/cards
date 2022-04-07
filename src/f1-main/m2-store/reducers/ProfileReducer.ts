import {auth, ProfileType} from "f1-main/m3-API/api"
import {AppThunk} from "../store";
import axios from "axios";
import {loadingAC} from "./appReducer";

type initialStateType = typeof initialState


const initialState = {
    profile: {} as ProfileType,
}

export const profileReducer = (state: initialStateType = initialState, action: ProfileActionType): initialStateType => {
    switch (action.type) {
        case 'SET_PROFILE':
            return {...state, ...action.payload}
        case 'UPDATE_PROFILE':
            return {...state, profile: {...state.profile, ...action.payload}}
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
    | ReturnType<typeof deleteProfile>

export const setProfile = (profile: ProfileType) => {
    return {
        type: 'SET_PROFILE',
        payload:{ profile}
    } as const
}

export const updateProfile = (name: string, avatar: string) => {
    return {
        type: 'UPDATE_PROFILE',
        payload: {
            name,
            avatar,
        }
    } as const
}
export const deleteProfile = () => {
    return {
        type: 'DELETE-PROFILE',
        payload: {} as ProfileType
    } as const
}


//thunk creator

export const updateTC = (name?: string | undefined, avatar?: string | undefined): AppThunk => async (dispatch) => {
    dispatch(loadingAC(true))
    try {
        const response = await auth.updateMe(name, avatar)
        dispatch(updateProfile(response.data.updatedUser.name, response.data.updatedUser.avatar))
    } catch (error) {
        if (axios.isAxiosError(error) && error.response) {
            const errorMessage = error.response.data.error;
            console.log(errorMessage)
        }
    } finally {
        dispatch(loadingAC(false))
    }

}