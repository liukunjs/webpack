console.log("aaaaaaaaa")
const a  = import(/*webpackChunkName: "bCom"*/"./b.js").then(item=>{
    console.log(11123,item)
})