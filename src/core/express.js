import cookieParser from 'cookie-parser';
import express from 'express';
import session from 'express-session';
import log4js from 'log4js';
import passport from 'passport';
import { error, notFound } from '../middlewares/';
import { chat, login, welcome } from '../routes/';

const logger = log4js.getLogger('router');

class ExpressManager {
  static build(app) {
    app.use(express.static('build/public'));
    app.use(cookieParser());
    app.use(session({
      secret: 'keyboard cat',
      resave: false,
      saveUninitialized: false,
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
