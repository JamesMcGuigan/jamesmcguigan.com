var path = require('path');
var webpack = require('webpack');

module.exports = {
  //devtool: 'cheap-module-eval-source-map',
  //devtool: 'source-map',
  devtool: 'inline-source-map',
  entry: {
    usa_presidential_election: './jekyll/projects/usa_presidential_election_2016/index.js',
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
    extensions: ['', '.js', '.jsx']
  },
  module: {
    loaders: [{
      test: /\.js|\.jsx$/,
      loaders: ['babel'],
      include: path.join(__dirname, 'src')
    },
      {
        test: /\.scss$/,
        loader: "style!css!sass"
      }]
  }
};
