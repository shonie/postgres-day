const createRedisClient = require('./redis');
const createSequelizeClient = require('./sequelize');

module.exports = ({ config, logger }) => {
  const cache = createRedisClient({ logger, config });

  const storage = createSequelizeClient({ logger, config, basePath: __dirname });

  return {
    cache,
    storage,
    async authenticate() {
      return Promise.all([cache.authenticate(), storage.authenticate()]);
    },
    async close() {
      await Promise.all([cache.end(true), storage.connection.close()]);
    },
  };
};
