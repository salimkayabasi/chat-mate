import config from 'config';
import _ from 'lodash';
import { renderToString } from 'react-dom/server';
import template from './html';

const hash = config.gitHash;

export const getFileName = (name) => {
  const ext = '.js';
  if (_.isEmpty(hash)) {
    return `${name}${ext}`;
  }
  return `${name}.${hash}${ext}`;
};

export default ({ title, component, cssPath, jsPath, initial = {} }) => (req, res) => {
  const options = {
    title,
    cssPath,
    jsPath,
    initial,
  };
  if (component) {
    options.component = renderToString(component);
  }
  res.send(template(options));
};
