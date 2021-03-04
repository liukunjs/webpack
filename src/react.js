import React,{ Component } from "react";
import ReactDom from "react-dom"
import{Route,BrowserRouter} from "react-router-dom";
import Hmr from "./hmr"
import Action from './component';
import axios from 'axios';

 class ReactHome1 extends Component{
 	
 	render(){
 		return <div>	
 			1111
 		</div>
 	}
 } 
 class ReactHome2 extends Component{
	 constructor(props){
		 super(props)
		 this.a ="lk"
	 }
 	render(){
		 
 		return <div>	
 			3333lk{this.a}
 		</div>
 	}
 }

//  console.log(ReactHome1,ReactHome2,55555)
 class ReactHome extends Component{
 	componentDidMount(){
		axios.get("/api/a").then((res)=>{
 			console.log(res,"ressss")
 		})
	const temp = []
	let i =0
		function getlist(t){
			temp.push(t)
			console.log(temp[0],"temp[0]")
			console.log(t-3000,"t-300")
			console.log(temp[0]<t-3000,"bjiao")
			while(temp[0]<t-3000){
					i++
				temp.shift()
				if(i>100){
					console.log("sixl")
					return;
				}
			}
			console.log(temp)
		}
		[null,1,100,3000,3001,4000].forEach(item=>{
			getlist(item)
		})
	 }
 	render(){
 		return <div>	
 			<BrowserRouter>
 			   <Route path="/aaa" exact component={ ReactHome1 } />
 			   <Route path="/abc" component={ ReactHome2 } />
 			   <Route path="/hmr" component={  Hmr} />
 			</BrowserRouter>
 		</div>
 	}
 } 
 (function(modules) { 
	function webpackJsonpCallback(data) {
		console.log(data,"data")
		var chunkIds = data[0];
		var moreModules = data[1];
		var moduleId, chunkId, i = 0, resolves = [];
		for(;i < chunkIds.length; i++) {
			chunkId = chunkIds[i];
			if(Object.prototype.hasOwnProperty.call(installedChunks, chunkId) && installedChunks[chunkId]) {
				resolves.push(installedChunks[chunkId][0]);
			}
			installedChunks[chunkId] = 0;
		}
		for(moduleId in moreModules) {
			if(Object.prototype.hasOwnProperty.call(moreModules, moduleId)) {
				modules[moduleId] = moreModules[moduleId];
			}
		}
		if(parentJsonpFunction) parentJsonpFunction(data);

		while(resolves.length) {
			resolves.shift()();
		}

	};
	var installedModules = {};
	var installedChunks = {
		2: 0
	};
	function jsonpScriptSrc(chunkId) {
		return __webpack_require__.p + "static/js/" + ({"0":"aCom","1":"bCom"}[chunkId]||chunkId) + ".chunk.js"
	}
	function __webpack_require__(moduleId) {
		if(installedModules[moduleId]) {
			return installedModules[moduleId].exports;
		}
		var module = installedModules[moduleId] = {
			i: moduleId,
			l: false,
			exports: {}
		};
		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
		module.l = true;
		return module.exports;
	}

	__webpack_require__.e = function requireEnsure(chunkId) {
		var promises = [];
		var installedChunkData = installedChunks[chunkId];
		if(installedChunkData !== 0) { 

			if(installedChunkData) {
				promises.push(installedChunkData[2]);
			} else {
				var promise = new Promise(function(resolve, reject) {
					installedChunkData = installedChunks[chunkId] = [resolve, reject];
				});
				promises.push(installedChunkData[2] = promise);
				var script = document.createElement('script');
				var onScriptComplete;

				script.charset = 'utf-8';
				script.timeout = 120;
				if (__webpack_require__.nc) {
					script.setAttribute("nonce", __webpack_require__.nc);
				}
				script.src = jsonpScriptSrc(chunkId);
				var error = new Error();
				onScriptComplete = function (event) {
					script.onerror = script.onload = null;
					clearTimeout(timeout);
					var chunk = installedChunks[chunkId];
					if(chunk !== 0) {
						if(chunk) {
							var errorType = event && (event.type === 'load' ? 'missing' : event.type);
							var realSrc = event && event.target && event.target.src;
							error.message = 'Loading chunk ' + chunkId + ' failed.\n(' + errorType + ': ' + realSrc + ')';
							error.name = 'ChunkLoadError';
							error.type = errorType;
							error.request = realSrc;
							chunk[1](error);
						}
						installedChunks[chunkId] = undefined;
					}
				};
				var timeout = setTimeout(function(){
					onScriptComplete({ type: 'timeout', target: script });
				}, 120000);
				script.onerror = script.onload = onScriptComplete;
				document.head.appendChild(script);
			}
		}
		return Promise.all(promises);
	};
	__webpack_require__.m = modules;

	__webpack_require__.c = installedModules;
	__webpack_require__.d = function(exports, name, getter) {
		if(!__webpack_require__.o(exports, name)) {
			Object.defineProperty(exports, name, { enumerable: true, get: getter });
		}
	};
	__webpack_require__.r = function(exports) {
		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
		}
		Object.defineProperty(exports, '__esModule', { value: true });
	};
	__webpack_require__.t = function(value, mode) {
		if(mode & 1) value = __webpack_require__(value);
		if(mode & 8) return value;
		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
		var ns = Object.create(null);
		__webpack_require__.r(ns);
		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
		return ns;
	};
	__webpack_require__.n = function(module) {
		var getter = module && module.__esModule ?
			function getDefault() { return module['default']; } :
			function getModuleExports() { return module; };
		__webpack_require__.d(getter, 'a', getter);
		return getter;
	};
	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
	__webpack_require__.p = "./";
	__webpack_require__.oe = function(err) { console.error(err); throw err; };

	var jsonpArray = window["webpackJsonp"] = window["webpackJsonp"] || [];
	var oldJsonpFunction = jsonpArray.push.bind(jsonpArray);
	jsonpArray.push = webpackJsonpCallback;
	jsonpArray = jsonpArray.slice();
	for(var i = 0; i < jsonpArray.length; i++) webpackJsonpCallback(jsonpArray[i]);
	var parentJsonpFunction = oldJsonpFunction;


	return __webpack_require__(__webpack_require__.s = 0);
})
([
(function(module, exports, __webpack_require__) {
const a = __webpack_require__.e(/* import() | aCom */ 0).then(__webpack_require__.t.bind(null, 1, 7)).then(item => {
  console.log(11123, item);
});
 })
]);
(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[0],[
/* 0 */,
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

console.log("aaaaaaaaa");
const a = __webpack_require__.e(/* import() | bCom */ 1).then(__webpack_require__.t.bind(null, 2, 7)).then(item => {
console.log(11123, item);
});

/***/ })
]]);
(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[1],{

/***/ 2:
/***/ (function(module, exports) {



/***/ })

}]);
 export default function (){
 	ReactDom.render(<ReactHome/>,document.getElementById("root"))
 }