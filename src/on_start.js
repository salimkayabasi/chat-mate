import logInit from './core/util/logger';
import passportInit from './core/passport';

const onStart = () => {
  logInit();
  passportInit();
};

export default onStart;
