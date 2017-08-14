import express from 'express';
import SocketManager from '../../src/core/socket';

describe('Socket Manager', () => {
  const app = express();
  const msg = {
    from: 'from',
    to: 'to',
    message: 'message',
  };
  beforeEach(() => {
    const getClient = () => ({
      lrange: (key, param, callback) => {
        callback(null, [JSON.stringify(msg)]);
      },
      on: jest.fn(),
    });

    SocketManager.instance = null;
    SocketManager.build(app, getClient);
  });

  describe('getHistory', () => {
    it('should emit history data as Array if there is a data for us', () => {
      const socket = {
        request: {
          user: {
            id: 5,
          },
        },
        emit: jest.fn(),
      };
      const data = {
        user: 'user',
      };
      SocketManager.getHistory(socket, data);
      expect(socket.emit).toHaveBeenCalledTimes(1);
      expect(socket.emit).toHaveBeenCalledWith('history', {
        history: [msg],
        from: data.user,
      });
    });
  });
});
