import { at } from "lodash"
import action from "./action"
const initStoreData = {
    inputValue:"who to do",
    list:[
      "lk111",
      "lk114",
      "lk115",
      "lk116",
    ]
}
const reducer = (state=initStoreData,action)=>{
    switch(action.type){
       case "changeInput":
        return {...state,...{inputValue:action.value}}
        case "addlist":
            const list = state.list
            list.push(action.value)
            console.log({inputValue:'',list})
            return{...state,...{inputValue:'',list}}
        case "thunkValu":
            return{...state,...{thunkValu:action.value}}
        default:
            return state
    }
}
export default reducer