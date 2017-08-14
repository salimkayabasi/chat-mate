import config from 'config';
import connectRedis from 'connect-redis';
import session from 'express-session';
import { Server } from 'http';
import _ from 'lodash';
import log4js from 'log4js';
import passportSocketIo from 'passport.socketio';
import socketIo from 'socket.io';

const RedisStore = connectRedis(session);
const logger = log4js.getLogger('socket-manager');

class SocketManager {
  constructor(app, getClient) {
    if (!SocketManager.instance) {
      SocketManager.instance = this;
      this.server = Server(app);
      this.redis = getClient();
      this.io = socketIo(this.server, { serveClient: false });
      this.io.on('connection', SocketManager.onConnection);
      this.io.use(passportSocketIo.authorize({
        secret: config.cookie.secret,
        store: new RedisStore({ client: getClient() }),
      }));
    }
    return SocketManager.instance;
  }

  static build(app, getClient) {
    return new SocketManager(app, getClient);
  }

  static getConverId({ from, to }) {
    return [from, to].sort().join('-');
  }

  static saveOnRedis(message) {
    const instance = SocketManager.instance;
    const redis = instance.redis;
    const msg = JSON.stringify(message);
    redis.lpush(SocketManager.getConverId(message), msg);
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

    logger.info('connected_users', users.length);

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

    const message = {
      to: data.to,
      from: from.request.user.id,
      message: data.message,
      createdAt: new Date(),
    };

    SocketManager.saveOnRedis(message);

    _.each(clients, (client) => {
      io.to(client).emit('message', message);
    });
  }

  static getHistory(socket, data) {
    const instance = SocketManager.instance;
    const redis = instance.redis;
    const key = SocketManager.getConverId({
      from: socket.request.user.id,
      to: data.user,
    });
    redis.lrange(key, [0, -1], (err, result) => {
      if (err) {
        logger.error('get_history', err);
      } else {
        const history = _.chain(result)
          .map((item) => {
            try {
              return JSON.parse(item);
            } catch (e) {
              return null;
            }
          })
          .compact()
          .value();
        socket.emit('history', {
          history,
          from: data.user,
        });
      }
    });
  }

  static onConnection(socket) {
    socket.on('disconnect', SocketManager.updateUserList);
    socket.on('say', (data) => {
      SocketManager.dispatch(socket, data);
    });
    socket.on('history', (data) => {
      SocketManager.getHistory(socket, data);
    });
    SocketManager.updateUserList();
  }
}

export default SocketManager;
