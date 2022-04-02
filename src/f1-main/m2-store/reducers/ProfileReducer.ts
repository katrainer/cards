type initialStateType = typeof initialState


const initialState = {
    profile: {
        avatar: "https://i.imgur.com/4DPdWgW.png",
        name: 'Piram',
    } as ProfileType
}

export const profileReducer = (state: initialStateType = initialState, action: ProfileActionType): initialStateType => {
    switch (action.type) {
        case "SET_PROFILE":
            return {...state, profile: action.profile}
        default:
            return {...state}
    }
}

// action creator
export type ProfileActionType = ReturnType<typeof setProfile>

export const setProfile = (profile: ProfileType) => {
    return {
        type: "SET_PROFILE",
        profile,
    }as const
}


//thunk creator



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