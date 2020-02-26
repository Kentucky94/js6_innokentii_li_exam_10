const express = require('express');
const cors = require('cors');

const config = require('./config');
const mysql = require('./mysqlDb');

const news = require('./App/news');
const comments = require('./App/comments');

const app = express();

app.use(express.json());
app.use(cors());
app.use(express.static('public'));

app.use('/news', news);
app.use('/comments', comments);

const run = async () => {
  await mysql.connect();

  app.listen(config.port, () => {
    console.log('Please try', config.port)
  });

  process.on('exit', () => {
    mysql.disconnect();
  })
};

run().catch(e => {
  console.log(e);
});