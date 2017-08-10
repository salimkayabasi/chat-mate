import log4js from 'log4js';

const logger = log4js.getLogger('express-error');

export default ({ dev }, render, component) => (err, req, res, next) => {
  if (dev) {
    logger.error('on_error', err);
  }
  res.status(err.status || 500);
  render({ title: err.message, component })(req, res, next);
};
