const { queriesById } = require('interfaces/graphql/persistedQueries');

/**
 * @description replace persisted query id by query body
 */
module.exports = (ctx, next) => {
  if (ctx.request.body && ctx.request.body.persistedQuery) {
    
    console.log('operationName', ctx.request.body.operationName);
  }
  return next();
};
