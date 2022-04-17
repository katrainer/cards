import {instance} from './apiConfig/apiConfig';

export const packs = {
    //Получаем карты
    getPacks(data: getPacksDataType) {
        return instance.get<getPacksResponseType>('cards/pack', {params: data}).then(res => res.data)
    },
    //Добавление колоды
    addPack(name: string, privateBoolean: boolean, deckCover?: 'url or base64') {
        return instance.post<getNewPackResponseType>('cards/pack',
            {cardsPack: {name, private: privateBoolean,}})
    },
    //Удаление колоды
    deletePack(id: string) {
        return instance.delete(`cards/pack?id=${id}`)
    },
    //Обновление колоды
    updatePack(_id: string, name: string) {
        return instance.put('cards/pack', {cardsPack: {_id, name}})
    }
}
//type
export type getPacksDataType = {
    packName: string
    min: number
    max: number
    sortPacks: '1updated' | '0updated'
    page: number
    pageCount: number
    user_id: string
}

type getPacksResponseType = {
    cardPacks: PackType[]
    cardPacksTotalCount: number //кол-во колод
    maxCardsCount: number
    minCardsCount: number
    page: number // выбранная страница
    pageCount: number // количество элементов на странице

}
type getNewPackResponseType = {
    newCardsPack: PackType[]
}

export type PackType = {
    _id: string
    name: string
    cardsCount: number
    created: string
    updated: string
    user_name: string
}