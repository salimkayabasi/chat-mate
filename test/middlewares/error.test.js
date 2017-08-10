import errorMiddleware from '../../src/middlewares/error';

describe('Error Middleware', () => {
  let req;
  let res;
  let next;
  let render;
  const component = {
    component: true,
  };
  const config = {
    dev: true,
  };

  beforeEach(() => {
    req = {};
    res = {
      status: jest.fn(),
    };
    next = jest.fn();
    render = jest.fn(() => jest.fn());
  });

  it('should render component with given status code', () => {
    const errMw = errorMiddleware(config, render, component);
    const errTitle = 'errTitle';
    const err = new Error(errTitle);
    err.status = 404;
    errMw(err, req, res, next);
    expect(res.status).toHaveBeenCalledWith(404);
    expect(render).toHaveBeenCalledWith({
      title: errTitle,
      component,
    });
  });

  test('status code should be 500 if error has no status code', () => {
    const errMw = errorMiddleware(config, render, component);
    const err = new Error();
    errMw(err, req, res, next);
    expect(res.status).toHaveBeenCalledWith(500);
  });
});
