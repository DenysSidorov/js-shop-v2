import express from 'express';
import bodyParse from "body-parser";
import path from "path";
import ejs from 'ejs';
import config from './config';

let app = express();
app.disable('x-powered-by'); // Отключить определение, что это express
/** Запуск приожения на порте*/
console.log(process.env.PORT, 'port');
app.use(express.static(path.join(__dirname, '/build/')));
app.use(bodyParse.json());
// app.set('view engine', 'ejs');
// app.set('views', path.join(__dirname, './source/pages'));

app.engine('ejs', require('ejs-locals'));
app.set('views', __dirname + './source/pages');
app.set('view engine', 'ejs');

// app.get('/', function (req, res) {
//   res.send('Hello World!');
// });

app.get('/', function(req, res) {
  res.render('index/index');
});

app.get('/test', function(req, res) {
  let data  = {name: 'den'}
  let wrapper = {htmlWebpackPlugin: {options: {data: data}}};
  res.render('test/test', wrapper);
});


app.listen(config.backend.port, (er) => {
  er && console.log(er);
  console.log(`Example app listening on port ${config.backend.port}`);
});