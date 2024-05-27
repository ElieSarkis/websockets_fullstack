const socketIo = require('socket.io');

let io, socket;

function init(server) {
  io = socketIo(server, { cors: { origin: '*' } });
  io.on('connection', (socket) => {
    console.log('New client connected');
    socket.emit('message', 'Welcome to the real-time app');
    socket.on('disconnect', () => {
      console.log('Client disconnected');
    });
  });
  console.log('WebSocket server initialized');
}

function sendMessage(event, message) {
  if (io) {
    io.emit(event, message);
  }
}

function connect() {
  if (!socket) {
    socket = socketIo('http://localhost:3001');
  }
  return socket;
}

module.exports = {
  init,
  sendMessage,
  connect,
};
