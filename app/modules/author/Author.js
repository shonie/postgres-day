module.exports = {
  articles: (author, _, { dataSources: { authorAPI } }) => authorAPI.getAuthorArticles(author.id),
};
