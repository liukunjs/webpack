import React,{useState ,useEffect} from "react";
import store from "../../store/store";
import { connect } from "react-redux"
import {Input,Button} from "antd"
const actionFun = ()=>{
    return (dispatch,store)=>{
        console.log(111111)

        // setTimeout(()=>{
            console.log(1111111)
            return dispatch({type:"thunkValu",value:1111})
        // })
    }
}
 function storePage(props) {
    const state = store.getState()
    const [val,setVal]=useState(state.inputValue)
    const [list,setList]=useState(state.list)
    store.subscribe((arg)=>{
        console.log(arg)
        console.log("subscribe")
        if(store.getState().inputValue!=val){
            setVal(store.getState().inputValue)
        }
            setList([...store.getState().list])
    })
    useEffect(()=>{
        
        console.log(store.dispatch(actionFun()),"mmmmmmm")
        // store.dispatch(actionFun())
        console.log(props.actionFun(),"kkkkkkk")

    },[])
    console.log(store)
    const inputChange = (e)=>{
        const {value} =e.target
        store.dispatch({value,type:"changeInput"})
    }
    const add = ()=>{
        if(val){
            store.dispatch({value:val,type:"addlist"})
        }
    }
    return <div>
        <Button style={{display:"block"}} onClick={add}>add</Button>
        <Input  style={{display:"block"}} value = {val} onChange = {inputChange}></Input>
        <div>2222</div>
        {list||[].map(item=>(<div key = {item}>{item}</div>))}
    </div>
    
}
const stateToprops=(state)=>{
    return {
        inputValue:state.inputValue
    }
}
// const disptchToprops = (dispatch)=>{
//     return {
//         getList(){
//             return actionFun() 
//         }
//     }
// }
export default connect(stateToprops,{actionFun})(storePage)