// import "@babel/polyfill"
// 使用 @babel/polyfill 会将所有的es6转为es2015但是会导致打包文件过大，一些我们并不使用的es6语法也会被编译出来，可以在webpack中设置
// 这样并且会全局污染环境，所以当我们在编写库或者ui组件的时候这样的方法很不合适，
// 编写ui库的时候方法：https://babeljs.io/docs/en/babel-plugin-transform-runtime
// 但是如果在 presets里面写了 useBuiltIns ："usage" 的话就不用这样引入了
// import header from './header/header'
// import home from './home/home'
// import React from  "react"
import ReactDom from "react-dom"
import ReactHome from "./react.js"
ReactHome();
window.addEventListener("load",function(){
    if("serviceWorker" in window.navigator){
        navigator.serviceWorker.register("sw.js",{scope:"/"}).then((registion)=>{
        })
    }
})
// import math  from "lk-ldn-math"
// tree sharking 概念：摇动树 ，应用场景：esmodule，在使用时只引入了headerTop方法，但是当我们在打包时侯，会把headerTop里面所有的文件
// 全部引入进去，但在webpack mode 为 productions 的时 devtool： 设置为cheap-moudle-souce-map (不要加eval),并且在package.json中设置
// 默认使用这‘sideEffects:false’,tree sharking ，把不需要的文件给去除掉，
// 如果像 import "a.css"这种会拒绝引入文件，因为在没有特定引入某个文件，tree shacking 会默认全部引入，全部过滤，可以通过在package.json中设置
// sideEffect:["*.css"]
// 异步的不需要借助任何插件就可以做到打包，并魔法注释，同步引入必须借助splitChunk
import(/*webpackChunkName:"ldn"*/"./home/home").then((data)=>{
})
import { add } from "./headerTop.js"
add();
// 只有通过这个引入的方式才能进入打包的模式，如果只是在js中创建img 的形式,不能进行打包
// var img = require("./img/bear.jpg")
// 这个img 是我在webpack 打包配置后的名字，所以会是bear.jpg
// 虽然我在当前位置没有引入 css 样式，但是发现此时的这个错误的 img 标签已经有了 150宽了
// 此时出现了css 样式的污染 在css-loader中配置
 function getComponent() {
   return import(/* webpackChunkName: "lk" */ 'lodash').then(({ default: _ }) => {
     const element = document.createElement('div');

     element.innerHTML = _.join(['Hello', 'webpack',"lk"], ' ');

     return element;

   }).catch(error => 'An error occurred while loading the component');
 } 
 getComponent().then(component => {   document.body.appendChild(component);
 })
// 即使不配置splitChunks。webpack已经帮我们分割打包好了，但是html-wbpack-plugin不会为我们创建引入的script 正确名称的html 

// import _ from "lodash"
//
document.addEventListener("click",function(){
	// 当我不想在首屏加载过多东西时，在使用时加载，又怕加载太慢，这时使用预加载webpackPrefetch,在首屏主要的js文件加载后的
	// 空闲时加去加载这个 header.js文件，如果是webpackPreload ,是和主文件一起加载的
	import(/* webpackPrefetch: true */  /* webpackChunkName: "preload" */"./header/header").then(()=>{
	})
})




const a = ()=>{
	var promist = new Promise()

}
let arr = []
	arr.map(()=>{})
var html = document.getElementById("root")
	var img = new Image()
	img.src = "../dist/"+img
	img.classList.add('img')
 	html.appendChild(img)

// header()
// home()

// import("react").then(react=>{
// 	class App extends React.Component {
// 	render(){
// 		return(
// 			<div>
// 				wihwewew---"lk"
// 			</div>
// 			)
// 	}
// }
// ReactDom.render(<App />,document.getElementById("root"))
// })










