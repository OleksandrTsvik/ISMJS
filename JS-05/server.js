const hostname = 'localhost';
const port = 3000;

const express = require("express");
const app = express();
const http = require("http");
const server = http.createServer(app);
const io = require("socket.io")(server);

app.use(express.static('www'));

let users = {};

io.on('connection', (socket) => {
    socket.on('enter', (user) => {
        users[socket.id] = user.nick;
        io.emit('listUsers', users);
    });
    socket.on('message', (user) => {
        io.emit('message', {
            'nick' : users[socket.id],
            'message' : user.message
        });
    })
    socket.on('disconnect', () => {
        delete users[socket.id];
        io.emit('listUsers', users);
    });
});

server.listen(port);

console.log(`Server started at http://${hostname}:${port}/`);
// io.on('connection', (socket) => {
//     console.log('a user connected');
//     socket.on('message', (data) => {
//         console.log(data);
//     });
//     setInterval(() => {
//         socket.emit('message', 'Hello from server!');
//     }, 10000);
// });