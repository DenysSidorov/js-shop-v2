import express from 'express';
import bodyParse from "body-parser";
import morgan from "morgan";
import path from "path";
import fs from "fs";
import ejs from 'ejs';
import config from './config';

import goodRoute from "./app-server/routes/goodRoute";

// db connection
import './app-server/connection';
import Good from './app-server/models/good';



let app = express();
app.disable('x-powered-by'); // Отключить определение, что это express

app.use(bodyParse.json());
// app.set('view engine', 'ejs');
// app.set('views', path.join(__dirname, './source/pages'));

app.engine('ejs', require('ejs-locals'));
app.set('views', __dirname + '/source/pages');
app.set('view engine', 'ejs');

var cors = require('cors');

console.log('DEV MODE = ', process.env.NODE_ENV);








app.get('/t',async (req, res) => {
  let result = await Good.find({});
  console.log('////',result);
  res.send(result);
});
//
// app.get('/', function(req, res) {
//   res.render('index/index');
// });

app.get(['/index',  '/',''], function(req, res) {
  const data  = {title: 'index', js: 'index', css: 'index'};
  const wrapper = {htmlWebpackPlugin: {options: {data: data}}};
  res.render('index/index', wrapper);
});

app.get('/order', function(req, res) {
  const data  = {title: 'order', js: 'order', css: 'order'};
  const wrapper = {htmlWebpackPlugin: {options: {data: data}}};
  res.render('order/order', wrapper);
});

app.get('/card', function(req, res) {
  const data  = {title: 'card', js: 'card', css: 'card'};
  const wrapper = {htmlWebpackPlugin: {options: {data: data}}};
  res.render('card/card', wrapper);
});

app.get('/payment-and-delivery', function(req, res) {
  const data  = {title: 'Оплата и доставка', js: 'payment-and-delivery',
    css: 'payment-and-delivery'};
  const wrapper = {htmlWebpackPlugin: {options: {data: data}}};
  res.render('landings/payment-and-delivery/payment-and-delivery', wrapper);
});

app.get('/cashback-and-exchange', function(req, res) {
  const data  = {title: 'Возврат и обмен', js: 'cashback-and-exchange',
    css: 'cashback-and-exchange'};
  const wrapper = {htmlWebpackPlugin: {options: {data: data}}};
  res.render('landings/cashback-and-exchange/cashback-and-exchange', wrapper);
});

app.get('/about-us', function(req, res) {
  const data  = {title: 'О нас', js: 'about-us', css: 'about-us'};
  const wrapper = {htmlWebpackPlugin: {options: {data: data}}};
  res.render('landings/about-us/about-us', wrapper);
});

app.get('/contacts', function(req, res) {
  const data  = {title: 'Контакты', js: 'contacts', css: 'contacts'};
  const wrapper = {htmlWebpackPlugin: {options: {data: data}}};
  res.render('landings/contacts/contacts', wrapper);
});


app.use(express.static(path.join(__dirname, '/build/')));

app.listen(config.backend.port, (er) => {
  er && console.log(er);
  console.log(`Example app listening on port ${config.backend.port}`);
});