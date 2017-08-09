import faker from 'faker';
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
    {
      usernameField: 'email',
    },
    (email, password, done) => done(null, {
      id: faker.random.uuid(),
      ...faker.helpers.userCard(),
      email,
      avatar: faker.internet.avatar(),
    }),
  ));
};
