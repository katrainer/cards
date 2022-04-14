Советы по кодстайлу:

__________________________________________________
1. Структура редьюсера
   enum EnumSomeReducerActionType {
   setSome = 'SOME/SET-SOME'
   }

const initialState = {
someProperty: 'someValue'
}
export const someReducer = (state: initialStateType = initialState, action: SomeReducerActionType): initialStateType => {
switch (action.type) {
default:
return {...state}
}
}

//action
const setSomeAC = () => {
return {
type: EnumSomeReducerActionType.setSome,
} as const
}

//thunk
export const getSomeTC = (): AppThunk => dispatch => {
try {

    } catch (e) {
        if (axios.isAxiosError(e) && e.response) {
            const errorMessage = e.response.data.error;
            alert(errorMessage)
        }
    } finally {

    }
}

//type
type initialStateType = typeof initialState
export type SomeReducerActionType = ReturnType<typeof setSomeAC>

__________________________________________________
2. В конце названия для action creator добавляем AC
3. В конце названия для thunk creator добавляем TC
4. Для каждой сущности создается отдельный редусер и api
5. Если свойство с state редусера повторно не используется, то есть вероятность, что его не нужно добавлять в initialState
