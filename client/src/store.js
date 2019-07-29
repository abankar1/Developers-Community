import {createStore, applyMiddleware} from "redux"
import {composeWithDevTools} from "redux-devtools-extension"
import rootReducer from "./reducers"
import thunk from "redux-thunk"

const initialstate ={}
const middleware =[thunk]
const store = createStore(rootReducer,initialstate,
composeWithDevTools(applyMiddleware(...middleware)))


export default store