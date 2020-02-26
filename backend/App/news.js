const path = require('path');
const express = require('express');
const multer = require('multer');
const nanoid = require('nanoid');

const router = express.Router();

const mysqlDb = require('../mysqlDb');
const config = require('../config');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, config.uploadPath)
  },
  filename: (req, file, cb) => {
    cb(null, nanoid() + path.extname(file.originalname))
  }
});

const upload = multer({storage});

router.get('/', async (req, res) => {
  const news = await mysqlDb.getConnection().query('SELECT `id`, `news_title`, `news_image`, `news_date` FROM `news`');
  res.send(news);
});

router.get('/:id', async (req, res) => {
  const newsSingle = await mysqlDb.getConnection().query('SELECT * from `news` WHERE `id` = ?', req.params.id);
  res.send(newsSingle[0]);
});

router.post('/', upload.single('news_image'), async (req, res) => {
  const newsData = req.body;

  if(req.file){
    newsData.news_image = req.file.filename;
  }

  await mysqlDb.getConnection().query(
    'INSERT INTO `news` (`news_title`, `news_content`, `news_image`) VALUES (?, ?, ?)',
    [newsData.news_title, newsData.news_content, newsData.news_image]
  );

  res.send(req.body.id);
});

router.delete('/:id', async (req, res) => {
  await mysqlDb.getConnection().query('DELETE FROM `news` WHERE `id` = ?', req.params.id);

  res.send(req.body.id);
});

module.exports = router;