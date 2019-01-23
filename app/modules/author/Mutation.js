module.exports = {
  saveArticle: async (_, { articleInput }, { user, dataSources }) =>
    dataSources.authorAPI.saveArticle({ ...articleInput, author: user.id }),
};
