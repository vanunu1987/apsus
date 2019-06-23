export default {
    template:`
    <section class="em-search-bar">
        <input type="search" v-model="searchVal" placeholder="Search Emails" autofocus>
    </section>
    `,
    data(){
        return {
            searchVal: null
        }
    },
    methods:{
        // searchEmail(){
        //     console.log(this.searchVal.toUpperCase());
        //     this.$emit('emitSearch',this.searchVal.toUpperCase())
        // }
    },
    watch:{
           searchVal: function(){
            console.log(this.searchVal.toUpperCase());
            this.$emit('emitSearch',this.searchVal.toUpperCase())
           }
    }
}