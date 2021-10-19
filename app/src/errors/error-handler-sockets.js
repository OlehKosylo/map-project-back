module.exports = (message, code, customCode, socket) => {
    socket.emit('socket.error', JSON.stringify({ message, code, customCode }));
};
