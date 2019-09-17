import style from "./header.css"
// 如果不加 modules 的话，style 为null不能使用这个 import from 的方式
export default function (){
	var html = document.getElementById("root")
	var img = new Image()
	img.src = "/bear.jpg"
	img.classList.add(style.img)
 	html.appendChild(img)
}