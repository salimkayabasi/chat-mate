const path = require('path');

module.exports = {
  entry: './src/browser.jsx',
  output: {
    path: path.resolve(__dirname, 'build/public/assets'),
    filename: 'bundle.js',
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
