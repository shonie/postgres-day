const { ApolloServer } = require('apollo-server-koa');
const fs = require('fs');
const path = require('path');
const createResolvers = require('./resolvers');
const createLoggerExtension = require('./extensions/logger');

const typeDefs = fs.readFileSync(path.join(__dirname, 'schema.gql'), {
  encoding: 'utf-8',
});

module.exports = ({ logger, database }) =>
  new ApolloServer({
    typeDefs,
    resolvers: createResolvers({ database }),
    extensions: [() => createLoggerExtension(logger)],
  });
