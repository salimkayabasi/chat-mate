import config from 'config';
import connectRedis from 'connect-redis';
import session from 'express-session';
import { Server } from 'http';
import _ from 'lodash';
import passportSocketIo from 'passport.socketio';
import socketIo from 'socket.io';
import { getClient } from './util/redis';

const RedisStore = connectRedis(session);

class SocketManager {
  constructor(app) {
    if (!SocketManager.instance) {
      SocketManager.instance = this;
      this.server = Server(app);
      this.io = socketIo(this.server, { serveClient: false });
      this.io.on('connection', SocketManager.onConnection);
      this.io.use(passportSocketIo.authorize({
        secret: config.cookie.secret,
        store: new RedisStore({ client: getClient() }),
      }));
    }
    return SocketManager.instance;
  }

  static build(app) {
    return new SocketManager(app);
  }

  static updateUserList() {
    const instance = SocketManager.instance;
    const io = instance.io;

    const users = _.chain(io)
      .get('sockets.sockets')
      .values()
      .map('request.user')
      .uniqBy('id')
      .value();

    io.emit('users', users);
  }

  static dispatch(from, data) {
    const instance = SocketManager.instance;
    const io = instance.io;

    const clients = _.chain(io)
      .get('sockets.sockets')
      .values()
      .filter(socket => _.get(socket, 'request.user.id') === data.to)
      .map('id')
      .value();

    _.each(clients, (client) => {
      io.to(client).emit('message', {
        from: from.request.user.id,
        message: data.message,
      });
    });
  }

  static onConnection(socket) {
    socket.on('disconnect', SocketManager.updateUserList);
    socket.on('say', (data) => {
      SocketManager.dispatch(socket, data);
    });
    SocketManager.updateUserList();
  }
}

export default SocketManager;
