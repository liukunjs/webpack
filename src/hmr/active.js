import React,{useState} from "react";
const  Active=(props)=>{
    const [num,setNum] = useState(0)
    return(
        <div onClick={()=>setNum(num+1)}>
            {num}
        </div>
    )
}
export default Active