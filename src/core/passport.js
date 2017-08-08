import passport from 'passport';

import { Strategy as LocalStrategy } from 'passport-local';

export default () => {
  passport.serializeUser((user, done) => {
    done(null, user);
  });

  passport.deserializeUser((user, done) => {
    done(null, user);
  });

  passport.use(new LocalStrategy(
    (username, password, done) => done(null, {
      username,
    }),
  ));
};
