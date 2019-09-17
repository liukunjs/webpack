var path = require('path')
// const { CleanWebpackPlugin } = require('clean-webpack-plugin');
// 在 打包后的文件里映射一个一样的html 文件方便引入打包后的js 文件
var htmlWebpackPlugin = require("html-webpack-plugin")
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
// css 代码分割
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
// 对css代码分割后进行代码压缩
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
module.exports = {
	entry:"./src/index.js",
	module:{
		rules:[{
			test:/\.(jpeg|jpg|png)$/,
			// use 可以是对象，可以是数组，也可以不使用use 直接 loader 和options
			use:{
				loader:"file-loader",
				options:{name:"[name].[ext]"}
			}
		},
		{
			test:/\.(css|less)$/,
			// webpack 从下往上，从右往左的形式，先试css-loader 处理完css 文件在，通过style-loader挂在html上 
			// use:["style-loader",
			// "css-loader"]
			// 形式二 ：
			use:[{loader: MiniCssExtractPlugin.loader,},{loader:"css-loader",
			options:{
				// 	强制先执行
				// force:"pre",
				// 开启模块化方式，不同的css	不能其他的ccs影响
				 modules:true
			}}]				
		},
		{
			test:/\.js$/,
			exclude:/node_modules/,
			use:{
				// babel-loader 只是提供了一个可以让我们在es6和webpack 建立桥梁的关系，并没有能够打包es6的功能
				loader:"babel-loader",
				// babel-loader 的options 可以放入.babelrc文件中
				// 打包es6 的功能
				// // 这个只能编译一下 箭头函数 const 等，但是一些promise，和map函数是不能编译，导致了低版本浏览器会出现兼容问题所以得使用
				options:{
				// 	// presets 里面如果写一个数组的话，第一个要用的presets要用的插件，第二个对象是对当前插件的配置
				// presets:[["@babel/preset-env",{
				// 	// 当使用babel-polyfill 时，不会全部编译ES6的全部，只编译当前使用的es6的代码
				// 	useBuiltIns:"usage",
				// 	// 下列版本不需要转换，极大的减少的打包后的代码体积
				// 	     targets: {
    //     					edge: "17",
    //     					firefox: "60",
    //     					chrome: "67",
    //     					safari: "11.1",
    //   						},
				// }]]

				}
			}
		}
		]
	},

	/*
		可以共享新块或来自该node_modules文件夹的模块
		新块将大于30kb（在min + gz之前）
		根据需要加载块时的最大并行请求数将小于或等于5
		初始页面加载时的最大并行请求数将小于或等于3
	*/
	optimization:{
    	minimizer: [ new OptimizeCSSAssetsPlugin({})],
		// splitChunks:{
		// // chunks:"all"
		// // // 
		// }
		splitChunks: {
			// 为打包的方式 all, async, and initial(同步)：同步的方式会看羡慕casheGroups 的配置，然后在进行打包
      chunks: 'async',
      // 小于这个值就不会被代码分割
      minSize: 30000,
      // 这个我们一般不设置，目的是：如果一个文件特别大，设置这个值，如果这个特别大的文件大于这个值，就进行拆包，把这个文件拆分成几个
      maxSize: 0,
      // 设置这个值是判断如果我们引入的文件至少为1次，才会进行代码分割
      minChunks: 1,
      // 在浏览器进行加载的时候，最少有5个异步请求的时候才会被代码分割
      maxAsyncRequests: 5,
      // 在浏览器进行加载的时候，最少有3个同步请求的时候才会被代码分割
      maxInitialRequests: 3,
      // 在分割后的文件名称以 ～ 作分割
      automaticNameDelimiter: '~',
      // 在分割后的文件名称最多为30个字
      automaticNameMaxLength: 30,
      // 使用名称
      name: true,
      // 这个为 缓存组，在做代码分割的时候，他并不会一次性的打所有的文件，他会先放进一个组内，比如我们要打包：jq,react,同时在nodemodule
      // 里面，但是在下打包jq的时候他并不会直接打包完成，而是等react 打包后直接一起放进同一个文件中
      cacheGroups: {
        vendors: {
        	// 匹配的文件类型
          test: /[\\/]node_modules[\\/]/,
          // 权重，如果满足 在node_modules ，同时又满足其他条件，如果priority -10 大于-20所以会属于node_mo 下面的
          priority: -10
        },
        default: {
        	// 最少被引入的次数
          minChunks: 2,
          // 权重
          priority: -20,
          // 意味当我们在其他文件引入了A文件，我们在另为一个里面又引入A文件，这个我们不会对A重新打包分割，而是复用
          reuseExistingChunk: true
        }
      }
    }
	},
	output:{
		// 线上环境当我门把打包后的文件放进 远程的cdn 时要在前面加url
		// publicPath:"https:/kun.liu"
		publicPath:"./",
		filename: 'static/js/[name].js',
    	chunkFilename: 'static/js/[name].chunk.js',
		path:path.resolve(__dirname,"dist")
	},
		// plugins 是一个数组，主要功能是让 webpack 在特定的时期作特定的事情,所有的配置都在new实例的形参数里
	plugins:[new htmlWebpackPlugin({
		template:"./index.html",
		title:"lkapp"
	}),
	// new CleanWebpackPlugin(),
	 // new BundleAnalyzerPlugin()
	 new MiniCssExtractPlugin({
      // Options similar to the same options in webpackOptions.output
      // both options are optional
      filename: 'static/css/[name].css',
      chunkFilename: 'static/css/[name].chunks.css',
    }),
	]	,
}