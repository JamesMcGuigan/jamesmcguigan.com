// Example config: https://github.com/AngularClass/angular2-webpack-starter/blob/master/config/webpack.dev.js

var path = require('path');
var webpack = require('webpack');

module.exports = {
  //devtool: 'cheap-module-eval-source-map',
  //devtool: 'source-map',
  devtool: 'inline-source-map',
  entry: {
    usa_presidential_election: './jekyll/projects/usa_presidential_election_2016/index.tsx',
  },
  output: {
    path:     './jekyll/webpack/',
    filename: '[name].js',
    publicPath: './jekyll/'
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin()
  ],
  resolve: {
    //modulesDirectories: ['node_modules'],
    extensions: ['*', '.html', '.scss', '.js', '.jsx', '.ts', '.tsx']
  },
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        loaders: ['babel-loader'],
        exclude: [/\.(spec|e2e)\.jsx?$/],
        include: path.join(__dirname, 'node_modules')
      },
      {
        test: /\.tsx?$/,
        loaders: [
          '@angularclass/hmr-loader?pretty=true',
          'awesome-typescript-loader',
          'angular2-template-loader'
        ],
        exclude: [/\.(spec|e2e)\.tsx?$/],
        include: path.join(__dirname, 'node_modules')
      },
      {
        test: /\.scss$/,
        loader: "style!css!sass"
      }]
  }
};
