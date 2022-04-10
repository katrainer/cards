import {instance} from "./apiConfig/apiConfig";

const params = {
    cardAnswer: '?cardAnswer=english',
    cardQuestion: '&cardQuestion=english',
    cardsPack_id: '&cardsPack_id=5eb6a2f72f849402d46c6ac7 ',
    min: '&min=1',
    max: '&max=4',
    sortCards: '&sortCards=0grade',
    page: '&page=1',
    pageCount: '&pageCount=7',
}as const

export const apiCards = {
    getCards(params: ParamsType){
        return instance.get(`cards/card/&${params.cardsPack_id}`)
    }
}


type ParamsType = typeof params