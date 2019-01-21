const config = require('config');
const { createTestClient } = require('apollo-server-testing');
const createApollo = require('infra/graphql');
const createLogger = require('infra/logger');
const createDatabase = require('infra/db');

const logger = createLogger();

logger.silent = true;

const database = createDatabase({ logger, config });

module.exports = createTestClient(createApollo({ config, logger, database }));
