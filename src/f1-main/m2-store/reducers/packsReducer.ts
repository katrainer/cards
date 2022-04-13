import {getPacksDataType, packs, PackType} from 'f1-main/m3-API/apiPacks'
import {AppThunk} from '../store';
import axios from 'axios';
import { loadingAC } from './appReducer';
import { setActiveModalAC } from './modal-reducer';

enum EnumPacksReducerActionType {
    setPacks = 'PACKS/SET-PACKS',
    changeRequestStatusType = 'PACKS/CHANGE-REQUEST-STATUS-TYPE',
    setTotalPacks = 'PACKS/SET-TOTAL-PACKS',
    addPack = 'PACKS/ADD-PACK',
    // deletePack = 'PACKS/DELETE-PACK',
}

const initialState = {
    packs: [] as PackType[],
    requestStatus: 'idle' as RequestStatusType,
    requestPacksData: {
        packName: '',
        min: 0,
        max: 9,
        sortPacks: '0updated',
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
        // !!! НЕ ИЗМЕНЯТЬ, ВСЕ СЛОМАЕТСЯ, ИГНАТ ПОМОГИ!!!
        case 'PACKS/DELETE-PACK':
            return {...state, packs: state.packs.filter(p=> p._id !== action.id && p)}
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
const deletePackAC = (id: string) => {
    return {
        type: 'PACKS/DELETE-PACK',
        id,
    } as const
}

//thunk
export const getAllPacks = (search:string): AppThunk => async (dispatch, getState) => {
    const data = getState().packs.requestPacksData
    try {
        const res = await packs.getPacks(data,search)
        dispatch(setPacksAC(res.cardPacks))
        console.log(res.cardPacks)
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

export const addPackTC = (name:string, privateBoolean:boolean):AppThunk => async (dispatch)=>{
    dispatch(loadingAC(true))
try{
    const res = await packs.addPack(name, privateBoolean)
    // dispatch(changeRequestStatusAC('succeeded'))
    dispatch(setActiveModalAC(false))
    dispatch(loadingAC(false))
}
catch{

}
}

export const deletePackTC = (id:string):AppThunk => async (dispatch)=>{
    dispatch(loadingAC(true))
try{
    const res = await packs.deletePack(id)
    // dispatch(deletePackAC(id))
    dispatch(setActiveModalAC(false))
    dispatch(loadingAC(false))
}
catch{

}
}

export const updatePackTC = (_id:string, name: string):AppThunk => async (dispatch)=>{
    dispatch(loadingAC(true))
try{
    const res = await packs.updatePack(_id, name)
    // dispatch(deletePackAC(id))
    dispatch(setActiveModalAC(false))
    dispatch(loadingAC(false))
}
catch{

}
}
//type
type initialStateType = typeof initialState
export type PacksReducerActionType =
    | ReturnType<typeof setPacksAC>
    | ReturnType<typeof changeRequestStatusAC>
    | ReturnType<typeof setTotalPacks>
    | ReturnType<typeof deletePackAC>
export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'
