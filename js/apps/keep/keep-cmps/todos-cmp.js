import todoService from '../keep-services/todo-service.js';
import todo from '../keep-cmps/todo-cmp.js';
import keepServices from '../keep-services/keep-services.js';
import colorPicker from './color-picker-cmp.js'


export default {
    props: ['data', 'idx','id'],
    template: `

            <section class="row flex column justify-space-betweem align-center" :style="{backgroundColor: backColor}"> 
                <h2>todos</h2>
                <button class="fas fa-plus-circle" @click="setTodo(data.id)" ></button>

                <ul>
                    <li
                    v-for="(currTodo, idx) in todos"
                    >
                    <component  
                        :is="currTodo.type" 
                        :data="currTodo" 
                        :key="currTodo.id"
                        :id="data.id" 
                        :idx="idx"
                        @setInput="setData($event, idx)"
                        @deleteTodo="delteTodo"
                        @deleteTodoList="deleteTodoList"
                        >
                    </component>

                    </li>
                </ul>
                <label class="flex">
                <button class="fas fa-trash-alt" @click="delteTodo(data.id)"></button>
                <button class="fas fa-palette" @click="toggleColorContiner"></button>
                <!-- <input type="color" v-model="backColor" value="#f6b73c" @blur=reportVal> -->
                <color-picker  class="color-picker" v-show="colorBtnOn" @returnColor="cangeColor"></color-picker>

                </label>

            </section>
        `,
    data() {
        return {
            todos:[],
            isRead: false,
            backColor: "#e8eaed",
            gNextId:0,
            colorBtnOn: false

        }
    },
    methods: {
        
        reportVal() {
            // this.savedTxt = this.txt
            this.$emit('setInput', {
                type:'todo',
                data:{
                id:this.data.id,
                todos: this.todos,
                isRead: this.isRead,
                backColor: this.backColor,
                
            },
            backColor: this.backColor,
            })
            this.isSave = false;
        },

        setData(data,idx) {
            // var newDta={todos:this.todos,isRead: this.isRead}
            console.log('data',data);
            keepServices.pushTodo(data.id,data,idx)
            // this.todos= keepServices.getTodoList(this.data.id)
            console.log('from TODOS',this.todos);
            
        },
        setTodo(id){
            // console.log(idx;
            todoService.saveTdos(id)
           this.todos= keepServices.getTodoList(this.data.id)
        //    this.$emit('updateCmp')
           console.log('hapend',this.todos);
           
        },
        delteTodo(id){
            keepServices.deleteTodo(id)
            this.todos= keepServices.getTodoList(this.data.id)
            
        },
        deleteTodoList(idx){
            keepServices.deleteTodoList(idx,this.data.id)
        },
        cangeColor(color){
            this.backColor=color
            this.toggleColorContiner()
            this.reportVal()
        },
        toggleColorContiner(){
            this.colorBtnOn= !this.colorBtnOn
         },


    },
    created() {
        this.todos= keepServices.getTodoList(this.data.id)

     },
    mounted(){

    },
    components: {
        todo,
        colorPicker
    }
}