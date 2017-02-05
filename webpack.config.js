const path = require('path');
const webpack = require('webpack');
const FlowWebpackPlugin = require('flow-webpack-plugin');

module.exports = {
  context: path.resolve(__dirname, './source'),
  resolve: {
    modules: [path.resolve(__dirname, './source'), 'node_modules']
  },
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
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: [/node_modules/],
        use: [{
          loader: 'babel-loader',
          options: {
            presets: ['es2015'],
            plugins: ['transform-flow-strip-types']
          }
        }],
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.glsl$/,
        use: ['raw-loader']
      }
    ],
  },
  plugins: [
    new FlowWebpackPlugin()
  ]
};
