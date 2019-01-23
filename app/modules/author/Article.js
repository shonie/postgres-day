module.exports = {
  author: (article, _, { dataSources: { authorAPI } }) => authorAPI.getAuthorById(article.author),
};
