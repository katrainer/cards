import {apiCards, CardsType, CreateCardsType, GetCardsResponseType, GradeType} from '../../m3-API/apiCards';
import {AppThunk} from '../store';
import axios from 'axios';

enum EnumCardsReducerActionType {
    setCards = 'CARDS/SET-CARDS',
    updateGrade = 'CARDS/UPDATE-GRADE',
    // removeCard = 'CARDS/REMOVE-CARD',
    createCards = 'CARDS/CREATE-CARD',
    updateCard = 'CARDS/UPDATE-CARD',
    updateGradeCard = 'CARDS/UPDATE-GRADE-CARD', //new method
    changeRequestStatusType = 'CARDS/CHANGE-REQUEST-STATUS-TYPE',
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
    requestStatus: 'idle' as RequestStatusType
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
        case EnumCardsReducerActionType.changeRequestStatusType:
            return {...state, ...action.payload}
        case EnumCardsReducerActionType.updateGradeCard:
            return {
                ...state, cards: state.cards.map(t => t._id === action.payload.card_id ?
                    {...t, grade: action.payload.grade} : t)
            }
        default:
            return {...state}
    }
}

//action
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
const changeRequestStatusAC = (requestStatus: RequestStatusType) => {
    return {
        type: EnumCardsReducerActionType.changeRequestStatusType,
        payload: {requestStatus}
    } as const
}
const updateGradeCardAC = (grade: GradeType | number, card_id: string) => { //new method
    return {
        type: EnumCardsReducerActionType.updateGradeCard,
        payload: {
            grade,
            card_id
        },
    } as const
}


//thunk
export const setCardsTC = (cardsPack_id: string): AppThunk => async (dispatch, getState) => {
    dispatch(changeRequestStatusAC('loading'))
    const {sortCards, page, pageCount} = getState().cards;
    try {
        const res = await apiCards.getCards({cardsPack_id, sortCards, page, pageCount})
        dispatch(setCardsAC(res.data))
        dispatch(changeRequestStatusAC('succeeded'))
    } catch (e) {
        if (axios.isAxiosError(e) && e.response) {
            const errorMessage = e.response.data.error;
            alert(errorMessage)
            dispatch(changeRequestStatusAC('failed'))
        }
    }
}

export const updateCardTC = (cardsPack_id: string, _id: string, question?: string, answer?: string): AppThunk => async dispatch => {
    dispatch(changeRequestStatusAC('loading'))
    try {
        await apiCards.updateCards({_id, question, answer})
        dispatch(setCardsTC(cardsPack_id))
        dispatch(changeRequestStatusAC('succeeded'))
    } catch (e) {
        if (axios.isAxiosError(e) && e.response) {
            const errorMessage = e.response.data.error;
            alert(errorMessage)
            dispatch(changeRequestStatusAC('failed'))
        }
    }
}

export const createCardTC = (data: CreateCardsType): AppThunk => async dispatch => {
    dispatch(changeRequestStatusAC('loading'))
    try {
        await apiCards.createCard(data)
        dispatch(setCardsTC(data.cardsPack_id))
        dispatch(changeRequestStatusAC('succeeded'))
    } catch (e) {
        if (axios.isAxiosError(e) && e.response) {
            const errorMessage = e.response.data.error;
            alert(errorMessage)
            dispatch(changeRequestStatusAC('failed'))
        }
    }
}

export const removeCardTC = (cardsPack_id: string, id: string): AppThunk => async dispatch => {
    dispatch(changeRequestStatusAC('loading'))
    try {
        await apiCards.removeCard(id)
        dispatch(setCardsTC(cardsPack_id))
        dispatch(changeRequestStatusAC('succeeded'))
    } catch (e) {
        if (axios.isAxiosError(e) && e.response) {
            const errorMessage = e.response.data.error;
            alert(errorMessage)
            dispatch(changeRequestStatusAC('failed'))
        }
    }
}

export const updateGradeCardTC = (grade: GradeType, card_id: string): AppThunk => async dispatch => {
    dispatch(changeRequestStatusAC('loading'))
    try {
        const res = await apiCards.updateGradeCard(grade, card_id)
        dispatch(updateGradeCardAC(res.grade, res.card_id))
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
export type CardsReducerActionType =
    | ReturnType<typeof setCardsAC>
    | ReturnType<typeof updateGradeAC>
    | ReturnType<typeof updateGradeCardAC>
    | ReturnType<typeof changeRequestStatusAC>
export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'
