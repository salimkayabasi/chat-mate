import render from '../render/';

export default (err, req, res, next) => {
  res.status(err.status);
  render(err.message)(req, res, next);
};
