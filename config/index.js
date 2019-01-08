require('dotenv').config();
const nconf = require('nconf');
const path = require('path');

nconf
  .argv()
  .env()
  .file({ file: path.join(__dirname, './config.json') })
  .defaults({
    PORT: 8080,
    HOST: '0.0.0.0',
  });

module.exports = nconf;
