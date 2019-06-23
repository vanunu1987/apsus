import emailService from '../email-services/email-services.js';
import { eventBus, EVENT_DELETE , EVENT_REPLAY,EVENT_READ  } from '../../../services/event-bus-services.js'
// import { eventBus, EVENT_REPLAY } from '../../../services/event-bus-services.js'

export default {
    template: `
        <section v-if="email" class="read-email">
         <h1>{{email.subject}}</h1>
         <h3>{{email.from}}</h3>
         <p>{{recieveAt}}</p>
         <button class="fas fa-arrow-left em-back-btn" @click="goBack"></button>
         <section class="em-details-actions">
             <button class="fa fa-trash em-delete-btn" @click="deleteEmail"></button>
             <button class="fa fa-reply em-replay-btn" @click="replayEmail"></button>
        </section>
         <div>{{email.body}}</div>
        </section>
    `,
    data() {
        return {
            email: null,
            DeletedEmail:null
        }

    },
    components: {

    },
    methods: {
        updateCurrEmail() {
            const emailId = this.$route.params.emailId;
            emailService.getEmailById(emailId)
                .then((email) => {
                    this.email = email;
                    console.log(this.email);
                })

        },
        deleteEmail(){
            // this.DeletedEmail = this.email;
            let idx = emailService.deleteEmail(this.email.id);
            eventBus.$emit(EVENT_DELETE, { email :this.email,idx });
            // this.$emit('delete',this.email.id)
            this.$router.go(-1)
        },
        replayEmail(){
            new Promise (res => {
                var push = this.$router.push('compose-email');
                console.log('push is',push)
                res(push)
            })
            .then(() => {
                eventBus.$emit(EVENT_REPLAY, this.email)
            })
            // },1000)
        },
        goBack(){
            this.$router.go(-1)
        }
    },
    computed: {
        recieveAt() {
            return new Date(this.email.sentAt).toLocaleString()
            // utilServices.getDate(new Date(this.email.sentAt))

        }
    },
    created() {
        // emailService.getEmails(),
        this.updateCurrEmail()
    },
    mounted() {
        
        // setTimeout(() => {
        //     if (this.email.isRead) return
        //     // this.email.isRead = !this.email.isRead;
        //     emailService.readEmail(this.email.id);
        //     this.$emit('read')
        //     // eventBus.$emit(EVENT_UNREAD, { emailId :this.email.id })
        // }, 2000)
    },
    watch: {
        email: function(){
            if (this.email.isRead) return
            emailService.readEmail(this.email.id);
            // this.$emit('read')
            eventBus.$emit(EVENT_READ, this.email);
            console.log(this.email);
            
        }
    },
    destroyed(){
        console.log('destroyed');
        
    }
}