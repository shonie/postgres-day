const config = require('config');
const { createContainer, asFunction, asValue } = require('awilix');
const server = require('src/infra/http/server');
const apollo = require('src/infra/graphql');
const logger = require('src/infra/logger');
const database = require('src/infra/db');

const container = createContainer();

// Inject dependencies!
container.register({
  server: asFunction(server).singleton(),
  apollo: asFunction(apollo).singleton(),
  config: asValue(config),
  logger: asFunction(logger).singleton(),
  database: asFunction(database).singleton(),
});

module.exports = container;
