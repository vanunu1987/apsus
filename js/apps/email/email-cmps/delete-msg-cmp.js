import { eventBus, EVENT_DELETE } from '../../../services/event-bus-services.js';

var interval = null;

export default {
    props:['deletedEmail'],
    template: `
    
    <transition name="slide-fade">
        <div class="read-delete">
            <p>Email was deleted</p>
            <button class="em-cancel-delete" @click.once="cancelDelete">
                Undo <i class="fa fa-undo" aria-hidden="true"></i>
            </button>
        </div>
    </transition>
  
    
    `,
    data() {
        return {
            // isMsg: false,
            // deletedEmail: null,
            // timeCount: 5
        }
    },
    methods: {
        cancelDelete() {
            this.$emit('restore', this.deletedEmail);
            // this.isMsg = false;
        }
    },
    created() {
        // eventBus.$on(EVENT_DELETE, (email) => {
        //     this.isMsg = true;
        //     this.deletedEmail = email;
        //     setTimeout(() => {
        //         this.isMsg = false;
        //     }, 5000)
        // })
    },
    computed: {
        // unreadCount(){

        // }
    },
    destroyed(){
        console.log('also destroyed');
    }
}
