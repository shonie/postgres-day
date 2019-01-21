const config = require('config');
const { createTestClient } = require('apollo-server-testing');
const createApollo = require('src/infra/graphql');
const createLogger = require('src/infra/logger');
const createDatabase = require('src/infra/db');

const logger = createLogger();

logger.silent = true;

const database = createDatabase({ logger, config });

module.exports = createTestClient(createApollo({ config, logger, database }));
