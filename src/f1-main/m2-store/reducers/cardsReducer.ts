import {apiCards, CardsType, CreateCardsType, GetCardsResponseType} from "../../m3-API/apiCards";
import {AppThunk} from "../store";
import axios from "axios";

enum EnumCardsReducerActionType {
    setCards = 'CARDS/SET-CARDS',
    updateGrade = 'CARDS/UPDATE-GRADE',
    // removeCard = 'CARDS/REMOVE-CARD',
    createCards = 'CARDS/CREATE-CARD',
    updateCard = 'CARDS/UPDATE-CARD',
}

const initialState = {
    cards: [] as CardsType[],
    cardsTotalCount: 0,
    maxGrade: 10,
    minGrade: 0,
    page: 1,
    pageCount: 50,
    packUserId: '',
    sortCards: '0updated',
    cardsPack_id: '6255617c2a4150000412ed70'
}

export const cardsReducer = (state: initialStateType = initialState, action: CardsReducerActionType): initialStateType => {
    switch (action.type) {
        case EnumCardsReducerActionType.setCards:
            return {
                ...state,
                cards: action.payload.cardsData.cards,
                packUserId: action.payload.cardsData.packUserId,
                cardsTotalCount: action.payload.cardsData.cardsTotalCount,
            }
        case EnumCardsReducerActionType.updateGrade:
            return {
                ...state, cards: [...state.cards, ...state.cards.filter(f => {
                    if (f._id === action.payload.id) {
                        f.grade = action.payload.grade
                    }
                })]
            }
        default:
            return {...state}
    }
}

const setCardsAC = (cardsData: GetCardsResponseType) => {
    return {
        type: EnumCardsReducerActionType.setCards,
        payload: {cardsData},
    } as const
}

export const updateGradeAC = (grade: number, id: string) => {
    return {
        type: EnumCardsReducerActionType.updateGrade,
        payload: {grade, id},
    } as const
}

export const setCardsTC = (): AppThunk => async (dispatch, getState) => {

    const {cardsPack_id, sortCards, page, pageCount } = getState().cards;
    try {
        const res = await apiCards.getCards({cardsPack_id, sortCards, page, pageCount})
        dispatch(setCardsAC(res.data))
    } catch (e) {
        if (axios.isAxiosError(e) && e.response) {
            const errorMessage = e.response.data.error;
            alert(errorMessage)
        }
    }
}

export const updateCardTC = (_id: string, question?: string, answer?:string):AppThunk=> async (dispatch,getState)=>{

    try{
        await apiCards.updateCards({_id, question, answer})
        dispatch(setCardsTC())
    } catch (e) {
        if (axios.isAxiosError(e) && e.response) {
            const errorMessage = e.response.data.error;
            alert(errorMessage)
        }
    }
}

export const createCardTC = (data: CreateCardsType):AppThunk=> async (dispatch,getState)=>{

    try{
        await apiCards.createCard(data)
        dispatch(setCardsTC())
    } catch (e) {
        if (axios.isAxiosError(e) && e.response) {
            const errorMessage = e.response.data.error;
            alert(errorMessage)
        }
    }
}

export const removeCardTC = (id: string):AppThunk=> async (dispatch)=>{
    try{
        await apiCards.removeCard(id)
        dispatch(setCardsTC())
    } catch (e) {
        if (axios.isAxiosError(e) && e.response) {
            const errorMessage = e.response.data.error;
            alert(errorMessage)
        }
    }
}
//type
type initialStateType = typeof initialState
export type CardsReducerActionType =
    | ReturnType<typeof setCardsAC>
    | ReturnType<typeof updateGradeAC>