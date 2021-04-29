const hostname = 'localhost';
const port = 3000;

const express = require("express");
const app = express();
const http = require("http");
const server = http.createServer(app);
const io = require("socket.io")(server);
const hbs = require("hbs");

app.use(express.static('www'));
app.set('view engine', 'hbs');
hbs.registerPartials(__dirname + '/views/partials');

let users = {};

io.on('connection', (socket) => {
    users[socket.id] = 'Anonymous';
    io.emit('countUsersOnline', Object.keys(users).length);
    io.emit('user-nick', users[socket.id]);
    io.emit('listUsers', users);

    socket.on('enter', (user) => {
        users[socket.id] = user.nick;
        io.emit('listUsers', users);
    });

    socket.on('message', (user) => {
        io.emit('message', {
            'nick' : users[socket.id],
            'message' : user.message,
            'date' : formatDate(new Date())
        });
    })

    socket.on('disconnect', () => {
        delete users[socket.id];
        io.emit('listUsers', users);
        io.emit('countUsersOnline', Object.keys(users).length);
    });
});

app.get('/handlebar', (req, res) => {
    res.render('handlebar.hbs', {
        'HeadTitle' : 'Hbs',
        'BodyTitle' : 'Page Hbs',
        'BodyContent' : `User agent: ${req.get('user-agent')}`
    });
});

server.listen(port);

console.log(`Server started at http://${hostname}:${port}/`);


function formatDate(date) {
    let day = date.getDate();
    let month = date.getMonth() + 1;
    let year = date.getFullYear();

    let hour = date.getHours();
    let minutes = date.getMinutes();

    if (day < 10) day = '0' + day;
    if (month < 10) month = '0' + month;
    if (hour < 10) hour = '0' + hour;
    if (minutes < 10) minutes = '0' + minutes;

    return `${hour}:${minutes} ${day}.${month}.${year}`;
}