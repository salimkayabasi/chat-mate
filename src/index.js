import config from 'config';
import express from 'express';
import log4js from 'log4js';
import { ExpressManager } from './core/';
import onStart from './on_start';

onStart();
const logger = log4js.getLogger('on_start');
const app = express();

ExpressManager.build(app);

app.listen(config.port, () => {
  logger.info(`ChatMate is listening on port ${config.port}!`);
});
