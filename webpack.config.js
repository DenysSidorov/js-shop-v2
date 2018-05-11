const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const merge = require('webpack-merge');
const pug = require('./webpack/pug');
const devserver = require('./webpack/devserver');
const sass = require('./webpack/sass');
const css = require('./webpack/css');
const extractCSS = require('./webpack/css.extract');
const uglifyJS = require('./webpack/js.uglify');
const images = require('./webpack/images');
const fonts = require('./webpack/fonts');

const PATHS = {
  source: path.join(__dirname, 'source'),
  build: path.join(__dirname, 'build')
};

const common = merge([
  {
    context: path.resolve(__dirname, './source'),
    entry: {
      // common_css: ['./less/main', './less/reset', './less/font-awesome'],
      'common_css': './less/reset.less',
      'index': './pages/index/index.js',
      'blog': './pages/blog/blog.js',
      'test': './pages/test/test.js'
    },
    output: {
      path: path.resolve(__dirname, './build'),
      filename: 'js/[name].js'
    },
    plugins: [
      // new CleanWebpackPlugin([
      //   './build/**/*.*',
      //   './build/css',
      //   './build/fonts',
      //   './build/images',
      //   './build/js']),
      new HtmlWebpackPlugin({
        filename: 'index.html',
        chunks: ['index', 'common', 'common_css'],
        template: './pages/index/index.pug'
      }),
      // new HtmlWebpackPlugin({
      //   filename: 'test.html',
      //   template: './pages/test/test.ejs',
      //   chunks: ['test', 'common', 'common_css'],
      //   // inject: 'body',
      //   // minify: {
      //   //   removeComments: true,
      //   //   collapseWhitespace: true
      //   // }
      // }),
      new HtmlWebpackPlugin({
        // hash: true,
        filename: 'test.html',
        chunks: ['test', 'common', 'common_css'],
        // template: 'ejs-render-loader!./source/pages/test/test.ejs',
        template: './pages/test/test.ejs',
        inject: 'body'
      }),
      new HtmlWebpackPlugin({
        filename: 'blog.html',
        chunks: ['blog', 'common', 'common_css'],
        template: './pages/blog/blog.pug'
      }),
      new webpack.optimize.CommonsChunkPlugin({
        name: 'common'
      }),
      // new webpack.ProvidePlugin({
      //   $: 'jquery',
      //   jQuery: 'jquery'
      // })
    ]
  },
  pug(),
  images(),
  fonts()
]);

module.exports = function (env) {
  if (env === 'production') {
    return merge([
      common,
      extractCSS(),
      uglifyJS()
    ]);
  }
  if (env === 'development') {
    return merge([
      common,
      devserver(),
      extractCSS(),
      // sass(),
      // css()
    ])
  }
};









