import React from "react";
import Active from "./active"
import Static from "./static"
function Hmr() {
    return(
        <div>
            <Active/>
            <Static/>
        </div>
    )
}
if(module.hot){
    module.hot.accept("./static",()=>{
        Static(1)
    })
}
export default Hmr