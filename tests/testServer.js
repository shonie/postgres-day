const config = require('config');
const { createTestClient } = require('apollo-server-testing');
const createApolloFactory = require('infra/graphql');
const createLogger = require('infra/logger');
const createDatabase = require('infra/db');

const logger = createLogger();

logger.silent = true;

const database = createDatabase({ logger, config });

const apolloFactory = createApolloFactory({ config, logger, database });

delete process.env.ENGINE_API_KEY;

const apollo = apolloFactory({
  engine: {
    apiKey: null,
  },
  context: () => ({
    request: {
      headers: {
        authorization: 'foo',
      },
    },
    user: {
      email: 'test@test.com',
      id: 'cbe88576-1791-4c17-bc25-6fa86eb51102',
    },
  }),
});

module.exports = createTestClient(apollo);
