import {instance} from "./apiConfig/apiConfig";
import {AxiosResponse} from "axios";


export const apiCards = {
    getCards(data: GetCardsDataType) {
        return instance.get<GetCardsDataType, AxiosResponse<GetCardsResponseType>>(`cards/card?card`, {params: data})
    },
    createCard(data: CreateCardsType) {
        return instance.post<CreateCardsType>(`cards/card`, {card:data})
    },
    removeCard(id: string) {
        return instance.delete(`cards/card?id=${id}`)
    },
    updateCards(data: UpdateCardsType) {
        return instance.put<UpdateCardsType>(`cards/card`, {card: data})
    }
}

export type GetCardsDataType = {
    cardAnswer?: string
    cardQuestion?: string
    cardsPack_id: string
    min?: number
    max?: number
    sortCards?: string
    page?: number
    pageCount?: number
}


export type CardsType = {
    answer: string
    question: string
    cardsPack_id: string
    grade: number
    shots: number
    user_id: string
    created: string
    updated: string
    _id: string
}
export type GetCardsResponseType = {
    cards: CardsType[]
    cardsTotalCount: number
    maxGrade: number
    minGrade: number
    page: number
    pageCount: number
    packUserId: string
}

export type CreateCardsType = {
    cardsPack_id: string
    question?: string
    answer?: string
    grade?: number
    shots?: number
    answerImg?: string
    questionImg?: string
    questionVideo?: string
    answerVideo?: string
}

export type UpdateCardsType = {
    _id: string
    question?: string
    answer?: string
}
