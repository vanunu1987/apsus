
// import utilServices from './js/services/util-services.js'
import utilServices from '../../../services/util-services.js'

export default {
    getEmailById,
    getEmails,
    readEmail,
    deleteEmail,
    restoreEmail,
    sendEmail,
    deleteMulti

}

var user = 'Mishu'

var gEmails;
createEmails();

function createEmails() {
    // debugger
    var localEmails = utilServices.loadFromStorage(`${user}-emails`)
    if (localEmails && localEmails.length > 0) gEmails = localEmails;
    else {
        var emails = []
        for (var i = 0; i < 20; i++) {
            emails[i] = createEmail()
        }
        utilServices.saveToStorage(`${user}-emails`, emails)
        gEmails = emails
    }


}
function createEmail() {
    return {
        id: utilServices.getId(),
        from: user,
        to: user,
        subject: utilServices.getRandomWords(),
        body: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Dolorem recusandae ipsam quibusdam cupiditate! Omnis adipisci tenetur, in provident aliquam fuga saepe ratione, amet reiciendis quae reprehenderit totam quas! Minima, reiciendis?',
        isRead: false,
        sentAt: Date.now() - utilServices.getRandomInclusive(0, 100000000),
    }
}

function restoreEmail(email) {
    gEmails.splice(email.idx, 0, email.email)
    utilServices.saveToStorage(`${user}-emails`, gEmails)
}

function deleteEmail(removeId) {
    var idx = gEmails.findIndex((email) => {
        return email.id === removeId
    })
    if (idx === -1) return
    gEmails.splice(idx, 1);
    utilServices.saveToStorage(`${user}-emails`, gEmails)
    return idx
}
function deleteMulti(removeIds) {
    var idx = []
    gEmails = gEmails.filter((email, deletedIdx) => {
        // debugger
        return !removeIds.some((id) => {
            return (email.id === id) 
        })

    });
    utilServices.saveToStorage(`${user}-emails`, gEmails);
    return Promise.resolve(gEmails);
    // return idx
}

function getEmails(currUser) {
    // gEmails = utilServices.loadFromStorage(`${currUser}-emails`);
    return Promise.resolve(gEmails);

}

function getEmailById(id) {
    // eMails = utilServices.loadFromStorage(`${user}-emails`);
    var email = gEmails.find((email) => {
        return email.id === id
    })
    return Promise.resolve(email)
}

function readEmail(id) {
    // eMails = utilServices.loadFromStorage(`${user}-emails`);
    gEmails = gEmails.map((email) => {
        if (email.id === id) email.isRead = !email.isRead;
        return email;
    })
    utilServices.saveToStorage(`${user}-emails`, gEmails);
    return Promise.resolve(gEmails);

}

function sendEmail(email) {
    gEmails.unshift(email)
    utilServices.saveToStorage(`${user}-emails`, gEmails)
}