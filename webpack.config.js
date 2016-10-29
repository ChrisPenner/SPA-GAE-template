var webpack = require('webpack')
var path = require('path')
var HtmlWebpackPlugin = require('html-webpack-plugin')
var CircularDependencyPlugin = require('circular-dependency-plugin')

module.exports = {
  entry: {
    'main': './main',
    'styles': [
      './client/css/style',
      './node_modules/bulma/css/bulma',
      './node_modules/css/spinners/9-cube-grid.css',
    ],
    'vendor': [
      'babel-polyfill',
      'react',
      'react-dom',
      'react-redux',
      'react-router',
      'react-router-redux',
      'redux-saga',
      'redux',
      'redux-thunk',
      'ramda',
      'humps',
      'jquery',
    ],
  },
  output: {
    path: path.resolve(__dirname, 'server', 'static'),
    publicPath: '/static/',
    filename: '[name].[hash].js',
  },
  devtool: 'inline-source-map',
  devServer: {
    contentBase: path.resolve(__dirname, 'server', 'static'),
    publicPath: '/static/',
    historyApiFallback: {
      index: '/static/index.html'
    },
    proxy: {
      '/api/*': {
        target: 'http://localhost:8080',
      },
      '/admin/*': {
        target: 'http://localhost:8080',
      },
    }
  },
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        loaders: ['react-hot', 'babel'],
        exclude: path.resolve(__dirname, 'node_modules'),
      },
      {
        test: /\.css$/,
        loaders: ['style', 'css?sourceMap'],
      },
      {
        test: /\.scss$/,
        loaders: ['style', 'css?sourceMap', 'sass?sourceMap'],
      }
    ]
  },
  resolve: {
    extensions: ['', '.js', '.jsx', '.css', '.min.css', '.scss'],
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'Writtten',
      template: path.resolve(__dirname, 'client', 'html', 'index.ejs'),
    }),
    new webpack.ProvidePlugin({
      'React': 'react',
    }),
    new webpack.optimize.CommonsChunkPlugin({
      names: ['vendor', 'styles']
    }),
    new CircularDependencyPlugin({
      exclude: /node_modules/
    }),
  ]
}
