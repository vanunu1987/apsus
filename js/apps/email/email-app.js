import emailService from '../email/email-services/email-services.js';
import emailNav from '../email/email-cmps/email-nav-cmp.js';
import { eventBus, EVENT_READ,EVENT_CLOSE,EVENT_NAV,EVENT_CLOSE_MAIN } from '../../services/event-bus-services.js';

export default {
    template: `
        <section class="email-app">
        <transition  name="bounce" >
            <div class="nav-container-app" v-if="isOpen">
                <router-link  to="/" exact><i @click="emitNav" class="fas fa-horse-head"></i></router-link> 
                <router-link to="/email-app" exact><i @click="emitNav" class="fas fa-envelope"></i></router-link>
                <router-link to="/keep-app"><i @click="emitNav" class="fas fa-lightbulb"></i></router-link>
            </div>
         </transition>
            <header>
            <router-link to="/email-app/inbox">
                <div class="email-icon">
                    <img :src="'./img/' + 'email-icon2.png'">&nbsp
                    <h1>MisterEmail</h1>
                    <button class="em-open-nav" @click.stop.prevent="openNav">
                        <i class="fas fa-th-large"></i>
                    </button>
                </div>
            </router-link>
            </header>
            <email-nav :class="{ 'open-nav': isNavOpened }" :count="unreadCount">Nav</email-nav>
            <section class="email-view">
                <router-view @read="updateCount"></router-view>
            </section>
        </section>
    `,
    data() {
        return {
            emails: null,
            unreadCount: null,
            isCompose: false,
            isNavOpened: false,
            isOpen: true
        }

    },
    components: {
        emailNav,
    },
    methods: {
        updateCount(count) {
            if (!this.emails) return
            this.unreadCount = count;
        },
        openNav() {
            this.isNavOpened = !this.isNavOpened
        },
        toggleNav() {
            this.isOpen = !this.isOpen;
        },
        emitNav(){
            eventBus.$emit(EVENT_CLOSE_MAIN);
        },
      
    },
    computed: {
      
    },
    created() {
        emailService.getEmails('Mishu')
            .then((emails) => {
                this.emails = emails;
                this.updateCount()
            }),
            eventBus.$on(EVENT_READ, () => {
                this.unreadCount--
            }),
            eventBus.$on(EVENT_CLOSE, () => {
                this.isNavOpened = false;
            }),
            eventBus.$on(EVENT_NAV, () => {
                this.isOpen = !this.isOpen
            })

    },
    mounted() {
        this.isOpen = false;
    },
}