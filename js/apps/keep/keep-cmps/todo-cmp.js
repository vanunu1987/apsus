export default {

    props: ['data', 'id','idx'],
    template: `
        <div class="todo flex justify-space-betweem align-center" :style="{backgroundColor: backColor}">
            <label class="flex column">
               <span v-show="!isSave">{{data.txt}}</span>
                <input ref="textArea"  v-show="isSave"  v-model="txt" @keyup.enter="reportVal"/>
            </label>
            <label class="flex">
            <button v-show="isSave" class="far fa-save" @click="reportVal"></button>
            <button v-show="!isSave" class="fas fa-edit" @click="updateTodo(idx)" ></button>
            <button class="fas fa-trash-alt" @click="deleteTodo"></button>
            <input class="colorpick fas fa-palette" type="color" v-model="backColor" value="#f6b73c" @click="reportVal">
            </label>


        </div>
    `,
    data() {
        return {
            txt: '',
            isSave: true,
            savedTxt: '',
            backColor: "#1e1e1e00"
        }
    },
    methods: {
        reportVal() {
            console.log('from todo',this.data);
            
            this.isSave = false;
            this.savedTxt = this.txt
            this.$emit('setInput', {
                txt: this.savedTxt,
                url: '',
                backColor: this.backColor,
                id:this.id,
                type: 'todo'
            })
        },
        deleteTodo() {
            this.$emit('deleteTodoList', this.idx)
            console.log('TODOOOOO',this.idx);
            
        },
        updateTodo(idx) {
            // this.$emit('updateCmp', idx)
            this.isSave = true
            this.$nextTick(() => {
                this.$refs.textArea.focus();
            })
            // reportVal()
        }

    },
    mounted() {
        this.$refs.textArea.focus();
        if (this.data.txt) {
            this.txt = this.data.txt
            this.backColor= this.data.backColor
            this.isSave = false
        }

    },
    created(){
        console.log('DATA',this.data);
        
    }
}