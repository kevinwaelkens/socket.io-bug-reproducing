import { Message, Socket } from './types/socket.io/types';
const io = require('socket.io')();

io.on(Socket.Connection, (socket) => {
  console.log(`Connected: ${socket.id}`);
  socket.on(Socket.Disconnect, () => console.log(`Disconnected: ${socket.id}`));
  socket.on('error', (error) => console.log(`ERROR: ${error}`));
  socket.on(Socket.Join, () => {
    console.log(`Socket ${socket.id} joining`);
    console.log('io.sockets.adapter.sids is ', io.sockets.adapter);
    const roomNumber = (Math.random()*100000).toFixed(0);
    socket.join(roomNumber);
    io.emit('join', roomNumber)
  });
  socket.on(Socket.ChatMessage, (data: { message: Message }) => {
    const { message } = data;
    io.emit('chatMessage', message);
  });
});

io.listen(3000);
