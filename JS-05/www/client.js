const socket = io();

let
    inputUserNick = document.getElementById('user-nick'),
    inputUserMessage = document.getElementById('user-message'),
    btnUserEnter = document.getElementById('enter-nick'),
    btnSendMessage = document.getElementById('send-message'),
    divUsersList = document.getElementById('list-users'),
    divListMessagesUsers = document.getElementById('list-messages-users');

btnUserEnter.addEventListener('click', function () {
    let nick = inputUserNick.value.trim();
    socket.emit('enter', { 'nick' : nick });
});

btnSendMessage.addEventListener('click', function () {
    let message = inputUserMessage.value.trim();
    socket.emit('message', { 'message' : message });
});

socket.on('listUsers', (users) => {
    divUsersList.innerHTML = '';
    for (let key in users) {
        let divElem = document.createElement('div');
        divElem.innerHTML = users[key];
        divUsersList.appendChild(divElem);
    }
});

socket.on('message', (users) => {
    let divElem = document.createElement('div');
    divElem.innerHTML = `${users.nick}: ${users.message}`;
    divListMessagesUsers.appendChild(divElem);
});