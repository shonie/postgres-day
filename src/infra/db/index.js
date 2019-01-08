const createRedisClient = require('./redis');
const createSequelizeClient = require('./sequelize');

module.exports = ({ config, logger }) => {
  const redis = createRedisClient({ logger, config });
  const sequelize = createSequelizeClient({ logger, config, basePath: __dirname });
  return {
    redis,
    sequelize,
    async authenticate() {
      return Promise.all([redis.authenticate(), sequelize.authenticate()]);
    },
    async close() {
      await Promise.all([redis.end(true), sequelize.connection.close()]);
    },
  };
};
