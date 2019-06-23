export default {
    saveToStorage,
    loadFromStorage,
    getRandomInclusive,
    getId,
    getDate,
    getRandomWords
}

function saveToStorage(key, value) {
    var str = JSON.stringify(value);
    localStorage.setItem(key, str);
}
function loadFromStorage(key) {
    // debugger
    var str = localStorage.getItem(key)
    return JSON.parse(str)
}

function getRandomInclusive(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

function getId() {
    var length = 8;
    var txt = '';
    var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for (var i = 0; i < length; i++) {
        txt += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return txt;
}

function getDate(currDate) {

}

function getRandomWords() {
    var words = ['Hello', 'Hi', 'What', 'How', 'Are', 'You', 'Regarding', 'ASAP', 'Continue', 'The', 'Farm', 'House', 'In', 'Addition'];
    var str = [];
    for (let i = 0; i < 5; i++){
        str.push(words[Math.floor(Math.random() * words.length)]);
    }
    console.log(str.join(' '));
    return str.join(' ')
}
