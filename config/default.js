const env = process.env;

const ENV = env.NODE_ENV || 'development';
const dev = ENV === 'development';

module.exports = {
  dev,
  gitHash: env.GIT_HASH || '',
  port: env.PORT || 3000,
  env: ENV,
  log: {
    level: env.LOG_LEVEL || 'debug',
    layout: env.LOG_LAYOUT || 'basic',
    http: (env.LOG_HTTP === 'true') || false,
  },
  redis: {
    url: env.REDIS_URL || 'redis://localhost',
  },
  cookie: {
    secret: env.COOKIE_SECRET || 'keyboard cat',
  },
};
