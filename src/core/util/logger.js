import config from 'config';
import _ from 'lodash';
import log4js from 'log4js';

export default () => {
  const layouts = _.transform(['basic', 'colored'],
    (result, type) => {
      result[type] = { // eslint-disable-line no-param-reassign
        out: {
          type: 'stdout',
          layout: {
            type,
          },
        },
      };
      return result;
    }, {});

  const layout = layouts[config.log.layout] || layouts.basic;

  log4js.configure({
    appenders: layout,
    categories: {
      default: {
        appenders: ['out'],
        level: config.log.level,
      },
    },
  });
};
