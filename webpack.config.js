const autoprefixer = require('autoprefixer');
const path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin'); // Чистит папку с бандлами
const ExtractTextPlugin = require('extract-text-webpack-plugin'); // собирает все css в один файл
var AssetsPlugin = require('assets-webpack-plugin'); // создает json с зависимостями
const configApp = require('./config/index');
const webpack = require('webpack'); // ставиться локально для того чтоб вытаскивать плагины и доп. инструменты
const NODE_ENV = process.env.NODE_ENV || 'development';

// Реагируем на флаг -p
var productionArg = (process.argv.indexOf('-p') != -1 ? true : false);
var inProduction = (productionArg ? 'production' : 'development');
console.log('Production state is ' + inProduction.toUpperCase());


var config = {
  context: path.resolve(__dirname, './src'),
  entry: {
    main: ["webpack-dev-server/client"],
    common_css: ['./less/main', './less/reset', './less/font-awesome'] // точка входа для стилей, она глобальная (не можем без js-точки - она пустая)
  },
  output: {
    path: path.resolve(__dirname, './www/assets'),
    filename: '[name].b.js', /*'[name].[chunkhash].b.js'*/  // точки входа
    publicPath: inProduction === 'production' ? '' : '/assets/' // строка-шаблон в адрессе для картинок, скриптов полезна для CDN
  },

  resolve: {
    extensions: ['.js', '.jsx', '.css', '.less', '.scss', '.sass'], // какие файлы ищет в модулях
  },

  module: {
    rules: [
      {
        test: /\.(svg|ttf|eot|woff|woff2)$/,
        loader: 'file-loader?name=../fonts/[name].[ext]',
      },
      {
        test: /\.css$/,
        include: path.resolve(__dirname, 'src'),
        use: ExtractTextPlugin.extract({
          // exclude: /node_modules/,
          fallback: 'style-loader',
          use: ['css-loader?sourceMap', 'postcss-loader']
        })
      },
      //less
      {
        test: /\.less$/,
        include: path.resolve(__dirname, 'src'),
        // exclude: /node_modules/,
        fallback: 'style-loader',
        use: ['css-loader?sourceMap', 'postcss-loader', 'less-loader'],
        // publicPath : '/assets'

      },
    ],
  },

  plugins: [
    // delete all in folder
    new CleanWebpackPlugin(['./www/assets/*.*']),
    // передача env-переменных в js файлы https://habrahabr.ru/post/245991/
    // new webpack.DefinePlugin({
    //   // PRODUCTION: JSON.stringify(true),
    //   'process.env.NODE_ENV': JSON.stringify(inProduction),
    //   'process.env.APP_PORT': JSON.stringify(inProduction == 'development' ? configApp.frontend.apiPort : '')
    //
    // }),


    new webpack.HotModuleReplacementPlugin(),
    // prints more readable module names in the browser console on HMR updates
    new webpack.NamedModulesPlugin(),

    //  Если в консоли при сборке были ошибkи - бандлы не будут собраны!
    new webpack.NoEmitOnErrorsPlugin(),
    // общие скрипты, которые использ в нескольких местах

    // собирает все в один .css
    new ExtractTextPlugin({
      filename: '[name].b.css', //, /*"[name].[contenthash].b.css",*/
      allChunks: true
    }),
    // postcss autoprefixer
    new webpack.LoaderOptionsPlugin({
      options: {
        postcss: [autoprefixer()]
      }
    }),
    // генерит json со всеми зависямостями
    // если html всегда статичен (SPA), можно использовать другой плагин(HtmlWebpackPlugin), который сам создает
    // index.ejs с уже подключенными бандлами
    // https://www.youtube.com/watch?v=kxxFQZx3KOk
    new AssetsPlugin({
      filename: 'assets.json',
      path: __dirname + '/app-server', // где его хранить

    })
  ],
  // devServer: {
  //   // https: true,
  //   // inline: true,
  //   // port: 443, // default
  //
  //
  //   historyApiFallback: {
  //     index: 'index2.html',
  //   }, // cannot GET *url* after press f5
  //   hot: true,
  //   // enable HMR on the server
  //   host: "localhost", // default
  //   port: 8090, // default
  //   contentBase: path.join(__dirname, 'www'), // отдает по умолчанию(можн указ люб папку), если нет бандлов
  //   // proxy: [{
  //   //     path: '*',
  //   //     target: 'http://localhost:3000',
  //   // }]
  // },
  // source-maps
  // devtool: "source-map"  //inProduction ? "source-map" : "cheap-module-inline-source-map",
};

// Если продакшн - чистим консоль, код, папки и т.д
// isProduction
// if (true/*false*/) {
//     // the path(s) that should be cleaned
//     let pathsToClean = [
//         path.resolve(__dirname, './www/assets/*.*')
//     ]
//
// // the clean options to use
//     let cleanOptions = {
//         root: '/',
//         exclude: ['shared.js'],
//         verbose: inProduction === 'production', // clean console.log
//         dry: false, // просто эмулирует удаление
//     }
//     // очистка папки https://github.com/johnagan/clean-webpack-plugin
//     var cleanPlugin = new CleanWebpackPlugin(pathsToClean, cleanOptions);
//     config.plugins.push(cleanPlugin);
}

// if (inProduction === 'production') {
//   var ugly = new webpack.optimize.UglifyJsPlugin({
//     comments: false,
//     minimize: true,
//     beautify: false,
//     compress: {
//       warnings: true,//false,
//       drop_console: false//true,
//     },
//     sourceMap: true
//   });
//   config.devtool = false;
//   config.plugins.push(ugly);
// }


module.exports = config;


// Настройка для Node EsLint

// npm i --save-dev eslint - проверка кода
// npm i --save-dev eslint-config-airbnb - конфиг для eslint (с react)
// eslint-plugin-jsx-a11y   -  для поддержки jsx
// eslint-plugin-react - для поддержки react
// eslint-plugin-import  - дополнительная зависимость чтоб небыло конфликтов, т.к при уст. был warning
// npm i --save-dev eslint-config-prettier   отключает сторонние конфиги и правила, применяя только основные


// "eslintConfig": {
//     "extends": "airbnb"
// }

//
//
// "babel-cli": "~6.24.1",
//     "babel-preset-es2015": "~6.24.1",
//     "babel-preset-stage-0": "~6.24.1",
//     "babel-preset-stage-1": "~6.24.1",
//     "babel-preset-stage-2": "~6.24.1",