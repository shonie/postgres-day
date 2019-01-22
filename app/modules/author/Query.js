module.exports = {
  author: (_, { id }, { dataSources: { authorAPI } }) => authorAPI.getAuthorById(id),
  authors: (_, __, { dataSources: { authorAPI } }) => authorAPI.getAllAuthors(),
};
