import { createStore ,applyMiddleware ,compose } from "redux";
import reducer from "./reduce";
import thunk from "redux-thunk"
const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__?window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({}):compose()
const enhhancer =composeEnhancer(applyMiddleware(thunk,store=>next=>action=>{
    console.log(store,"store")
    console.log(next,"next")
    console.log(action,"ation")
    next(action)
    return Promise.resolve("successs")
}))
const store = createStore(reducer,enhhancer)
export default store