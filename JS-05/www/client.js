const socket = io();

let
    inputUserNick = document.getElementById('user-nick'),
    inputUserMessage = document.getElementById('user-message'),
    btnSendMessage = document.getElementById('send-message'),
    divUsersList = document.getElementById('list-users'),
    divListMessagesUsers = document.getElementById('list-messages-users');
    spanCountUsersOnline = document.getElementById('count-users-online');

inputUserNick.addEventListener('input', function () {
    let nick = inputUserNick.value.trim();
    socket.emit('enter', { 'nick' : nick });
});

inputUserMessage.addEventListener('keydown', function (event) {
    if (event.key === 'Enter') {
        sendMessage();
    }
});
btnSendMessage.addEventListener('click', function () {
    sendMessage();
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
    let spanElemNick = document.createElement('span');
    let spanElemDate = document.createElement('span');
    spanElemDate.classList.add('date');
    spanElemNick.innerHTML = `${users.nick}: `;
    spanElemDate.innerHTML = users.date;
    divElem.appendChild(spanElemNick);
    divElem.innerHTML += `${users.message}`;
    divElem.appendChild(spanElemDate);
    divListMessagesUsers.insertBefore(divElem, divListMessagesUsers.firstChild);
});

socket.on('countUsersOnline', (count) => {
    spanCountUsersOnline.innerHTML = count;
});

socket.on('user-nick', (nick) => {
    inputUserNick.value = nick;
});

function sendMessage() {
    let message = inputUserMessage.value.trim();
    socket.emit('message', { 'message' : message });
    inputUserMessage.value = '';
}