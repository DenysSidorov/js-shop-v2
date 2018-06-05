import mongoose from "mongoose";
import config from '../../config';

mongoose.Promise = require('bluebird'); // Для асинхронного кода, а не колбэков которые по умолчанию


if (process.env.NODE_ENV == 'development') {
  // mongoose.set('debug', true); // выводить в консоль все запросы
}

mongoose.connect(config.backend.database, {
  useMongoClient: true,
  reconnectTries: 30,
}, err => {
  if (err) throw err;
  console.log(`Mongo connected!`);
});

export default mongoose;