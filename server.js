const express = require('express');
const path = require('path');

const app = express();
const server = require('http').createServer(app);

app.use(express.static(path.resolve('./public')));
const { Server } = require('socket.io');
const io = new Server(server);

io.on("connection", function (socket) {
    socket.on("newuser", function (username) {
        socket.broadcast.emit("update", `${username} joined the conversation`);
    });
    socket.on("exituser", function (username) {
        socket.broadcast.emit("update", `${username} left the conversation`);
    });
    socket.on("chat", function (message) {
        socket.broadcast.emit("chat", message);
    });
});
server.listen(5000, () => console.log('server started at 5000 port'));
