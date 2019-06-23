
import colorPicker from './color-picker-cmp.js'

export default {

    props: ['data', 'idx','id'],
    template: `
        <div  @click="updateCmp(id)" class="row flex column justify-space-betweem align-center trans" :style="{backgroundColor: backColor}">
            <label class="flex column">
               <span v-show="!isSave">{{data.txt}}</span>
                <textarea ref="textArea"  v-show="isSave" rows="10" cols="23" v-model="txt" @blur="reportVal"
                @keyup.enter="reportVal"
                ></textarea>
            </label>
            <label class="flex">
            <button class="fas fa-trash-alt" @click.stop.prevent="deleteCmp(id)"></button>
            <button class="fas fa-edit" @click.stop.prevent="updateCmp(id)"></button>
            <button class="fas fa-palette" @click.stop.prevent="toggleColorContiner"></button>
            <!-- <input type="color" v-model="backColor" value="#f6b73c" @blur=reportVal> -->
            <transition  name="bounce" >
            <color-picker  class="color-picker" v-show="colorBtnOn" @returnColor="cangeColor"></color-picker>
            </transition>
            </label>


        </div>
    `,
    data() {
        return {
            txt: '',
            isSave: true,
            savedTxt: '',
            backColor: "#e8eaed",
            colorBtnOn: false
        }
    },
    methods: {
        reportVal() {
            this.savedTxt = this.txt
            this.$emit('setInput', {
                txt: this.savedTxt,
                url: '',
                backColor: this.backColor,
                id: this.data.id
            })
            this.isSave = false;
        },
        deleteCmp(id) {
            this.$emit('deleteCmp', id)
            console.log(id);
            
        },
        updateCmp(id) {
            // this.$emit('updateCmp', idx)
            this.txt=this.data.txt
            this.backColor=this.data.backColor
            this.isSave = true
            this.$nextTick(() => {
                this.$refs.textArea.focus();
            })
        }, 
        toggleColorContiner(){
           this.colorBtnOn= !this.colorBtnOn
        },
        cangeColor(color){
            this.backColor=color
            this.toggleColorContiner()
            this.reportVal()
        }

    },
    mounted() {
      
        if (this.data.txt) {
            this.txt = this.data.txt
            this.backColor= this.data.backColor
            this.isSave = false
        }else{
            this.$refs.textArea.focus();
        }

    }
    ,created(){

    },
    components:{
        colorPicker
    }
}