import emailService from '../email-services/email-services.js';
import utilServices from '../../../services/util-services.js';
import { eventBus, EVENT_REPLAY, EVENT_CLOSE } from '../../../services/event-bus-services.js';

export default {
    template:`
    <section class="compose-email">
        <section class="em-compose-top-bar">
            <button class="fas fa-arrow-left em-compose-back-btn" @click="goBack"></button>
            <input class="em-compose-color fas fa-palette" type="color" v-model="textColor">
            <button @click="isBold = !isBold"><i class="fas fa-bold"></i></button>
            <button @click="isUnderline = !isUnderline"><i class="fas fa-underline"></i></button>
            <button @click="isItalic = !isItalic"><i class="fas fa-italic"></i></button>
        </section>
        <form class="compose-form" @submit.prevent.stop="sendEmail">
            <input type="email" placeholder="someone@example.com" v-model="email.to">
            <input type="text" placeholder="Subject" v-model="email.subject">
            <textarea placeholder="Write something.." v-model="email.body" :class="classObject" :style="{color: textColor}"></textarea>
            <button class="em-send" type="submit"><i class="fa fa-paper-plane" aria-hidden="true"></i></button>
        </form>
    </section>
    `,
    data(){
        return{
            email : {
                from:'Mishu',
                to:null,
                id: null,
                subject: '',
                body: '',
                isRead: false,
                sentAt: null,
            },
            replayTo:null,
            isBold: false,
            isUnderline: false,
            isItalic: false,
            textColor: '#000000'
        }
    },
    methods:{
        sendEmail(){
            this.email.sentAt = Date.now();
            this.email.id = utilServices.getId();
            emailService.sendEmail({...this.email});
            this.$router.go(-1)
        },
        goBack(){
            this.$router.go(-1)
        }
    },
    computed:{
        classObject: function() {
            return {
              bold: this.isBold,
              underline: this.isUnderline,
              italic: this.isItalic,
            }
          }
    },
    created(){
        eventBus.$on(EVENT_REPLAY, (email) => {
            this.email.to = email.from;
            this.email.subject = `Re : ${email.subject}`
        }),
        eventBus.$emit(EVENT_CLOSE);

    },
    mounted(){
    },
    watch:{
       
    },
    destroyed() {
        console.log('i was destroyedd')
    }
}