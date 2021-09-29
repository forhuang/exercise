const path = require('path')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

module.exports = {
  entry: [
    'regenerator-runtime/runtime',
    './index.js',
    'bootstrap/dist/css/bootstrap.min.css',
  ],
  output: {
    path: path.resolve(__dirname, '../../static/js'),
    publicPath: '/static/js/',
    filename: 'bundle.js',
  },
  resolve: {
    fallback: {
      stream: false,
      path: false,
    },
  },
  devtool: 'eval-cheap-module-source-map',
  plugins: [
    new MiniCssExtractPlugin({
      filename: '[name].css',
      chunkFilename: '[id].css',
    }),
  ],
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/env', 
              ['@babel/react', {
                runtime: 'automatic',
              }]
            ],
          },
        },
      }, {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader'],
      },
    ],
  },
}
