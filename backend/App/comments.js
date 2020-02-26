const express = require('express');

const mysqlDb = require('../mysqlDb');

const router = express.Router();

router.get('/', async (req, res) => {
  const comments = await mysqlDb.getConnection().query('SELECT * from `comments`');

  res.send(comments);
});

router.get('/:id', async (req, res) => {
  const comments = await mysqlDb.getConnection().query('SELECT * from `comments` WHERE `news_id` = ?', req.params.id);

  res.send(comments);
});

router.post('/', async (req, res) => {
  const commentData = req.body;

  await mysqlDb.getConnection().query(
    'INSERT INTO `comments` (`news_id`, `comment_author`, `comment_text`) VALUES (?, ?, ?)',
    [commentData.news_id, commentData.comment_author, commentData.comment_text]
  );

  res.send(req.body.id);
});

router.delete('/:id', async (req, res) => {
  await mysqlDb.getConnection().query('DELETE FROM `comments` WHERE `id` = ?', req.params.id);

  res.send(req.body.id);
});

module.exports = router;