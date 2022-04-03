enum EnumAppRedActionType {
    isInitialized = 'APP/IS-INITIALIZED',

}

const initialState = {
    isInitialized: false
}

export const appRed = (state: initialStateType = initialState, action: AppRedActionType): initialStateType => {
    switch (action.type) {
        case EnumAppRedActionType.isInitialized:
            return {...state, ...action.payload}
        default:
            return {...state}
    }
}

// action creator
export const isInitializedAC = () => {
    return {
        type: EnumAppRedActionType.isInitialized,
        payload: {isInitialized: true,},
    } as const
}

//thunk creator

//type
type initialStateType = typeof initialState
export type AppRedActionType =
    | ReturnType<typeof isInitializedAC>