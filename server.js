import express from 'express';
import bodyParse from "body-parser";
import morgan from "morgan";
import path from "path";
import axios from 'axios';

var request = require('request');
import fs from "fs";
import ejs from 'ejs';
import config from './config';
import errorMiddleWare from "./app-server/middlewares/errors";

import goodRoute from "./app-server/routes/goodRoute";


import * as GoodController from './app-server/controllers/good';
import Good from './app-server/models/good';

// db connection
import './app-server/connection';


let app = express();
app.disable('x-powered-by'); // Отключить определение, что это express

app.use(bodyParse.json());
app.use(bodyParse.urlencoded({extended: true}));
app.use(morgan('tiny')); // Настройка логирования, см. документация на npmjs.com
// app.set('view engine', 'ejs');
// app.set('views', path.join(__dirname, './source/pages'));

app.engine('ejs', require('ejs-locals'));
app.set('views', __dirname + '/source/pages');
app.set('view engine', 'ejs');

var cors = require('cors');

console.log('DEV MODE = ', process.env.NODE_ENV);

app.use('/api/goods', /*cors(),*/ goodRoute);


app.get('/t', async (req, res) => {
  let result = await Good.find({});
  console.log('////', result);
  res.send(result);
});
//
// app.get('/', function(req, res) {
//   res.render('index/index');
// });

app.get(['/index', '/', ''], async (req, resp, next) => {
  try {
    const result = await axios({method: 'get', url: 'http://localhost:5006/api/goods/'});
    const data = {title: 'index', js: 'index', css: 'index', goods: result.data};
    resp.render('index/index', data);
  } catch (er) {
    console.log(er.response | er);
    // TODO ADD ERROR PAGE
    resp.send({status: 'Error'})
  }
});

app.get('/order', function (req, res) {
  const data = {title: 'order', js: 'order', css: 'order'};
  // const wrapper = {htmlWebpackPlugin: {options: {data: data}}};
  res.render('order/order', data);
});

app.get('/payment-and-delivery', function (req, res) {
  const data = {
    title: 'Оплата и доставка', js: 'payment-and-delivery',
    css: 'payment-and-delivery'
  };
  const wrapper = {htmlWebpackPlugin: {options: {data: data}}};
  res.render('landings/payment-and-delivery/payment-and-delivery', wrapper);
});

app.get('/cashback-and-exchange', function (req, res) {
  const data = {
    title: 'Возврат и обмен', js: 'cashback-and-exchange',
    css: 'cashback-and-exchange'
  };
  const wrapper = {htmlWebpackPlugin: {options: {data: data}}};
  res.render('landings/cashback-and-exchange/cashback-and-exchange', wrapper);
});

app.get('/about-us', function (req, res) {
  const data = {title: 'О нас', js: 'about-us', css: 'about-us'};
  const wrapper = {htmlWebpackPlugin: {options: {data: data}}};
  res.render('landings/about-us/about-us', wrapper);
});

app.get('/contacts', function (req, res) {
  const data = {title: 'Контакты', js: 'contacts', css: 'contacts'};
  const wrapper = {htmlWebpackPlugin: {options: {data: data}}};
  res.render('landings/contacts/contacts', wrapper);
});


app.get('/orders/:id', async function (req, resp) {
  const data = {title: 'Заказы', js: 'orders', css: 'orders', id: req.params.id};
  resp.render('landings/orders/orders', data);
  // resp.json({id: req.params.id})
});

app.get('/products/:id', async function (req, resp) {

  const id = req.params.id;

  try {
    let result = await axios.get(`http://localhost:5006/api/goods/${id}`);
    const data = {title: 'card', js: 'card', css: 'card', card: result.data[0]};
    resp.render('card/card', data);
  } catch (er) {
    console.log(er.response | er);
    // TODO ADD ERROR PAGE
    resp.send({status: 'Error'})
  }

});


app.use(express.static(path.join(__dirname, '/build/')));

app.use(errorMiddleWare); // Обработчик ошибок должен быть последним

app.all('*', (req, resp) => resp.status(404).json({
  message: "Resource not found, API-SHOP",
  type: 404
}));

process.on('uncaughtException', function (err) {
  console.error((new Date).toUTCString() + ' uncaughtException:', err.message);
  console.error(err.stack);
  process.exit(1);
});

process.on('unhandledRejection', (reason, p) => {
  console.log('Unhandled Rejection at: Promise', p, 'reason:', reason);
  // application specific logging, throwing an error, or other logic here
});

app.listen(config.backend.port, (er) => {
  er && console.log(er);
  console.log(`Example app listening on port ${config.backend.port}`);
});