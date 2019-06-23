import utilServices from '../../../services/util-services.js'

export default {
    props: ['email'],
    template: ` 
            <section class="email-preview">
                <div class="em-sender-details" :class="{ unread: !email.isRead }">
                    {{email.from}}
                </div>
                &nbsp
                <div class="em-list-email-body"><span class="email-subject"
                 :class="{ unread: !email.isRead }">
                    {{email.subject}}</span>&nbsp-&nbsp{{emailBody}}
                </div>
                <div class="em-time-details" :class="{ unread: !email.isRead }">
                    {{recieveAt}}
                </div>
                <div class="email-actions">
                    <button class="em-list-read-btn" @click.stop.prevent="markRead"><i
                     :class="envalopeClass"></i></button>
                    <button class="em-list-delete-btn" @click.stop.prevent="deleteEmail">
                    <i class="fa fa-trash"></i>
                    </button>
                </div>
                <!-- <p>{{recieveAt}}</p> -->
            </section>
    `,
    data() {
        return {
            
        }
    },
    methods: {
        markRead() {
            this.$emit('mark', this.email.id)
        },
        deleteEmail(){
            this.$emit('emitDelete',this.email)
        }
    },
    computed: {
        recieveAt() {
            var sentDate = new Date(this.email.sentAt);
            var year = sentDate.getFullYear();
            var month = sentDate.getMonth() + 1;
            var day = sentDate.getDate();
            var hours = (sentDate.getHours() + 1 < 10 ) ? `0${sentDate.getHours() + 1}` : sentDate.getHours() + 1
            var minutes = (sentDate.getMinutes() + 1 < 10) ? `0${sentDate.getMinutes() + 1}` : sentDate.getMinutes() + 1;
            var today = new Date();
            if ( 
            year === today.getFullYear() &&
            month - 1 === today.getMonth() &&
            day === today.getDate()
            ) return `${hours} : ${minutes}`
            else return `${day}/${month}/${year}`
            // utilServices.getDate(new Date(this.email.sentAt))
        },
        emailBody() {
            return this.email.body.slice(0, 50)
        },
        envalopeClass(){
            return (!this.email.isRead) ? 'fas fa-envelope' : 'far fa-envelope-open'
        } 
    }
}