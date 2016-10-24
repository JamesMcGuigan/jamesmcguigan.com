// Example config: https://github.com/AngularClass/angular2-webpack-starter/blob/master/config/webpack.dev.js

var path = require('path');
var webpack = require('webpack');
var loadersByExtension = require('loaders-by-extension');
var webpackDevMiddleware = require("webpack-dev-middleware");
var webpackHotMiddleware = require("webpack-hot-middleware");
var ngAnnotatePlugin     = require('ng-annotate-webpack-plugin');
var CommonsPlugin        = require("webpack/lib/optimize/CommonsChunkPlugin");

module.exports = {
  //devtool: 'cheap-module-eval-source-map',
  //devtool: 'source-map',
  devtool: 'inline-source-map',

  entry: {
    //hmr: [
    //  'eventsource-polyfill', // necessary for hot reloading with IE
    //  'webpack-hot-middleware/client',
    //  'webpack/hot/only-dev-server', // "only" prevents reload on syntax errors
    //],
    'usa_presidential_election.bundle': './jekyll/projects/usa_presidential_election_2016/angular/index.jsx'
  },
  output: {
    filename:   '[name].js',
    path:       path.resolve('./jekyll-static/webpack/'),
    publicPath: '/webpack/'
  },
  plugins: [
    //new webpack.HotModuleReplacementPlugin(),
    //new webpack.NoErrorsPlugin()
    //new ngAnnotatePlugin(),
    //new webpack.optimize.CommonsChunkPlugin({ name: 'vendor', filename: 'vendor.bundle.js' })
    new CommonsPlugin({ name: "common.bundle", minChunks: 3 })
  ],
  resolve: {
    extensions: ['*', '.js', '.jsx', '.ts', '.tsx'], // '.scss', '.html'
  },
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        loaders: ['babel-loader'],
        exclude: [/\.(spec|e2e)\.jsx?$/, /node_modules/],
        include: path.resolve('./jekyll/'),
      },
      {
        test: /\.tsx?$/,
        loader: 'typescript-loader?typescriptCompiler=jsx-typescript',
        exclude: [/\.(spec|e2e)\.tsx?$/, /node_modules/]
      },
      {
        test: /\.scss$/,
        loader: "style!css!sass"
      },
      {
        test: /\.json5$/,
        loader: 'json5-loader'
      }
    ]
  },
  // HMR not currently working in this current setup unable to find http://localhost:4000/__webpack_hmr
  devServer: {
    hot:    false,
    inline: true,
    port:   4000,
    contentBase: './jekyll-static/'
  }
}
