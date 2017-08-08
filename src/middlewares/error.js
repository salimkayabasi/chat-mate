import config from 'config';
import log4js from 'log4js';
import GoToHome from '../components/goToHome';
import render from '../render/';

const logger = log4js.getLogger('express-error');

export default (err, req, res, next) => {
  if (config.dev) {
    logger.error('on_error', err);
  }
  res.status(err.status);
  render({ title: err.message, component: GoToHome() })(req, res, next);
};
