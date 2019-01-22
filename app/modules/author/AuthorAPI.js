const { DataSource } = require('apollo-datasource');

class AuthorAPI extends DataSource {
  constructor({ Author, Article }) {
    super();

    this.Author = Author;

    this.Article = Article;
  }

  initialize(config) {
    this.context = config.context;
  }

  async saveArticle() {
    return this.Article;
  }

  async getAuthorById(id) {
    return this.Author.findByPk(id);
  }

  async getAllAuthors() {
    return this.Author.findAll();
  }
}

module.exports = AuthorAPI;
