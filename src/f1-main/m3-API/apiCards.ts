import {instance} from './apiConfig/apiConfig';
import {AxiosResponse} from 'axios';


export const apiCards = {
    getCards(data: GetCardsDataType) {
        return instance.get<GetCardsDataType, AxiosResponse<GetCardsResponseType>>(`cards/card`, {params: data})
    },
    createCard(data: CreateCardsType) {
        return instance.post<CreateCardsType>(`cards/card`, {card: data})
    },
    removeCard(id: string) {
        return instance.delete(`cards/card?id=${id}`)
    },
    updateCards(data: UpdateCardsType) {
        return instance.put<UpdateCardsType>(`cards/card`, {card: data})
    },
    //отправка оценки карточки
    updateGradeCard(grade: GradeType, card_id: string) {
        return instance.put<UpdateGradeCardResponse>('cards/grade', {grade, card_id}).then(res => res.data)
    },
}

//type
export type GradeType = 1 | 2 | 3 | 4 | 5
export type UpdateGradeCardResponse = {
    _id: string
    cardsPack_id: string
    card_id: string
    user_id: string
    grade: GradeType | number //Надо сначала посмотреть, что приходит. Будет ли целое число
    shots: number
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
