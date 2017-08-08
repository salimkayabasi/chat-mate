import createError from 'http-errors';

export default (req, res, next) => {
  next(createError(404, 'We\'ve couldn\'t find this page, please try again later'));
};
