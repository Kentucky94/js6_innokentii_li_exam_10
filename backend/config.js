const path = require('path');

const rootPath = __dirname;

module.exports = {
  rootPath,
  uploadPath: path.join(rootPath, 'public', 'uploads'),
  port: 8000,
  database: {
    user: 'user',
    password: 'Dorian1706$$$',
    host: 'localhost',
    database: 'ex_10_js6_innokentii_li',
  }
};