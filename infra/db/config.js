const config = require('config');
const parseDbUrl = require('parse-database-url');

const { user: username, password, database, host, port, driver } = parseDbUrl(config.get('DATABASE_URL'));

const cfg = {
  password,
  database,
  host,
  port,
  username,
  dialect: driver,
  dialectOptions: {
    ssl: true,
  },
};

module.exports = {
  test: cfg,
  development: cfg,
  production: cfg,
};
