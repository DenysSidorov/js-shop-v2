import express from 'express';
import config from './config';

let app = express();

app.get('/', function (req, res) {
  res.send('Hello World!');
});

app.listen(config.backend.port, (er) => {
  console.log(er);
  console.log(`Example app listening on port ${config.backend.port}`);
});