import config from 'config';
import _ from 'lodash';
import { createClient } from 'redis';

export const getClient = (url) => {
  if (_.isEmpty(url)) {
    return createClient(config.redis.url);
  }
  return createClient(url);
};
