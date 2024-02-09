import express from 'express';
import { createServer } from 'node:http';
import { fileURLToPath } from 'node:url';
import path, { dirname } from 'node:path';
import { Server } from 'socket.io';
const app = express();
const server = createServer(app);
const io = new Server(server);
const __dirname = dirname(fileURLToPath(path.dirname(import.meta.url)));
const port = process.env.PORT || 3000;
let globalChat = '';
console.log('connected to port: ' + port + ' at http://localhost:3000');
app.use(express.static(__dirname + '\\public'));
app.get('/', (req, res) => {
    res.sendFile('index.html');
});
io.on('connection', (socket) => {
    socket.emit('whole chat', globalChat);
    socket.on('chat message', (userMessage) => {
        globalChat = globalChat.concat(userMessage.username, ': ', userMessage.message, '\n');
        io.emit('chat message', userMessage);
    });
    socket.on('disconnect', () => {
        console.log('user disconnected');
    });
});
server.listen(port);
