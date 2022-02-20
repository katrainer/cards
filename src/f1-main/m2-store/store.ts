import {applyMiddleware, combineReducers, createStore} from "redux";
import thunk from "redux-thunk";
import {SomeRed1} from "./reducers/SomeRed1";
import {SomeRed2} from "./reducers/SomeRed2";

type rootReducerType = ReturnType<typeof rootReducer>
const rootReducer = combineReducers({
    SomeRed1,
    SomeRed2,
})

export const store = createStore(rootReducer,applyMiddleware(thunk))

//@ts-ignore
window.store = store
