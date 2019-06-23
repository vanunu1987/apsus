export default {
    props:['count'],
    template:`
    <nav class="email-nav">
        <section class="em-link-container">
            <router-link to="/email-app/inbox">Inbox <span v-if="count > 0"
            class="em-email-counter" :class="{pad: count < 10}">{{count}}</span></router-link>
            <router-link to="/email-app/compose-email" class="em-new-mail">New Email
            <span class="em-compose-mark">+</span></router-link>
        </section>
    </nav>
    `
}