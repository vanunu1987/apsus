import homePage from './apps/pages/home-page.js'
import emailApp from './apps/email/email-app.js'
import keepApp from './apps/keep/keep-app.js'
import emailListCmp from './apps/email/email-cmps/email-list-cmp.js'
import EmailDetailsCms from './apps/email/email-pages/email-details-cmp.js'
// import {eventBus, EVENT_FEEDBACK} from './event-bus.js';
import composeEmil from './apps/email/email-pages/compose-email-cmp.js'


const routes = [
    { path: '/', component: homePage },
    { path: '/email-app', redirect:'email-app/inbox', component: emailApp, children: [
        // { path: '', component: emailListCmp},
        {path: 'inbox', component: emailListCmp},
        {path: 'compose-email', component: composeEmil},
        {path:':emailId', component: EmailDetailsCms }
    ] },
    
    { path: '/keep-app', component: keepApp, children: [
    ] },
]

export default routes;