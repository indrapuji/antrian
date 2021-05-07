/* eslint-disable no-console */
import * as socketio from 'socket.io';

const socketHandler = (socket: socketio.Socket, io: socketio.Server) => {
  socket.emit('status', 'Soket siap.');

  socket.on('pengumuman', (data) => {
    io.emit('pengumuman', data);
  });

  socket.on('running_text', (data) => {
    io.emit('running_text', data);
  });

  socket.on('nama_aplikasi', (data) => {
    io.emit('nama_aplikasi', data);
  });

  socket.on('logo_aplikasi', (data) => {
    io.emit('logo_aplikasi', data);
  });

  socket.on('pendaftaran', (data) => {
    io.emit('pendaftaran', data);
  });

  socket.on('max_antrian', (data) => {
    io.emit('max_antrian', data);
  });

  socket.on('panggilan', (data) => {
    io.emit('panggilan', data);
  });

  socket.on('list_antrian', (data) => {
    io.emit('list_antrian', data);
  });

  socket.on('operator', (data) => {
    io.emit('operator', data);
  });
};
export default socketHandler;
