// const { queriesById } = require('infra/graphql/persistedQueries');

/**
 * @description replace persisted query id by query body
 */
module.exports = (ctx, next) => {
  if (ctx.request.body && ctx.request.body.persistedQuery) {
    // eslint-disable-next-line no-console
    console.log('operationName', ctx.request.body.operationName);
  }
  return next();
};
