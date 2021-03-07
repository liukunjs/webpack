const { create, update } = require("lodash")
const { createStore } = require("redux")
nextunitOfWork = null
let isFirstRender = false
/*  tag*/
let HostRoot = "HostRoot" // 表示rootfiber 类型--tag
let ClassComponent = "ClassComponent" // 表示类组件--tag
let HostComponent = "HostComponent" // 表示原生doM
let HostText = "HostText" // 表示文本
/*  tag*/
/* effectTag */
 let Placement = "Placement" // 表示节点的是新插入的
 let Deletion = "Deletion" // 表示删除
 let Update = "Update" // 更新属性
 let PlacementAndUpdate = "PlacementAndUpdate" // 节点换位置了，但props 或者store 发生变化
 let Nowork = "Nowork"
 let classComponentUpdater = {
     equenueSetate(){

     }
 }
/* effectTag */ 
class FiberNode {
    constructor(tag,key,pendingProps){
        this.tag = tag // 当前fiber 的类型， 
        this.key = key
        this.type = null // "div" |"h1"| component 原本class 组件，而不是字符串
        this.stateNode = null // 当前fiber 的实例，如果是div 是，document.creacte ,如果是component 是 new 组件的实力
        this.child = null // 表示当前fiber 的子fiber ，但是只指向第一个子fiber
        this.sibling = null // 兄弟节点
        this.return = null // 虽然其他子节点不被父节点指向，但是子节点都会指向父级
        this.index = 0 // 子节点的index
        this.memoizeState = null // 表示当前fiber 的state
        this.memozieProps = null // 表示当前fiber 的props
        this.pendingProps = pendingProps //表示当前节点要进行何种跟新
        this.effectTag = null  // 表示当前节点要进行何种跟新 
        this.firstEfect = null // 表示当前节点有的第一个更新的第一个子节点
        this.lastEffect = null // 表示当前节点有跟新的最后一个子节点
        this.nextEfffet = null // 表示要更新的下一个节点
        this.alternate = null // 用来连接current 和workInprogress的
        this.UpdateQuene = null // 一个链表，当前fiber 挂载的新的状态
    }
}
function createFiber(tag,key,pendingProps) {
    return new FiberNode(tag,key,pendingProps)
}
function createWorkInProgress (current ,penddingProps){
    // current.alternate 是用的上上次的更新fiber ，current 是当前的fiber
    let workInProgress = current.alternate
    // 由于创新新fiber的时候想复用以前的fiber ,由于初始渲染的时候 uninitiarFiber 没有alternate
    if(!workInProgress){
        workInProgress = createFiber(current.tag,current.key,penddingProps)
        workInProgress.type = current.type
        workInProgress.stateNode = current.stateNode 
        workInProgress.alternate  = current
        current.alternate = workInProgress
    }else{
         // 复用后清除副作用
        workInProgress.penddingProps = penddingProps
        workInProgress.effectTag = Nowork
    }

    /*
         
        init             current1         setSate                               setState2
                                    setState的que 只会挂载初始化的状态 init     
        tree ____alternate__tree    current.altnerate ==init,             current.altnerate ==current1,
                                    workInProgress = init                由于链表的关联关系，此时，init的
                                                                        update 为curret2 ，也就是当前的
                                                                        current ，所以，无法拿到updateque
                                    能拿到update ,此时当前的curent2       只能从当前的current 拿updateQuene


    */ 
   // 源码中不存在这个判断，他用了enqueueUpdate的方法，把新的upate 经行同步到current.update 上
     if(!!workInProgress&&!!workInProgress&&!workInProgress.UpdateQuene.lastEffect){
        workInProgress.UpdateQuene = current.UpdateQuene
     }
    workInProgress.child = current.child
    workInProgress.memoizeState = current.memoizeState
    workInProgress.memozieProps = current.memozieProps
    workInProgress.sibling =current.sibling
    workInProgress.index = current.index
    return workInProgress
}
function reconcileSingleElement(returnFiber,element) {
    let type = element.type
    let flag = null
    // symbol.for(a)===symbol.fo(a)
    if(element.$$typeof === Symbol.for("react.element")){
        if(typeof type === "function"){
            // 由于无法分辨是react 组件还是 funtion 组件，但是根据 reactComponet 有个isReactComponent 的原型链
            if(type.prototype&&type.prototype.isReactComponent){
                flag = ClassComponent
            }
        } else if(typeof type ==="string"){
            flag = HostComponent
        }
        let fiber = createFiber(flag,element.key,element.props)
        fiber.type =type
        fiber.return = returnFiber
        return fiber
    }
}
function reconcileChilrenArray(){
    
}
function reconcileChildFiber(workInProgress,nextChildred) {
      // 只有 rootfibe 有 alternate，因为初次渲染增加了inintailFiber
    if(typeof nextChildred==="object"&&nextChildred.$$typeof){
        // 说明是独生子为 react 元素
        return reconcileSingleElement(workInProgress,nextChildred)
    }
    if(nextChildred instanceof Array){
        return reconcileChilrenArray(workInProgress,nextChildred)
    }
    if(typeof nextChildred ==="string"||typeof nextChildred === "number"){
        return reconcileSingleTextNode(workInProgress,nextChildred)
    }
    return null
}
function reconcileChild(workInProgress,nextChildred) {
    if(isFirstRender&& workInProgress.alternate){
        workInProgress.child = reconcileChildFiber(workInProgress,nextChildred)
        workInProgress.child.effectTag = Placement
    }else{
        workInProgress.child = reconcileChildFiber(workInProgress,nextChildred)
    }
    return workInProgress.child
}
function updateHostRoot(workInProgress,nextChildred) {
    const nextChildred = workInProgress.memoizeState.element
   return  workInProgress.child = reconcileChild(workInProgress,nextChildred)
}
function UpdateHostComponent(workInProgress){
    let component = workInProgress.type
    let nextProps = workInProgress.penddingProps
    if(component.defaultProps){
        nextProps = Object.assign({},component.defaultProps,nextProps)
    }
    let shouldUdate = null
    let instance = workInProgress.stateNode
    if(!stateNode){
        // 初始渲染，或者新创建
        instance = new component(nextProps)
        workInProgress.memoizeState = instance.stateNode
        workInProgress.stateNode = instance
        instance._reactRootContainer = workInProgress
        instance.upater = classComponentUpdater
        let getDerivedStateFromProps = component.getDerivedStateFromProps
        if(classComponentUpdater){
            const preState = workInProgress.memoizeState
            const newState = getDerivedStateFromProps(nextProps,preState)
            if(!(newState===null||newState===undefined)){
                if(typeof newState==="object"&&!(newState instanceof Array)){
                    workInProgress.memoizeState = Object.assign({},nextProps,newState)
                }
            }
            instance.state = workInProgress.memoizeState
        }
        shouldUdate = true
    }else{

    }
    let nextChild = instance.render()
    return reconcileChild(workInProgress,nextChild)
}
function UpdateHostComponent(workInProgress){
    let nextProps = workInProgress.penddingProps
    let nextChildren = nextProps.children
    // 对于文本节点，如果有兄弟节点才创建，如果不是，不创建
    if(typeof nextChildren === "string"||typeof nextChildren === "number"){
        nextChildren = null
    }
    reconcileChild(workInProgress)
}
function beginWork(workInProgress) {
    let tag = workInProgress.tag
    let next = null
    if(tag===HostRoot){
        next = updateHostRoot(workInProgress)
    }
    if(tag ==HostComponent){
        next = UpdateHostComponent(workInProgress)
    }
    if(tag===HostText){
        next = null
    }
    return next
}
function completeUnitOfWork(workInProgress) {
    while(true){
        let returnFiber = workInProgress.return
        let siblingFiber = workInProgress.sibling

        if(siblingFiber){
            return siblingFiber
        }
        if(returnFiber){
            workInProgress = returnFiber
             // 此时回跳到上一层级，判断节点的兄弟节点，和父节点的父节点
            continue 
        }
        return null
    }
}
function performUnitOfWork(workInProgress) {
        // beginwork 创建子fiber
    let next = beginWork(workInProgress)
    // 当前没有子节点
    if(next ==null){
        // 当没有节点，找兄弟节点
        next = completeUnitOfWork(workInProgress)
    }
    return next
}
function workLoop(nextunitOfWork) {
    while(!!nextunitOfWork){
        nextunitOfWork = performUnitOfWork(nextunitOfWork)
    }
}
class ReactRoot {
    constructor(container){
        this._internalRoot = this._createRoot(container)
    }
    _createRoot(container){
        let uninitialFiber = this._createUninitialFiber(HostRoot,null,null)
        let root = {
            container:container,
            current:uninitialFiber,
            finishedWork:null
        }
        return root
    }
    _createUninitialFiber(HostRoot,tag,props){
        return createFiber(HostRoot,tag,props)
    }
    render(reactElement,cb){
        let root = this._internalRoot
        let workInProgress = createWorkInProgress(root,null)
        // 虽然是初次渲染，但是和setState 一个道理，源码是把reactElement 放在了crrent.memoizeState 上了
        workInProgress.memoizeState({
            element:reactElement
        })
    }
}
const ReactDOM = {
    render(reactElement,container,cb){
        isFirstRender = true
        let root = new ReactRoot(container)
        container._reactRootContainer = root
        root.render(reactElement,cb)
    }
}