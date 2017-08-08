import createError from 'http-errors';
import _ from 'lodash';

export default (req, res, next) => {
  const username = _.get(req, 'user.username');
  if (!_.isEmpty(username)) {
    next();
  } else {
    next(createError(401, 'Please login to view this page.'));
  }
};
