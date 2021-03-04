 const loaderUilts = require("loader-utils")
 function changName(surce) {
     // 1 这里面不能使用箭头函数，应为，他的所有传参都是通过this 指向绑定的
     // 2 这里的source 是一个打包后的文件，必须修改完后return 回去
    const params = loaderUilts.getOptions(this)
    console.log(params)
    // this.callback(
    //     err: Error | null,
    //     content: string | Buffer,
    //     sourceMap?: SourceMap,
    //     meta?: any
    //   );
    // this.callback(null,content)
    // this.async() //this.async ==this.callback ，只不过是异步的
    let callback = this.async()
    const content =  surce.replace("lk",params.name)
    setTimeout( ()=> {
        callback(null,content)
    },0)
}
module.exports = changName