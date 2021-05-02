import * as socketio from 'socket.io';

const socketHandler = (socket: socketio.Socket, io: socketio.Server) => {
  socket.emit('status', 'Soket siap.');

  socket.on('pengumuman', (data) => {
    console.log(data);
    io.emit('pengumuman', data);
  });

  socket.on('login', (data) => {
    io.emit('login', data);
  });
};
export default socketHandler;
