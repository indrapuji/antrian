import * as socketio from 'socket.io';

const socketHandler = (socket: socketio.Socket, io: socketio.Server) => {
  socket.emit('status', 'Soket siap.');

  socket.on('pengumuman', (data) => {
    console.log(data);
    io.emit('pengumuman', data);
  });

  socket.on('running_text', (data) => {
    io.emit('running_text', data);
  });

  socket.on('nama_aplikasi', (data) => {
    io.emit('nama_aplikasi', data);
  });
};
export default socketHandler;
