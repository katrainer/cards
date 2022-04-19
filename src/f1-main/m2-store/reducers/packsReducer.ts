import {getPacksDataType, packs, PackType} from 'f1-main/m3-API/apiPacks'
import {AppThunk} from '../store';
import axios from 'axios';
import {setActiveModalAC} from './modal-reducer';

enum EnumPacksReducerActionType {
    setPacks = 'PACKS/SET-PACKS',
    changeRequestStatusType = 'PACKS/CHANGE-REQUEST-STATUS-TYPE',
    setTotalPacks = 'PACKS/SET-TOTAL-PACKS',
    updateRequestPacksData = 'PACKS/UPDATE-REQUEST-PACKS-DATA',
    setMeId = 'PACKS/SET-ME-ID',
}

const initialState = {
    packs: [] as PackType[],
    requestStatus: 'idle' as RequestStatusType,
    requestPacksData: {
        packName: '',
        min: 0,
        max: 200,
        sortPacks: '0updated',
        page: 1,
        pageCount: 4,
        user_id: ''
    } as getPacksDataType,
    cardPacksTotalCount: 0
}


export const packsReducer = (state: initialStateType = initialState, action: PacksReducerActionType): initialStateType => {
    switch (action.type) {
        case EnumPacksReducerActionType.setPacks:
        case EnumPacksReducerActionType.changeRequestStatusType:
        case EnumPacksReducerActionType.updateRequestPacksData:
        case EnumPacksReducerActionType.setTotalPacks:
            return {...state, ...action.payload}
        case EnumPacksReducerActionType.setMeId:
            return {...state, requestPacksData: {...state.requestPacksData, user_id: action.payload.user_id}}
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
    } as const
}

const updateRequestPacksDataAC =
    (data: getPacksDataType) => {
        return {
            type: EnumPacksReducerActionType.updateRequestPacksData,
            payload: {
                requestPacksData: {
                    ...data
                }
            }
        } as const
    }

export const setMeIdAC = (user_id: string) => {
    return {
        type: EnumPacksReducerActionType.setMeId,
        payload: {user_id},
    } as const
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

export const addPackTC = (name: string, privateBoolean: boolean): AppThunk => async dispatch => {
    dispatch(changeRequestStatusAC('loading'))
    try {
        const res = await packs.addPack(name, privateBoolean)
        dispatch(setActiveModalAC(false))
        dispatch(changeRequestStatusAC('succeeded'))
        dispatch(getAllPacks())
    } catch (e) {
        if (axios.isAxiosError(e) && e.response) {
            const errorMessage = e.response.data.error;
            alert(errorMessage)
            dispatch(changeRequestStatusAC('failed'))
        }
    }
}
export const deletePackTC = (id: string): AppThunk => async dispatch => {
    dispatch(changeRequestStatusAC('loading'))
    try {
        const res = await packs.deletePack(id)
        dispatch(setActiveModalAC(false))
        dispatch(changeRequestStatusAC('succeeded'))
        dispatch(getAllPacks())
    } catch (e) {
        if (axios.isAxiosError(e) && e.response) {
            const errorMessage = e.response.data.error;
            alert(errorMessage)
            dispatch(changeRequestStatusAC('failed'))
        }
    }
}
export const updatePackTC = (_id: string, name: string): AppThunk => async dispatch => {
    dispatch(changeRequestStatusAC('loading'))
    try {
        const res = await packs.updatePack(_id, name)
        dispatch(setActiveModalAC(false))
        dispatch(changeRequestStatusAC('succeeded'))
        dispatch(getAllPacks())
    } catch (e) {
        if (axios.isAxiosError(e) && e.response) {
            const errorMessage = e.response.data.error;
            alert(errorMessage)
            dispatch(changeRequestStatusAC('failed'))
        }
    }
}
export const updateRequestPacksDataTC = (param: UpdateRequestPacksDataModel): AppThunk => (dispatch, getState) => {
    const requestPacksData = getState().packs.requestPacksData
    const model = {
        packName: requestPacksData.packName,
        min: requestPacksData.min,
        max: requestPacksData.max,
        sortPacks: requestPacksData.sortPacks,
        page: requestPacksData.page,
        pageCount: requestPacksData.pageCount,
        user_id: requestPacksData.user_id,
        ...param
    }
    dispatch(updateRequestPacksDataAC(model))
}

//type
type UpdateRequestPacksDataModel = {
    packName?: string
    min?: number
    max?: number
    sortPacks?: '1updated' | '0updated'
    page?: number
    pageCount?: number
    user_id?: string
}
type initialStateType = typeof initialState
export type PacksReducerActionType =
    | ReturnType<typeof setPacksAC>
    | ReturnType<typeof changeRequestStatusAC>
    | ReturnType<typeof setTotalPacks>
    | ReturnType<typeof updateRequestPacksDataAC>
    | ReturnType<typeof setMeIdAC>
export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'