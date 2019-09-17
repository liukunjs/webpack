import "./home.css"
export default function (){
	var html = document.getElementById("root")
 	var button  = document.createElement("button")
 	html.appendChild(button)
 	button.innerHTML = '点击'
 	button.onclick=function(){
 		var item = document.createElement("p")
 		item.innerHTML ="新增下"
 		html.appendChild(item)
 	}
}