import bodyParser from 'body-parser';
import { Router } from 'express';
import passport from 'passport';

const urlencodedParser = bodyParser.urlencoded({ extended: false });

export default () => {
  const router = Router();
  router.post('/login',
    urlencodedParser,
    passport.authenticate('local', {
      successRedirect: '/chat',
      failureRedirect: '/',
    }));
  return router;
};
