const { DataSource } = require('apollo-datasource');
const bcrypt = require('bcrypt');

const BCRYPT_ROUNDS = 10;

class AuthAPI extends DataSource {
  static async checkPassword(plainPassword, hashedPassword) {
    return bcrypt.compare(plainPassword, hashedPassword);
  }

  constructor({ Author, jwt }) {
    super();

    this.Author = Author;

    this.jwt = jwt;
  }

  initialize(config) {
    this.context = config.context;
  }

  async createAccount({ email, password }) {
    const hashedPassword = await bcrypt.hash(password, BCRYPT_ROUNDS);

    const exists = await this.Author.findOne({
      where: {
        email,
      },
    });

    if (exists) {
      throw new Error('Author with this email already exists');
    }

    const author = this.Author.build({
      hashedPassword,
      email,
      nickname: email,
    });

    const { id } = await author.save();

    return this.jwt.signin()({ id });
  }

  async deleteAccount({ password, email }) {
    const author = await this.Author.findOne({
      where: {
        email,
      },
    });

    if (!author) {
      throw new Error('Account does not exist');
    }

    const passwordCorrect = AuthAPI.checkPassword(password, author.hashedPassword);

    if (!passwordCorrect) {
      throw new Error('Unauthorized');
    }

    const ok = this.Author.destroy({
      where: {
        email,
      },
    });

    return ok;
  }

  async login({ email, password }) {
    const author = await this.Author.findOne({
      where: {
        email,
      },
    });

    if (!author) {
      throw new Error('Account does not exist');
    }

    const passwordCorrect = await AuthAPI.checkPassword(password, author.hashedPassword);

    if (!passwordCorrect) {
      throw new Error('Unauthorized');
    }

    const { id } = author;

    return this.jwt.signin()({ id });
  }
}

module.exports = AuthAPI;
