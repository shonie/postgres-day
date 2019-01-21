const bcrypt = require('bcrypt');

const BCRYPT_ROUNDS = 10;

const checkPassword = (plainPassword, hashedPassword) => bcrypt.compare(plainPassword, hashedPassword);

module.exports = ({
  database: {
    storage: { models },
  },
  jwt,
}) => ({
  async createAccount(
    _,
    {
      accountInput: { email, password },
    }
  ) {
    const hashedPassword = await bcrypt.hash(password, BCRYPT_ROUNDS);

    const exists = await models.author.findOne({
      where: {
        email,
      },
    });

    if (exists) {
      throw new Error('Author with this email already exists');
    }

    const author = models.author.build({
      hashedPassword,
      email,
      nickname: email,
    });

    const { id } = await author.save();

    return jwt.signin()({ id });
  },

  async deleteAccount(
    _,
    {
      accountInput: { password, email },
    }
  ) {
    const author = await models.author.findOne({
      where: {
        email,
      },
    });

    if (!author) {
      throw new Error('Account does not exist');
    }

    const passwordCorrect = checkPassword(password, author.hashedPassword);

    if (!passwordCorrect) {
      throw new Error('Unauthorized');
    }

    const ok = models.author.destroy({
      where: {
        email,
      },
    });

    return ok;
  },

  async login(
    _,
    {
      accountInput: { email, password },
    }
  ) {
    const author = await models.author.findOne({
      where: {
        email,
      },
    });

    if (!author) {
      throw new Error('Account does not exist');
    }

    const passwordCorrect = checkPassword(password, author.hashedPassword);

    if (!passwordCorrect) {
      throw new Error('Unauthorized');
    }

    const { id } = author;

    return jwt.signin()({ id });
  },
});
