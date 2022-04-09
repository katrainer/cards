import {auth, LogInArgsType, PasswordRecoveryType, RegisterType,} from '../../m3-API/apiAuth';
import {AppThunk} from '../store';
import axios from 'axios';
import {deleteProfileAC, setProfileAC} from './ProfileReducer';
import {loadingAC} from './appReducer';

enum EnumAuthReducerActionType {
    isMe = 'AUTH/IS-ME',
    register = 'AUTH/IS-REGISTER',
    logOut = 'AUTH/LOG-OUT',
}

const initialState = {
    isMe: false,
    isRegister: false,
};

export const authReducer = (
    state: initialStateType = initialState,
    action: AuthRedActionType
): initialStateType => {
    switch (action.type) {
        case EnumAuthReducerActionType.isMe:
        case EnumAuthReducerActionType.register:
        case EnumAuthReducerActionType.logOut:
            return {...state, ...action.payload}
        default:
            return {...state};
    }
};

// action creator
const isMeAC = () => {
    return {
        type: EnumAuthReducerActionType.isMe,
        payload: {isMe: true, isRegister: true}
    } as const
}
const registerAC = () => {
    return {
        type: EnumAuthReducerActionType.register,
        payload: {isRegister: true}
    } as const
}
const logOutAC = () => {
    return {
        type: EnumAuthReducerActionType.logOut,
        payload: {
            isMe: false,
            isRegister: false,
        },
    } as const

};
const RegisterAC = () => {
    return {
        type: EnumAuthReducerActionType.register,
        payload: {isRegister: true},
    } as const;
}


//thunk creator
export const logInTC = (data: LogInArgsType): AppThunk =>
    async dispatch => {
        try {
            const res = await auth.logIn(data);
            dispatch(setProfileAC(res));
            dispatch(isMeAC());
        } catch (e: any) {
            if (axios.isAxiosError(e) && e.response) {
                const errorMessage = e.response.data.error;
                alert(errorMessage)
            }
        }
    }
export const isMeTC = (): AppThunk => async dispatch => {
    dispatch(loadingAC(true))
    try {
        const res = await auth.me()
        dispatch(setProfileAC(res))
        dispatch(isMeAC())
    } catch (e) {
        if (axios.isAxiosError(e) && e.response) {
            const errorMessage = e.response.data.error;
            console.log(errorMessage)
        }
    } finally {
        dispatch(loadingAC(false))
    }

};
export const singUpTC = (data: RegisterType): AppThunk =>
    async dispatch => {
        try {
            const res = await auth.register(data)
            alert('Profile created successfully')
            dispatch(registerAC())
        } catch (e) {
            if (axios.isAxiosError(e) && e.response) {
                const errorMessage = e.response.data.error;
                alert(errorMessage)
            }
        }
    };

export const sendTokenTC = (email: string): AppThunk =>
    async dispatch => {
        const data: PasswordRecoveryType = {
            email,
            from: 'test-front-admin <laub94@list.ru>',
            message: `<div style="background-color: lime; padding: 15px">
password recovery link: 
<a href='http://localhost:3000/#/set-new-password/$token$'>
link</a>
</div>`,
        }
        try {
            const res = await auth.passwordRecovery(data)
            alert('Go to the mail page: ' + {email})
        } catch (e) {
            if (axios.isAxiosError(e) && e.response) {
                const errorMessage = e.response.data.error;
                alert(errorMessage)
            }
        }
    }
export const logOutTC = (): AppThunk => async dispatch => {
    try {
        const res = await auth.logOut()
        dispatch(logOutAC())
        dispatch(deleteProfileAC())
    } catch (e) {
        if (axios.isAxiosError(e) && e.response) {
            const errorMessage = e.response.data.error;
            alert(errorMessage)
        }
    }
}

export const setNewPassTC = (password: string, token: string = ''): AppThunk => async dispatch => {
    try {
        await auth.newPassword(password, token)
        alert('Password changed successfully')
    } catch (e) {
        if (axios.isAxiosError(e) && e.response) {
            const errorMessage = e.response.data.error;
            alert(errorMessage)
        }
    }
}


//type
type initialStateType = typeof initialState;
export type AuthRedActionType =
    | ReturnType<typeof isMeAC>
    | ReturnType<typeof registerAC>
    | ReturnType<typeof logOutAC>
    | ReturnType<typeof isMeAC>
    | ReturnType<typeof RegisterAC>