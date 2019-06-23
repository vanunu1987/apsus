import emailPreview from './email-preview-cmp.js';
import emailService from '../email-services/email-services.js';
import deleteMsg from '../email-cmps/delete-msg-cmp.js';
import searchBar from '../email-cmps/search-bar-cmp.js'
import filterList from '../email-cmps/filter-list-cmp.js'
import sortList from '../email-cmps/sort-list-cmp.js'
import { eventBus, EVENT_DELETE, EVENT_NAV } from '../../../services/event-bus-services.js';


export default {
    template: `
        <section v-if="emails" class="email-list">
            <delete-msg v-if="isMsg" :deletedEmail="deletedEmail" @restore="restoreEmail">
            </delete-msg>
            <section class="em-top-bar">
                <button v-if="selectedEmailsId.length > 0" @click="deleteMulti"
                    class="em-delete-multi fa fa-trash"></button>
                    <search-bar @emitSearch="searchEmail"></search-bar>
                    <sort-list @emitSort="sortEmails"></sort-list>
                    <filter-list @emitFilter="filterEmails"></filter-list>
                </section>
            <ul>
                <router-link :to="currEmail.id" v-for="(currEmail, idx) in emailsToShow"
                 :key="currEmail.id">
                    <input type="checkbox" @click.stop class="em-multi-select"
                     @input="addEmail(currEmail)"
                     true-value="yes" false-value="no">
                    <email-preview :email="currEmail"
                    @mark="markRead" @emitDelete="deleteEmail">
                    </email-preview>
                </router-link>
            </ul>
        </section>
    `,
    data() {
        return {

            isMsg: false,
            emails: null,
            isDelete: false,
            unreadCount: null,
            searchVal: '',
            filterBy: 'all',
            sortBy: 'sentAt',
            selectedEmailsId: [],
            deletedEmail: null,
            isSelect: false,
            isHamNav: false
        }
    },
    components: {
        deleteMsg,
        emailPreview,
        searchBar,
        filterList,
        sortList


    },
    methods: {
        markRead(emailId) {
            emailService.readEmail(emailId)
                .then(emails => this.emails = emails);
            this.updateCount()
        },
        deleteEmail(email) {
            let idx = emailService.deleteEmail(email.id);
            eventBus.$emit(EVENT_DELETE, { email: email, idx });
        },
        deleteMulti() {
            emailService.deleteMulti(this.selectedEmailsId)
                .then((emails) => {
                    this.emails = emails;
                    this.selectedEmailsId = [];
                })
                .then((res) => this.updateCount())
        },
        restoreEmail(email) {
            emailService.restoreEmail(email);
            this.isMsg = false;
        },
        searchEmail(val) {
            this.searchVal = val;
        },
        filterEmails(filterBy) {
            this.filterBy = filterBy;
        },
        sortEmails(sortBy) {
            this.sortBy = sortBy;
        },
        updateCount() {
            var count = 0;
            this.emails.forEach(email => {
                if (!email.isRead) count++
            });
            this.unreadCount = count;
            this.$emit('read', this.unreadCount);
        },
        addEmail(checkedEmail) {
            if (this.selectedEmailsId.some((emailId) => {
                return emailId === checkedEmail.id
            })){
                this.selectedEmailsId = this.selectedEmailsId.filter((emailId) => {
                    return emailId !== checkedEmail.id
                })
            } else this.selectedEmailsId.push(checkedEmail.id)
        },

    },
    computed: {
        emailsToShow() {
            if (!this.emails) return
            var filteredEmails = this.emails.filter((email) => {
                return (email.body.toUpperCase().includes(this.searchVal) ||
                 email.subject.toUpperCase().includes(this.searchVal)) &&
                    (email.isRead === this.filterBy || this.filterBy === 'all') ||
                    (!this.searchVal && this.filterBy === 'all')
            })
            if (this.sortBy === 'sentAt') {
                filteredEmails.sort((a, b) => {
                    return b.sentAt - a.sentAt
                })
            } else {
                filteredEmails.sort((a, b) => {
                    if (a.subject < b.subject) return -1
                    else return 1
                })
            }
            return filteredEmails;
        },
    },
    created() {
        emailService.getEmails('Mishu')
            .then((emails) => {
                this.emails = emails;
                this.updateCount();
            }),
            eventBus.$on(EVENT_DELETE, (email) => {
                this.isMsg = true;
                this.deletedEmail = email;
                setTimeout(() => {
                    this.isMsg = false;
                }, 5000)
            })
        
    },
    destroyed() {
    },
    watch: {
        emails: function () {
            this.updateCount()
        }
    }
}