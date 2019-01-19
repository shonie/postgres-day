const bcrypt = require('bcrypt');

module.exports = ({
  logger,
  database: {
    storage: { models },
  },
}) => ({
  signUp: async (_, { signUpInput: { email, password } }) => {
    const hashedPassword = await bcrypt.hash(password, 10);

    const exists = await models.author.findOne({
      where: {
        email,
      },
    });

    if (exists) {
      throw new Error('User with this email already exists, maybe it is you?');
    }

    const user = models.author.build({
      hashedPassword,
      email,
      nickname: email,
    });

    const { id } = await user.save();

    return id;
  },
  signIn: (_, { signInInput: { email, password } }) => {
    logger.info(email, password);
  },
});
