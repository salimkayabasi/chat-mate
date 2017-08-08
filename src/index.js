import config from 'config';
import express from 'express';
import log4js from 'log4js';
import onStart from './on_start';

onStart();
const logger = log4js.getLogger('on_start');

const app = express();

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(config.port, () => {
  logger.info(`Example app listening on port ${config.port}!`);
});
