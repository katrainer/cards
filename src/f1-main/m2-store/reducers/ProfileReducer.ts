import {auth} from "../../m3-API/api";
import {AppThunk} from "../store";
import axios from "axios";

type initialStateType = typeof initialState


const initialState = {
    profile: {} as ProfileType,
    isAuth: false
}

export const profileReducer = (state: initialStateType = initialState, action: ProfileActionType): initialStateType => {
    switch (action.type) {
        case "SET_PROFILE":
            return {...state, profile: action.profile}
        case "IS_LOGGED_IN":
            return {...state, isAuth: action.isAuth}
        default:
            return {...state}
    }
}

// action creator
export type ProfileActionType =
    ReturnType<typeof setProfile>
    | ReturnType<typeof updateProfile>
    | ReturnType<typeof isLoggedIn>

export const setProfile = (profile: ProfileType) => {
    return {
        type: "SET_PROFILE",
        profile,
    } as const
}

export const updateProfile = (name: string, avatar: string) => {
    return {
        type: "UPDATE_PROFILE",
        name,
        avatar,
    } as const
}

export const isLoggedIn = (isAuth: boolean) => {
    return {
        type: "IS_LOGGED_IN",
        isAuth,
    } as const
}


//thunk creator

export const getProfile = ():AppThunk =>  async (dispatch) => {
    try {
        const response = await auth.me()
        dispatch(setProfile(response.data))
        dispatch(isLoggedIn(true))
    } catch (error) {
        if(axios.isAxiosError(error) && error.response) {
            const errorMessage = error.response.data.error;
            console.log(errorMessage)
        }
    }

}


export type ProfileType = {
    _id: string;
    email: string;
    name: string;
    avatar?: string;
    publicCardPacksCount: number;
    created: Date;
    updated: Date;
    isAdmin: boolean;
    verified: boolean;
    rememberMe: boolean;
    error?: string;
};