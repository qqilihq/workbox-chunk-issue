const path = require('path');
const WorkboxPlugin = require('workbox-webpack-plugin');

const development = process.env.NODE_ENV === 'development';

const config = {
  mode: development ? 'development' : 'production',
  entry: {
    entrypoint1: './src/entrypoint1.js',
    entrypoint2: './src/entrypoint2.js'
  },
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: '[name].[chunkhash].js'
  },
  plugins: [
    new WorkboxPlugin.GenerateSW({
      chunks: [ 'entrypoint1' ]
      // excludeChunks: [ 'entrypoint2' ]
    })
  ],
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: 'ts-loader'
      },
      {
        test: /\.(png|jpg|jpeg|svg|ttf|otf|eot|woff|woff2)$/,
        use: [{
          loader: 'file-loader',
          options: {
            name: '[name].[hash].[ext]'
          }
        }]
      }
    ]
  }
};

module.exports = config;
