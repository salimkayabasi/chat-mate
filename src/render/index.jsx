import { renderToString } from 'react-dom/server';
import template from './html';

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
