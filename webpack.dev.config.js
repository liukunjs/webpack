var merge = require("webpack-merge")
var com = require("./webpack.comont.js")
var path = require('path')
var dev = {
	// 设置开发着模式可使打包代码为半解压式,并且develoment 默认不到 tree shacking
	mode:"development",
	devtool:"eval-module-inline-souce-map",
	/*
		eval : 是使用eval 的方式包裹错误内容并指向一个文件map文件
		cheap: 是在map文件提示错误的时候只提示哪一行错误，不管那一列，因为当文件较大的时候，打包很耗时，同时打包的文件也很大
		module: 加了module的时候打会关心webpack loader的代码或者第三方代码的报错，如果不加module的时候map报错只关心你的业务代码
		inline：是会map文件打包成一个base64的文件放在js里面减少打包的时间
	*/
	// 启用devserver 本地启动服务，自动帮你打包，文件跟新刷新页面
	devServer:{
		// 启动文件的地址
		contentBase: path.join(__dirname, "dist"),
		open:true,
		port:3000,
		publicPath: "/",
		// devserver自带 hot 功能，在我们不只修改css时会不刷新页面，不需要下载插件执行
		hot:true,
		// 这个设置为当我们的hot-module-replacement 功能不启效果时，也能不刷新也，但是我们修改js文件也不回刷新页面
		// 这个就是很友好，但是可以在js文件中设置代码是否更新然后在判断是否跟新
		// hotOnly:true
		host:"192.168.0.102",
		proxy:{
			// "/api":{
			// 	target:"",
			// }
			// 写法1: "/api":'localhost:3000'
			"/api": {
    			target: "localhost:3000",
    			// changeOrigin: true,
    			// secure: false,
    			// bypass: function(req, res, proxyOptions) {
    			// 		// console.log(req,7777777)
      	// 			// if (req.headers.accept.indexOf("html") !== -1) {
       //  		// 		console.log("Skipping proxy for browser request.");
      	//   		// 	return "/index.html";
      	// 				// }
      	// 				return req.url.path
    			// }
  			}
		},
		// 这个b 作用极大，首先我在做 请求本地“/api“文件的时候，服务器会找不到，但是我们在在配置了这个参数为true的时候
		// 他如果在服务器拿不到的时候会从本地的文件系统拿，为自己开发使用，同理在我们使用多路由的时候就会根据本地 url 在
		// 本地本地找打文件
		historyApiFallback: true,
		// headers:{
		// 	'Accept': 'application/json',
      	// 	'Content-Type': 'application/json; charset=utf-8',
      	// 	"Access-Control-Allow-Origin":"*",
		// },
	},
	optimization:{
		// 只有在开发环境才需要设置，目的tree shacking,只使用引入的模块打包	
		usedExports:true
	}
	
}
module.exports = merge(dev,com)