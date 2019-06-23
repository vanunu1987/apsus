
import colorPicker from './color-picker-cmp.js'

export default {
    props: ['data', 'idx','id'],
    template: `
            <div class="row flex column justify-space-betweem align-center" :style="{backgroundColor: backColor}"
            @click="updateCmp(id)"
            >
                <label>
                   <span v-show="isSave"> url:</span>
                <input v-if="isSave" type="text" v-model="url" @keyup.enter="reportVal" ref="url" />
                <video width="320" height="240" controls>
                 <source :src="data.url" type="video/mp4">
                 </video>
                </label>
                <label class="flex">
                <button class="fas fa-trash-alt" @click="deleteCmp(data.id)"></button>
                <button class="fas fa-edit" @click="updateCmp(data.id)"></button>
                <button class="fas fa-palette" @click="toggleColorContiner"></button>
                <!-- <input type="color" v-model="backColor" value="#f6b73c" @blur=reportVal> -->
                <transition  name="bounce" >
                <color-picker class="color-picker" v-show="colorBtnOn" @returnColor="cangeColor"></color-picker>
                </transition>
                </label>
            </div>
        `,
    data() {
        return {
            txt: '',
            url: '',
            isSave: true,
            savedImg:'',
            backColor: "#e8eaed",
            colorBtnOn:false
        }
    },
    methods: {
        reportVal() {
            this.savedImg = this.url
            this.$emit('setInput', {
                txt: '',
                url: this.url,
                backColor: this.backColor,
                id: this.data.id
            })
            this.isSave = false;

        },
        deleteCmp(id) {
            this.$emit('deleteCmp', id)

        },
        updateCmp(id) {
            // this.$emit('updateCmp', idx)
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
             this.reportVal()
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