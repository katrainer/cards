type initialStateType = typeof initialState
const initialState = {}

export const SomeRed2 = (state: any = initialState, action: any) => {
    switch (action.type) {
        default:
            return {...state}
    }
}

// action creator
type GeneralActionType = any


//thunk creator