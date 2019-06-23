
import inputBar from './keep-cmps/input-bar-cmp.js';
import videoBox from './keep-cmps/video-box-cmp.js';
import imgBox from './keep-cmps/img-box-cmp.js';
import textBox from './keep-cmps/text-box-cmp.js';
import keepService from './keep-services/keep-services.js';
import todos from './keep-cmps/todos-cmp.js';
import colorPicker from './keep-cmps/color-picker-cmp.js';



export default{
    template:`
        <section class="keep-app flex column align-center">
            <section class="keep-head">
            <section class="logo-keep flex align-center">
        <span class="far fa-lightbulb"> </span><h1>MissKeep</h1>
            </section>
            </section>
            <input-bar
            @passCmp="setCmp"
            @filterMod="filter"
            @renderAll="renderAll"
            @filterByColor="filterByColor"
            >
        
            </input-bar>
            
            <!-- <router-view></router-view> -->
            
            <ul class="note-list flex justify-center" >
            
            <li class="component"  v-for="(currCmp, idx) in cmps">
            <component  
                        :is="currCmp.type" 
                        :data="currCmp.data" 
                        :key="idx"
                        :id="currCmp.data.id"
                        :idx="idx" 
                        @setInput="setData($event, idx)"
                        @deleteCmp="delteCmp"
                        @updateCmp="updateCmp"
                        >

            </component>
            </li>
          

        </ul>
        </section>
    `,
       data() {
        return {
            selectedCmp: null,
            isOk: false,
            cmps: [],
            
            answers: []
        }
    },
    methods: {
        setInput(ans, inputIdx) {
            this.answers.splice(inputIdx, 1, ans);
            this.cmps= keepService.getCmps()
            // console.log(cmps);
            
        },
        setData(data,id) {
            keepService.saveData(data,id)
            this.cmps= keepService.getCmps()
            // console.log(cmps);

        },
        setCmp(type){
           keepService.saveCmps(type)
           this.cmps= keepService.getCmps()
        //    console.log(cmps);

        },
        delteCmp(id){
            keepService.deleteCmps(id)
            this.cmps= keepService.getCmps()

            
        },
        updateCmp(){
            this.cmps=keepService.getCmps()
            // console.log(this.cmps);
            

        },
        filter(type){
            console.log('typeee',type);
            
             this.cmps=keepService.getCmps()
          this.cmps= this.cmps.filter((cmp)=>cmp.type===type)
          console.log(this.cmps);
          
        },
        filterByColor(color){
            this.cmps=keepService.getCmps()
            this.cmps= this.cmps.filter((cmp)=>cmp.data.backColor===color)
  
        },
        renderAll(){
            this.cmps=keepService.getCmps()
   
        },
        
        
    },
    created() {
       this.cmps= keepService.getCmps()
    },
    computed: {

    },
    watch: {

    },
    components: {
        inputBar,
        textBox,
        videoBox,
        imgBox,
        keepService,
        todos,
        colorPicker
    }
}