module.exports = ({ database: { storage } }) => ({
  topics: () => storage.models.topic.findAll(),
  author: (_, { id }) => storage.models.author.findByPk(id),
  authors: () => storage.models.author.findAll(),
});
