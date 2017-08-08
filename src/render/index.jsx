import React from 'react';
import ReactDOMServer from 'react-dom/server';

export default (title, component) => (req, res) => {
  let username = null;
  if (req.user && req.user.username) {
    username = <h5>{req.user.username}</h5>;
  }
  res.send(`<!DOCTYPE html>${
    ReactDOMServer.renderToStaticMarkup(
      <html lang="en">
        <body>
          <h3>{title}</h3>
          {username}
          {component}
        </body>
      </html>)}`);
};
