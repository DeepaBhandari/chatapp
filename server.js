const express = require('express');
const path = require('path');

const app = express();
const server = require('http').createServer(app);

// const { Server } = require('socket.io');
// const io = new Server(server);
const io = require("socket.io")(server);

// app.use(express.static(path.resolve('./public')));
app.use(express.static(path.join(__dirname + '/public')));

io.on("connection", (socket) => {
    socket.on("newuser", (username) => {
        socket.broadcast.emit("update", `${username} joined the conversation`);
    });
    socket.on("exituser", (username) => {
        socket.broadcast.emit("update", `${username} left the conversation`);
    });
    socket.on("chat", function (message) {
        socket.broadcast.emit("chat", message);
    });
});


server.listen(5000, () => console.log('server started at 5000 port'));
