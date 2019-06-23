import colorPicker from './color-picker-cmp.js'


export default {
    template: `
    <section class="input-bar">
    <button class="fas fa-font" @click.stop.prevent="selctedCmp('textBox')" :class="{gold: isGold}"></button>
    <button class="fas fa-image" @click.stop.prevent="selctedCmp('imgBox')" :class="{gold: isGold}" ></button>
    <button class="fas fa-video" @click.stop.prevent="selctedCmp('videoBox')" :class="{gold: isGold}" ></button>
    <button class="fas fa-list-alt" @click.stop.prevent="selctedCmp('todos')" :class="{gold: isGold}" ></button>
    <button v-show="isGold" class="fas fa-palette" @click.stop.prevent="toggleColorBtn" :class="{gold: isGold}" ></button>
 
    <transition  name="bounce" >
    <color-picker  class="color-picker bar" v-show="colorBtnOn" @returnColor="cangeColor"></color-picker>
    </transition>
    <button class="fas fa-filter" @click="toggleClassGold" ></button>
   
    </section>
`,
    data() {
        return {
            isGold: false,
            colorBtnOn: false
        }
    },
    methods: {
        selctedCmp(input) {
            console.log(this.isGold);

            if (!this.isGold) {
                this.$emit('passCmp', input)
            } else {
                this.$emit('filterMod', input)
            }
        },
        toggleClassGold() {
            this.isGold = !this.isGold
            if (!this.isGold) this.$emit('renderAll')
        },
        toggleColorBtn() {
            this.colorBtnOn = !this.colorBtnOn
        },
        cangeColor(color){
            this.toggleColorBtn()
            this.$emit('filterByColor',color)
        }

        
    },
    components: {
        colorPicker
    }
}