import express from 'express';
import bodyParse from "body-parser";
import path from "path";
import ejs from 'ejs';
import config from './config';

let app = express();
app.disable('x-powered-by'); // Отключить определение, что это express
/** Запуск приожения на порте*/
console.log(process.env.PORT, 'port');
// app.use(express.static(path.join(__dirname, '/www/')));
app.use(bodyParse.json());
app.set('view engine', 'ejs');
app.set('views','./app-server/views');

// app.get('/', function (req, res) {
//   res.send('Hello World!');
// });

app.get('/', function(req, res) {
  res.render('pages/index');
});

app.get('/about', function(req, res) {
  res.render('pages/about');
});


app.listen(config.backend.port, (er) => {
  console.log(er);
  console.log(`Example app listening on port ${config.backend.port}`);
});