import { renderToString } from 'react-dom/server';
import template from './html';

export default ({ title, component, cssPath, jsPath }) => (req, res) => {
  const options = {
    title,
    cssPath,
    jsPath,
  };
  if (component) {
    options.component = renderToString(component);
  }
  res.send(template(options));
};
