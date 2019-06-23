import { eventBus,EVENT_NAV,EVENT_CLOSE_MAIN } from '../services/event-bus-services.js'

export default {
    template:`
    <nav class="nav-bar">
    <button class="fas fa-hamburger main-nav-open" @click="toggleNav"></button>
    <transition  name="bounce" >
    <div class="nav-container" v-if="isOpen">
        <router-link  to="/" exact><i @click="toggleNav" class="fas fa-horse-head"></i></router-link> 
        <router-link to="/email-app" exact><i @click="toggleNav" class="fas fa-envelope"></i></router-link>
        <router-link to="/keep-app"><i @click="toggleNav" class="fas fa-lightbulb"></i></router-link>
    </div>
    </transition>
    </nav>
    `,
    data(){
        return {
            isOpen: false,
        }
    },
    methods:{
        toggleNav(){
            this.isOpen = !this.isOpen;
            eventBus.$emit(EVENT_NAV);
        }
    },
    created(){
        eventBus.$on(EVENT_CLOSE_MAIN, () => {
            console.log('emitted');
            
            this.isOpen = !this.isOpen
        })
    }
}