import React from 'react';
import ReactDOMServer from 'react-dom/server';

export default title => (req, res) => {
  res.send(`<!DOCTYPE html>${
    ReactDOMServer.renderToStaticMarkup(
      <html lang="en">
        <body>
          <h3>{title}</h3>
        </body>
      </html>)}`);
};
