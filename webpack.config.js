const env = process.env;
const path = require('path');
const _ = require('lodash');

const getFileName = (name) => {
  const hash = env.GIT_HASH;
  const ext = '.js';
  if (_.isEmpty(hash)) {
    return `${name}${ext}`;
  }
  return `${name}.${hash}${ext}`;
};

module.exports = {
  entry: './src/browser.jsx',
  output: {
    path: path.resolve(__dirname, 'build/public/assets'),
    filename: getFileName('bundle'),
  },
  resolve: {
    extensions: ['.js', '.jsx'],
  },
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
      },
    ],
  },
};
