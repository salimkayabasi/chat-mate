import { Server } from 'http';
import socketIo from 'socket.io';

class SocketManager {
  constructor(app) {
    if (!SocketManager.instance) {
      SocketManager.instance = this;
      this.server = Server(app);
      this.io = socketIo(this.server);
      this.io.on('connection', SocketManager.onConnection);
    }
    return SocketManager.instance;
  }

  static build(app) {
    return new SocketManager(app);
  }

  static onConnection(socket) {
    socket.emit('message', 'connected');
  }
}

export default SocketManager;
