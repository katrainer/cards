enum EnumAppReducerActionType {
    loading = 'APP/LOADING'
}

const initialState = {
    isLoading: true
}

export const appReducer = (state: initialStateType = initialState, action: LoadingActionType): initialStateType => {
    switch (action.type) {
        case EnumAppReducerActionType.loading:
            return {...state, ...action.payload}
        default:
            return {...state}
    }
}

//action
export const loadingAC = (isLoading: boolean) => {
    return {
        type: EnumAppReducerActionType.loading,
        payload: {isLoading}
    } as const
}

//thunk

//type
type initialStateType = typeof initialState
export type LoadingActionType = ReturnType<typeof loadingAC>
