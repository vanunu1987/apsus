import colorPicker from './color-picker-cmp.js'


export default {
    props: ['data', 'idx','id'],
    template: `
            <div class="row flex column justify-space-betweem align-center" :style="{backgroundColor: backColor}"
            @click="updateCmp(id)"
            >

                <label>
                   <span v-show="isSave"> url:</span>
                <input v-show="isSave" type="text" v-model="url" @keyup.enter="reportVal" ref="url" />
                    <img v-show="url" :src="data.url">
                </label>
                <label class="flex">
                <button class="fas fa-trash-alt" @click="deleteCmp(data.id)"></button>
                <button class="fas fa-edit" @click="updateCmp(data.id)"></button>
                <button class="fas fa-palette"    @click="toggleColorContiner"></button>
                <transition  name="bounce" >
  <!-- ... the buttons ... -->

                    <color-picker  class="color-picker" v-show="colorBtnOn" @returnColor="cangeColor"></color-picker>
              </transition>

                <!-- <input type="color" v-model="backColor" value="#f6b73c" @blur=reportVal> -->

                </label>
            </div>
        `,
    data() {
        return {
            txt: '',
            url: '',
            isSave: true,
            savedImg:'',
            backColor: this.data.backColor,
            colorBtnOn:false,
            position: null,
            trns:false
        }
    },
    methods: {

        reportVal() {
            console.log('innn');
            
            this.savedImg = this.url
            this.$emit('setInput', {
                txt: '',
                url: this.url,
                backColor: this.backColor,
                id:this.data.id
            })
            this.isSave = false;

        },
        deleteCmp(id) {
            this.$emit('deleteCmp', id)
            console.log(this.url);
            this.backColor= this.data.backColor  

        },
        updateCmp(id) {
            // this.$emit('updateCmp', idx)
            this.url= this.data.url
            this.backColor= this.data.backColor            
            this.isSave=true
            this.$nextTick(() => {
                this.$refs.url.focus();
            })

        },
        saveColor(){
            console.log('hii');
            
        },
        toggleColorContiner(){
            this.colorBtnOn= !this.colorBtnOn
         },
         cangeColor(color){
             this.backColor=color
             this.toggleColorContiner()
            //  this.reportVal()
         },
         muoseMove(ev){
             this.position=ev.clientX
             this.trns=true
            //  this.trns=false
         }
         

    

    },
    mounted(){
        this.$refs.url.focus();
        if (this.data.url) {
            this.url=this.data.url
            this.backColor= this.data.backColor
            this.isSave=false
        }
        
    },
    components:{
        colorPicker
    }
}
