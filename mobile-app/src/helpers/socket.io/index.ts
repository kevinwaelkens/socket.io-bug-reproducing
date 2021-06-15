import io from 'socket.io-client';
import { Message, Socket } from '../../types/socket.io/types';

let socket: SocketIOClient.Socket;

export const initiateSocket = () => {
  socket = io('http://localhost:3000');
  console.log(`Connecting socket...`);
  if (socket) {
    socket.emit(Socket.Join);
  }
};
export const disconnectSocket = () => {
  console.log('Disconnecting socket...');
  if (socket) {
    socket.disconnect();
  }
};
export const subscribeToChat = (
  callBack: (error: Error | null, newChatMessage: Message) => void,
) => {
  if (!socket) {
    return true;
  }

  socket.on(Socket.ChatMessage, (message: Message) => {
    return callBack(null, message);
  });
};
export const sendMessage = (message: Message) => {
  if (socket) {
    socket.emit('chatMessage', { message });
  }
};
