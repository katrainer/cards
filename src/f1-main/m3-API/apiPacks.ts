import {instance} from './apiConfig/apiConfig';

export const packs = {
    //Получаем карты
    getPacks(data: getPacksDataType) {
        const {packName, min, max, sortPacks, page, pageCount} = data
        return instance.get<getPacksResponseType>(`cards/pack?packName=${packName}&min=${min}&max=${max}&sortPacks=${sortPacks}&page=${page}&pageCount=${pageCount}`).then(res => res.data)
    }
}
//type
export type getPacksDataType = {
    packName?: string
    min?: number
    max?: number
    sortPacks?: '1update' | '0update'
    page?: number
    pageCount?: number
}

type getPacksResponseType = {
    cardPacks: PackType[]
    cardPacksTotalCount: number //кол-во колод
    maxCardsCount: number
    minCardsCount: number
    page: number // выбранная страница
    pageCount: number // количество элементов на странице
}
export type PackType = {
    _id: string
    name: string
    cardsCount: number
    created: string
    updated: string
}