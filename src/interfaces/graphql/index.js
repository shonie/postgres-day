const { ApolloServer } = require('apollo-server-koa');
const fs = require('fs');
const path = require('path');
const { RedisCache } = require('apollo-server-redis');
const parseDbUrl = require('parse-database-url');
const createResolvers = require('./resolvers');
const createLoggerExtension = require('./extensions/logger');
const { idsByQuery: persistedQueries } = require('./persistedQueries');

const typeDefs = fs.readFileSync(path.join(__dirname, 'schema.graphql'), {
  encoding: 'utf-8',
});

module.exports = ({ logger, database, config }) =>
  new ApolloServer({
    typeDefs,
    resolvers: createResolvers({ database }),
    extensions: [() => createLoggerExtension(logger)],
    persistedQueries,
    cacheControl: true,
    engine: {
      apiKey: config.get('ENGINE_API_KEY'),
    },
    cache: new RedisCache({
      connectTimeout: 5000,
      reconnectOnError(err) {
        logger.info('Reconnect on error', err);

        const targetError = 'READONLY';

        if (err.message.slice(0, targetError.length) === targetError) {
          // Only reconnect when the error starts with "READONLY"
          return true;
        }
        return false;
      },
      retryStrategy(times) {
        logger.info('Redis Retry', times);

        if (times >= 3) {
          return undefined;
        }

        const delay = Math.min(times * 50, 2000);

        return delay;
      },
      socket_keepalive: false,
      ...parseDbUrl(config.get('REDIS_URL')),
    }),
  });
