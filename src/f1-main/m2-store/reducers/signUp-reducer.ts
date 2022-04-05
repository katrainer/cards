import {auth, RegisterType} from '../../m3-API/api';
import {AppThunk} from '../store';


enum EnumReducerActionType {
    Register = 'AUTH/IS-REGISTER',
}


const initialState = {
    isRegister: false
}

export const RegisterReducer = (state: initialStateType = initialState, action: RegisterReducerActionType): initialStateType => {
    switch (action.type) {
        case EnumReducerActionType.Register:
            return {...state, ...action.payload}
        default:
            return state
    }
}

// action creator

const RegisterAC = () => {
    return {
        type: EnumReducerActionType.Register,
        payload: {isRegister: true}
    } as const
}


//thunk creator

export const RegisterTC = (data: RegisterType): AppThunk => async dispatch => {
    try {
        const res = await auth.register(data)
        dispatch(RegisterAC())
    } catch (e: any) {
        alert(e)
    }
}



//type
type initialStateType = typeof initialState
export type RegisterReducerActionType = ReturnType<typeof RegisterAC>
