
const a  = import(/*webpackChunkName: "aCom"*/"./a.js").then(item=>{
        console.log(11123,item)
})