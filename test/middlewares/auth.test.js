import auth from '../../src/middlewares/auth';

describe('Auth Middleware', () => {
  let req;
  let res;
  let next;

  beforeEach(() => {
    req = {};
    res = {};
    next = jest.fn();
  });

  test('next fn should be called with Error if there is no user data', () => {
    auth(req, res, next);
    expect(next).toHaveBeenCalledTimes(1);
    const arg = next.mock.calls[0][0];
    expect(arg).toBeInstanceOf(Error);
  });

  test('next fn should be called without any arg if user has username', () => {
    req = {
      user: {
        username: 'username',
      },
    };
    auth(req, res, next);
    expect(next).toHaveBeenCalledTimes(1);
    const arg = next.mock.calls[0][0];
    expect(arg).toBeUndefined();
  });
});
