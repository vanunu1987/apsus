export default {
    template:`
    <!-- <select v-model="filterBy">
        <option value="all">All</option>
        <option :value="true" >Read</option>
        <option :value="false">Unread</option>
    </select> -->
    <section class="em-read-filter">
        <input class="fa fa-globe" type="radio" value="all" v-model="filterBy" checked>
        <input class="fa fa-envelope-open" type="radio" :value="true" v-model="filterBy">
        <input class="fa fa-envelope"  type="radio" :value="false" v-model="filterBy">
    </section>
    `,
    data(){
        return {
            filterBy: 'all',
            test: 'all'
        }
    },
    methods:{
    },
    watch:{
        filterBy: function(){
            console.log(this.filterBy)
            this.$emit('emitFilter',this.filterBy)
        },  
    }
}