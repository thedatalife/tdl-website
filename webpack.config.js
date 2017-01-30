const path = require('path');
const webpack = require('webpack');

module.exports = {
  context: path.resolve(__dirname, './source'),
  entry: {
    app: './app.js',
  },
  output: {
    path: path.resolve(__dirname, './build'),
    filename: '[name].bundle.js',
    publicPath: '/public',
  },
  devServer: {
    contentBase: path.resolve(__dirname, './source'),
  },
};
