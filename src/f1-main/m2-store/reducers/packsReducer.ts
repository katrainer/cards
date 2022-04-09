import {getPacksDataType, packs, PackType} from 'f1-main/m3-API/apiPacks'
import {AppThunk} from '../store';
import axios from 'axios';

enum EnumPacksReducerActionType {
    setPacks = 'PACKS/SET-PACKS',
    changeRequestStatusType = 'PACKS/CHANGE-REQUEST-STATUS-TYPE',
    setTotalPacks = 'PACKS/SET-TOTAL-PACKS'
}

const initialState = {
    packs: [] as PackType[],
    requestStatus: 'idle' as RequestStatusType,
    requestPacksData: {
        packName: 'english',
        min: 3,
        max: 9,
        sortPacks: '0update',
        page: 1,
        pageCount: 4,
    } as getPacksDataType,
    cardPacksTotalCount: 0
}

export const packsReducer = (state: initialStateType = initialState, action: PacksReducerActionType): initialStateType => {
    switch (action.type) {
        case EnumPacksReducerActionType.setPacks:
        case EnumPacksReducerActionType.changeRequestStatusType:
        case EnumPacksReducerActionType.setTotalPacks:
            return {...state, ...action.payload}
        default:
            return {...state}
    }
}

//action
const setPacksAC = (packs: PackType[]) => {
    return {
        type: EnumPacksReducerActionType.setPacks,
        payload: {packs},
    } as const
}
const changeRequestStatusAC = (requestStatus: RequestStatusType) => {
    return {
        type: EnumPacksReducerActionType.changeRequestStatusType,
        payload: {requestStatus}
    } as const
}
const setTotalPacks = (cardPacksTotalCount: number) => {
    return {
        type: EnumPacksReducerActionType.setTotalPacks,
        payload: {cardPacksTotalCount}
    }
}

//thunk
export const getAllPacks = (): AppThunk => async (dispatch, getState) => {
    const data = getState().packs.requestPacksData
    try {
        const res = await packs.getPacks(data)
        dispatch(setPacksAC(res.cardPacks))
        dispatch(setTotalPacks(res.cardPacksTotalCount))
        dispatch(changeRequestStatusAC('succeeded'))
    } catch (e) {
        if (axios.isAxiosError(e) && e.response) {
            const errorMessage = e.response.data.error;
            alert(errorMessage)
            dispatch(changeRequestStatusAC('failed'))
        }
    }
}

//type
type initialStateType = typeof initialState
export type PacksReducerActionType =
    | ReturnType<typeof setPacksAC>
    | ReturnType<typeof changeRequestStatusAC>
    | ReturnType<typeof setTotalPacks>
export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'
