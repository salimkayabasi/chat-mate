import bodyParser from 'body-parser';
import { Router } from 'express';
import passport from 'passport';

const jsonParser = bodyParser.json();

export default () => {
  const router = Router();
  router.post('/login',
    jsonParser,
    passport.authenticate('local', {
      successRedirect: '/chat',
      failureRedirect: '/',
    }));
  return router;
};
