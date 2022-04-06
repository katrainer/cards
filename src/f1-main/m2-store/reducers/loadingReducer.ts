type initialStateType = typeof initialState


const initialState = {
    isLoading: true
}

export const loadingReducer = (state: initialStateType = initialState, action: LoadingActionType): initialStateType => {
    switch (action.type) {
        case 'IS_LOADING':
            return {...state, ...action.payload}
        default:
            return {...state}
    }
}

export type LoadingActionType = ReturnType<typeof loadingAC>

export const loadingAC = (isLoading: boolean) => {
    return {
        type: 'IS_LOADING',
        payload: {isLoading}
    } as const
}