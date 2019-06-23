export default {
    template:`
    <select class="em-email-sort" v-model="sortBy">
        <option value="sentAt">Recieved</option>
        <option value="subject">Title</option>
    </select>
<!-- 
        <input type="radio" value="sentAt" v-model="sortBy">
        <input type="radio" value="subject" v-model="sortBy"> -->
    `,
    data(){
        return {
            sortBy: 'sentAt'
        }
    },
    methods:{
    },
    watch:{
        sortBy: function(){
            console.log(this.sortBy)
            this.$emit('emitSort',this.sortBy)
        }         
    }
}