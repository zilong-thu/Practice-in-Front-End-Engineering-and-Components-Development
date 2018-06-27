const pify = require('pify');
const path = require('path');
const getWebpackEntryObj = require('./server/utils/get-entry.js');


module.exports = {
  entry: getWebpackEntryObj(),
  output: {
    path: path.resolve(__dirname, './build'),
    filename: '[name][chunkhash].js',
  },
  resolve: {
    alias: {
      $root: path.resolve(__dirname, '.'),
    }
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['env']
          }
        }
      }
    ]
  },
};
