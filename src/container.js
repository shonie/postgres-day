const { createContainer, asFunction, asValue } = require('awilix');
const app = require('./app');
const server = require('./interfaces/http/server');
const apollo = require('./interfaces/graphql');
const logger = require('./infra/logger');
const database = require('./infra/db');
const config = require('../config');

const container = createContainer();

// Inject dependencies!
container.register({
  app: asFunction(app).singleton(),
  server: asFunction(server).singleton(),
  apollo: asFunction(apollo).singleton(),
  config: asValue(config),
  logger: asFunction(logger).singleton(),
  database: asFunction(database).singleton(),
});

module.exports = container;
