const createQueryResolvers = require('./queries');
const createMutationResolvers = require('./mutations');
const createTypeResolvers = require('./types');

module.exports = ({ database, logger }) => ({
  ...createTypeResolvers({ database, logger }),
  Query: createQueryResolvers({ database, logger }),
  Mutation: createMutationResolvers({ database, logger }),
});
