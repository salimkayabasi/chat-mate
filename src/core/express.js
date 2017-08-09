import config from 'config';
import connectRedis from 'connect-redis';
import cookieParser from 'cookie-parser';
import express from 'express';
import session from 'express-session';
import log4js from 'log4js';
import passport from 'passport';
import { error, notFound } from '../middlewares/';
import { chat, login, welcome } from '../routes/';
import { getClient } from './util/redis';

const logger = log4js.getLogger('router');
const RedisStore = connectRedis(session);

class ExpressManager {
  static build(app) {
    app.use(express.static('build/public'));
    app.use(cookieParser());
    app.use(session({
      secret: config.cookie.secret,
      resave: false,
      saveUninitialized: false,
      store: new RedisStore({ client: getClient() }),
    }));
    app.use(passport.initialize());
    app.use(passport.session());
    app.use(log4js.connectLogger(logger, { level: 'auto' }));

    app.use(welcome());
    app.use(login());
    app.use(chat());
    app.use(notFound);
    app.use(error);
  }
}

export default ExpressManager;
