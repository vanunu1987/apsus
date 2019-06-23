import emailApp from './apps/email/email-app.js';
import keepApp from './apps/keep/keep-app.js';
import homePage from './apps/pages/home-page.js';
import navBar from './cmps/nav-cmp.js';
import myRoutes from './routes.js';
// import deleteMsg from './apps/email/email-cmps/read-count-cmp.js'




const myRouter = new VueRouter({routes: myRoutes})

window.vueApp = new Vue({
    el: '#app',
    router: myRouter,
    components: {
        emailApp,
        keepApp,
        navBar,
        homePage,
        // deleteMsg
       
    },
   
})