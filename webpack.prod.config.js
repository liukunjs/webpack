var merge = require("webpack-merge")
var com = require("./webpack.comont.js")
var prod = {
	// 设置开发着模式可使打包代码为半解压式,并且develoment 默认不到 tree shacking
	mode:"production",
	devtool:"cheap-module-inline-souce-map",
	/*
		eval : 是使用eval 的方式包裹错误内容并指向一个文件map文件
		cheap: 是在map文件提示错误的时候只提示哪一行错误，不管那一列，因为当文件较大的时候，打包很耗时，同时打包的文件也很大
		module: 加了module的时候打会关心webpack loader的代码或者第三方代码的报错，如果不加module的时候map报错只关心你的业务代码
		inline：是会map文件打包成一个base64的文件放在js里面减少打包的时间
	*/
	
}
module.exports = merge(com,prod)