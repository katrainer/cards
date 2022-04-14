
import {instance} from './apiConfig/apiConfig';

export const packs = {
    //Получаем карты
    getPacks(data: getPacksDataType, search:string,) {
        const { min, max, sortPacks, page, pageCount} = data
        const packName = search
        return instance.get<getPacksResponseType>(`cards/pack?packName=${packName}&min=${min}&max=${max}&sortPacks=${sortPacks}&page=${page}&pageCount=${pageCount}&user_id=${"624f0f316eea350004ade302"}`).then(res => res.data)
    },
    addPack(name:string, privateBoolean:boolean){
        return instance.post<getNewPackResponseType>('cards/pack', {cardsPack: {name, private: privateBoolean, }})
    },
    deletePack(id: string){
        return instance.delete(`cards/pack?id=${id}`)
    },
    updatePack(_id: string, name: string){
        return instance.put('cards/pack', {cardsPack: {_id, name}})
    }
}
//type
export type getPacksDataType = {
    packName: string
    min: number
    max: number
    sortPacks?: '1updated' | '0updated'
    page?: number
    pageCount: number
}

type getPacksResponseType = {
    cardPacks: PackType[]
    cardPacksTotalCount: number //кол-во колод
    maxCardsCount: number
    minCardsCount: number
    page: number // выбранная страница
    pageCount: number // количество элементов на странице
}
type getNewPackResponseType ={
    newCardsPack: PackType[]
}

export type PackType = {
    _id: string
    name: string
    cardsCount: number
    created: string
    updated: string
}