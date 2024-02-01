document.addEventListener('DOMContentLoaded', function () {
    // Establish a connection to the Socket.IO server
    const socket = io();
    let serverAreaText = '';

    const form = document.getElementById('form');
    const serverArea = document.getElementById('from-server-area');
    const messageField = document.getElementById('message-field');
    const usernameField = document.getElementById('username-field');

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        if (messageField.value) {
            if (usernameField.value) {

                socket.emit('chat message', {username: usernameField.value, message: messageField.value});
            } else {

                socket.emit('chat message', {username: 'anonymous', message: messageField.value});
            }
            messageField.value = '';
        }
    });
    socket.on('whole chat', (wholeChat) => {

        serverAreaText = wholeChat;
        serverArea.value = serverAreaText;
    });
    socket.on('chat message', (userMessage) => {
        serverAreaText = serverAreaText.concat(userMessage.username, ': ', userMessage.message, '\n');
        serverArea.value = serverAreaText;
    });

});