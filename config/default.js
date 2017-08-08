const env = process.env;

const ENV = env.NODE_ENV || 'development';
const dev = ENV === 'development';

module.exports = {
  dev,
  port: env.PORT || 3000,
  env: ENV,
};
