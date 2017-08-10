import config from 'config';
import GoToHome from '../components/goToHome';
import render from '../render';
import auth from './auth';
import errorMiddleWare from './error';
import notFound from './notFound';

const error = errorMiddleWare({ dev: config.dev }, render, GoToHome());

export {
  auth,
  error,
  notFound,
};
