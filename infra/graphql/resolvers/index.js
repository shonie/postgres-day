const createQueryResolvers = require('./Query');
const createMutationResolvers = require('./Mutation');
const createTypeResolvers = require('./Types');

module.exports = ({ database, logger, jwt, ...rest }) => ({
  ...createTypeResolvers({ database, logger, jwt, ...rest }),
  Query: createQueryResolvers({ database, logger, jwt, ...rest }),
  Mutation: createMutationResolvers({ database, logger, jwt, ...rest }),
});
