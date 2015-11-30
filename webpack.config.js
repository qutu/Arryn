var path = require('path')
var webpack = require('webpack')
var ExtractTextPlugin = require('extract-text-webpack-plugin')
var plugins = [ new ExtractTextPlugin('app.min.css') ]

if (process.env.NODE_ENV === 'production')
  plugins.push(new webpack.optimize.UglifyJsPlugin())

module.exports = {
  entry: './libs/app.js',
  output: {
    path: path.join(__dirname, 'dist'),
    publicPath: '/dist/',
    filename: 'app.min.js'
  },
  plugins: plugins,
  cssnext: {
    browsers: '> 1%, last 2 versions'
  },
  module: {
    loaders: [{ 
      test: /\.vue$/, 
      loader: 'vue' 
    },{
      test: /\.css$/,
      exclude: /(node_modules|bower_components)/,
      loader: ExtractTextPlugin.extract('style-loader', 'css-loader?minimize!cssnext-loader')
    },
    { test: /\.jpg$/, loader: "file-loader" },
    { test: /\.(png|woff|woff2|eot|ttf|svg)$/, loader: 'url-loader?limit=100000' }]
  },
  devtool: '#source-map',
  devServer: {
    contentBase: './',
    proxy: {
      '/spot/*': {
        target: 'http://106.186.119.228/spot/',
        changeOrigin: true
      }
    }
  }
}