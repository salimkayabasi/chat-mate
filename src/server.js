import config from 'config';
import express from 'express';
import log4js from 'log4js';
import { ExpressManager, SocketManager } from './core/';
import passportInit from './core/passport';
import logInit from './core/util/logger';
import getClient from './core/util/redis';

logInit();
const logger = log4js.getLogger('on_start');

const app = express();
ExpressManager.build(app);
passportInit();
SocketManager.build(app, getClient);
const server = SocketManager.instance.server;

server.listen(config.port, () => {
  logger.info(`ChatMate is listening on port ${config.port}!`);
  logger.debug('server_configuration', config);
});
