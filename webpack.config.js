'use strict';

// Modules
var webpack = require('webpack');
var autoprefixer = require('autoprefixer');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var CopyWebpackPlugin = require('copy-webpack-plugin');

var path = require('path');
var ENV = process.env.npm_lifecycle_event;
var isProd = ENV === 'build';

module.exports = function makeWebpackConfig() {
  var config = {};

  config.entry = {
    app: './src/app/bootstrap/index.js'
  };

  config.output = {
    path: path.join(__dirname, 'dist'),
    publicPath: isProd ? '' : 'http://localhost:8080/',
    filename: isProd ? '[name].[hash].js' : '[name].bundle.js',
    chunkFilename: isProd ? '[name].[hash].js' : '[name].bundle.js'
  };

  config.devtool = isProd ? 'source-map' : 'eval-source-map';

  config.module = {
    rules: [
      {
        test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: 'url-loader?limit=10000&mimetype=application/font-woff&name=./[hash].[ext]'
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        query: {
          presets: ['es2015']
        }
      }, {
        test: /\.(scss|css)$/,
        loader: ExtractTextPlugin.extract({
          fallbackLoader: 'style-loader',
          loader: [
            { loader: 'css-loader' },
            { loader: 'postcss-loader' },
            {
              loader: 'sass-loader',
              query: {
                data: "@import 'bootstrap'; $env: " + process.env.npm_lifecycle_event + ";",
                includePaths: [
                  path.resolve(__dirname, 'src/style')
                ],
                outputStyle: 'compressed',
                sourceMap: true
              }
            }
          ]
        })
      }, {
        test: /\.(png|jpg|jpeg|gif|svg|woff|woff2|ttf|eot)$/,
        loader: 'file-loader'
      }, {
        test: /\.html$/,
        loader: 'raw-loader'
      }]
  };

  config.plugins = [
    new webpack.LoaderOptionsPlugin({
      test: /\.scss$/i,
      options: {
        postcss: {
          plugins: [autoprefixer]
        }
      }
    })
  ];

  config.plugins.push(
    new HtmlWebpackPlugin({
      template: './src/public/index.html',
      inject: 'body'
    }),

    new ExtractTextPlugin({filename: 'css/[name].css', disable: !isProd, allChunks: true})
  );

  if (isProd) {
    config.plugins.push(
      new webpack.NoEmitOnErrorsPlugin(),
      new webpack.optimize.UglifyJsPlugin({
        mangle: false // only enable if youre positive your code is min-safe. i recommend using ngInject
      }),
      new CopyWebpackPlugin([{
        from: path.join(__dirname, 'src/public')
      }])
    );
  }

  config.devServer = {
    contentBase: './src/public',
    stats: 'minimal'
  };

  return config;
}();
