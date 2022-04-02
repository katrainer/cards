type initialStateType = typeof initialState
const initialState = {}

export const ProfileReducer = (state: initialStateType = initialState, action: GeneralActionType) => {
    switch (action.type) {
        default:
            return {...state}
    }
}

// action creator
type GeneralActionType = any


//thunk creator