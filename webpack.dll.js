let path = require("path")
let webpack = require("webpack")
const { plugins } = require("./webpack.comont")
module.exports={
    entry:{
        varnder:["react","react-dom"]
    },
    output:{
        // 生产打包后的文件
        filename:"__dll__[name].js",
        path:path.resolve(__dirname,"dist"),
        // 打包的modulemodule 文件要和 下面生产的manifest。json文件一致
        library:"__dll__[name]",
    },
    plugins:[
        // 主要生产json的地址
        new webpack.DllPlugin({
            name:"__dll__[name]",
            path:path.resolve(__dirname,"dist","manifest.json")
        })
    ]
}