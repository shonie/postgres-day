const redis = require('redis');

module.exports = ({ logger, config }) => {
  const URL = config.get('REDIS_URL');

  return {
    redis,
    authenticate: () => {
      const client = redis.createClient(URL);

      return new Promise((resolve, reject) => {
        client.on('connect', () => {
          logger.info(`Redis connection established: ${URL}`);
          resolve();
        });

        client.on('error', err => {
          logger.info(`Redis connection error: ${err}`);
          reject();
        });
      });
    },
  };
};
