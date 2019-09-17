import React,{ Component } from "react";
import ReactDom from "react-dom"
import{Route,BrowserRouter} from "react-router-dom";
import Action from './component'
 class ReactHome1 extends Component{
 	
 	render(){
 		return <div>	
 			1111
 		</div>
 	}
 } 
 class ReactHome2 extends Component{
 	render(){
 		return <div>	
 			3333
 		</div>
 	}
 }

//  console.log(ReactHome1,ReactHome2,55555)
 class ReactHome extends Component{
 	componentDidMount(){
 		fetch("/api/a.json").then((res)=>{
 			console.log(res,"ressss")
 		})
	 }
 	render(){
 		return <div>	
 			<BrowserRouter>
 			   <Route path="/aaa" exact component={ ReactHome1 } />
 			   <Route path="/abc" component={ ReactHome2 } />
 			</BrowserRouter>
 		</div>
 	}
 } 
 export default function (){
 	ReactDom.render(<ReactHome/>,document.getElementById("root1"))
 }