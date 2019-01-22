const auth = require('app/modules/auth');
const author = require('app/modules/author');
const Likeable = require('app/modules/likeable');
const { mergeResolvers } = require('./util');

module.exports = {
  Query: mergeResolvers(author.Query),
  Mutation: mergeResolvers(auth.Mutation),
  Likeable,
};
