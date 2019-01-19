const createQueryResolvers = require('./Query');
const createMutationResolvers = require('./Mutation');
const createTypeResolvers = require('./Types');

module.exports = ({ database, logger }) => ({
  ...createTypeResolvers({ database, logger }),
  Query: createQueryResolvers({ database, logger }),
  Mutation: createMutationResolvers({ database, logger }),
});
