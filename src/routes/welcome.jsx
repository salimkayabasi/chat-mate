import { Router } from 'express';
import React from 'react';
import LoginBox from '../components/loginBox';
import render from '../render/';

export default () => {
  const router = Router();
  router.get('/', (req, res, next) => {
    if (req.user) {
      res.redirect('/chat');
    } else {
      next();
    }
  }, render('Welcome', <LoginBox />));
  return router;
};
