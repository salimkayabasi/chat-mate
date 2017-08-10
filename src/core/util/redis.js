import config from 'config';
import _ from 'lodash';
import { createClient } from 'redis';

const getClient = (url) => {
  if (_.isEmpty(url)) {
    return createClient(config.redis.url);
  }
  return createClient(url);
};

export default getClient;
