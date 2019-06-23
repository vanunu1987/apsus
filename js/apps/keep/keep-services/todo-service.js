
import utilService from '../../../services/util-services.js'
import keepService from '../../keep/keep-services/keep-services.js'

var gTodo=[]
var gNextId=0;
gTodo= (utilService.loadFromStorage('todos'))? (utilService.loadFromStorage('todos')): utilService.saveToStorage('todos',gTodo)


function createTodo(id){
    return {txt: '' ,url:'' ,backColor:"#fff47500",type:'todo',id:id}
}


function saveData(data,id){
    // gTodo[id].txt=data.txt
    // console.log('gtodo txt',gTodo[id].txt);
    
    // // obj.data=data
    // gTodo.splice(id,1,gTodo[id])

    console.log('sendig',data);
    keepService.pushTodo(data.id,data)

    utilService.saveToStorage('todos',gTodo)
}


function getTodos() {
    utilService.loadFromStorage('todos')
    return gTodo
}
function saveTdos(id) {
var obj=createTodo(id)
// console.log('obj',obj);
// console.log(gTodo);

//  gTodo.push(obj)
 keepService.pushNewTodo(id,obj)
utilService.saveToStorage('todos',obj)
}
function deleteTodo(idx) {
    gTodo.splice(idx, 1);
utilService.saveToStorage('todos',gTodo)

}





export default {
    getTodos,
    saveTdos,
    deleteTodo,
    saveData,
    createTodo
}

