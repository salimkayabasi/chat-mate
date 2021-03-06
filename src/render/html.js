import _ from 'lodash';

export default ({ title, component, cssPath, jsPath, initial }) => {
  let style = '';
  if (!_.isEmpty(cssPath)) {
    style = `<link rel="stylesheet" href="/assets/${cssPath}" />`;
  }
  let script = '';
  if (!_.isEmpty(jsPath)) {
    script = `<script type="text/javascript" src="/assets/${jsPath}"></script>`;
  }
  return `<!DOCTYPE html>
    <html>
      <head>
        <title>${title}</title>
        ${style}
      </head>
      
      <body>
        <div id="root">${component}</div>
      </body>
      <script>
        window.__APP_INITIAL_STATE__ = ${JSON.stringify(initial)}
      </script>
      ${script}
    </html>
  `;
};
