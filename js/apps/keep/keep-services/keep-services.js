import utilService from '../../../services/util-services.js'

// var gCmps = [
//     {type: "textBox",data: {txt: "hi wats up", url: "", backColor: "#f28b82", id: 2}},
//     {type: "imgBox", data: {txt: "", url: "https://www.w3schools.com/html/pic_trulli.jpg", backColor: "#eba3ff", id: 2}},
//     {type: "videoBox", data: {txt: "", url: "https://www.w3schools.com/tags/movie.mp4", backColor: "#ffccea", id: 3}},
//     {type: "todos", data: {txt: "", url: "", backColor: "#ebc9a3",id:4,todos:[{txt: "לסיים את הספרינט", url: "", backColor: "#1e1e1e00", id: 4, type: "todo"}
//     ,{txt: "להרגיע את ישי", url: "", backColor: "#1e1e1e00", id: 4, type: "todo"}]}}
    
// ]
// utilService.saveToStorage('cmps',gCmps)
var gCmps;
var gNextId= (utilService.loadFromStorage('gNextId'))? utilService.loadFromStorage('gNextId') : utilService.saveToStorage('gNextId',5)
gNextId=utilService.loadFromStorage('gNextId')
// utilService.saveToStorage('cmps',gCmps)
// gCmps= (utilService.loadFromStorage('cmps'))? (utilService.loadFromStorage('cmps')): utilService.saveToStorage('cmps',gCmps)

    if (utilService.loadFromStorage('cmps')) gCmps=(utilService.loadFromStorage('cmps'))
    else {
     gCmps = [
            {type: "textBox",data: {txt: "hi wats up", url: "", backColor: "#f28b82", id: 2}},
            {type: "imgBox", data: {txt: "", url: "https://www.w3schools.com/html/pic_trulli.jpg", backColor: "#eba3ff", id: 2}},
            {type: "videoBox", data: {txt: "", url: "https://www.w3schools.com/tags/movie.mp4", backColor: "#ffccea", id: 3}},
            {type: "todos", data: {txt: "", url: "", backColor: "#ebc9a3",id:4,todos:[{txt: "לסיים את הספרינט", url: "", backColor: "#1e1e1e00", id: 4, type: "todo"}
            ,{txt: "להרגיע את ישי", url: "", backColor: "#1e1e1e00", id: 4, type: "todo"}]}}
            
        ] 
    }

function saveData(data,id){
    console.log('reciving',data);
    var idx= gCmps.findIndex((cmp)=>cmp.data.id===data.id)
    var obj=(gCmps.filter((cmp)=>cmp.data.id===data.id))

    obj[0].data=data
    console.log(idx);
    console.log(obj[0]);
    
    gCmps.splice(idx,1,obj[0])
    
    utilService.saveToStorage('cmps',gCmps)
}

function getCmpsType(){
return gCmpsType
}

function getCmps() {
    utilService.loadFromStorage('cmps')
    return gCmps
}
function saveCmps(type) {
    // console.log(gCmps);
    
var obj=createCmp(type)
console.log(gNextId);
utilService.saveToStorage('gNextId',gNextId)
 gCmps.push(obj)
utilService.saveToStorage('cmps',gCmps)
}
function deleteCmps(id) {
    var idx= gCmps.findIndex((cmp)=>cmp.data.id===id) 
    gCmps.splice(idx, 1);
utilService.saveToStorage('cmps',gCmps)

}

function pushTodo(id,data,listIdx){
    var idx= gCmps.findIndex((cmp)=>cmp.data.id===id)

    gCmps[idx].data.todos.splice(listIdx,1,data)
    // console.log('from servis:',gCmps);
    utilService.saveToStorage('cmps',gCmps)
}
function pushNewTodo(id,data,listIdx){
    var idx= gCmps.findIndex((cmp)=>cmp.data.id===id)

    gCmps[idx].data.todos.push(data)
    // console.log('from servis:',gCmps);
    utilService.saveToStorage('cmps',gCmps)
}
function getTodoList(id){
    // var idx= gCmps.findIndex((cmp)=>cmp.data.id===id)
    console.log('gcmp',gCmps);
    console.log('id',id);
    
    var cmp=(gCmps.find((cmp)=>cmp.data.id===id))
console.log('cmp',cmp);

    console.log('from get',cmp.data.todos);
   return cmp.data.todos
   

}
function deleteTodo(id){
    console.log('id',id);
    
    var idx= gCmps.findIndex((cmp)=>cmp.data.id===id)
    console.log('idx',idx);
    idx++
    gCmps.splice(idx,1)
    console.log('gcmppp',gCmps);

    utilService.saveToStorage('cmps',gCmps)

} 
function deleteTodoList(idxList,id){
    var idx= gCmps.findIndex((cmp)=>cmp.data.id===id)

    gCmps[idx].data.todos.splice(idxList,1)
    utilService.saveToStorage('cmps',gCmps)
}


export default {
    getCmps,
    saveCmps,
    getCmpsType,
    deleteCmps,
    saveData,
    pushTodo,
    getTodoList,
    pushNewTodo,
    deleteTodo,
    deleteTodoList
}


function createCmp(type){

    console.log(gNextId);
    
        return {type: type, data: {txt: '' ,url:'' ,backColor:"#e8eaed", todos:[],isRead:false, id:++gNextId} }
    
}

