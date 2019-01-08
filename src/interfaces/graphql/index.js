const { ApolloServer } = require('apollo-server-koa');
const fs = require('fs');
const path = require('path');
const createAuthorsRepository = require('../../infra/repositories/author');
const authorApp = require('../../app/author');
const createLoggerExtension = require('./extensions/logger');

const typeDefs = fs.readFileSync(path.join(__dirname, 'schema.gql'), {
  encoding: 'utf-8',
});

module.exports = ({ database, logger }) => {
  const authorsRepository = createAuthorsRepository(database.sequelize.models.author);

  const resolvers = {
    Likeable: {
      __resolveType(obj) {
        if (obj.nickname) {
          return 'Author';
        }

        if (obj.title) {
          return 'Topic';
        }

        if (obj.text) {
          return 'Comment';
        }

        return null;
      },
    },
    Query: {
      topics: () => [
        {
          id: '1',
          title: 'Vasya pupkin story',
          likes: [],
        },
      ],
      author: () => authorApp.getById({ authorsRepository }),
      authors: () => authorApp.getAll({ authorsRepository }),
    },
    Mutation: {
      signUp: (_, { signUpInput: { email, password } }) => {
        logger.info(email, password);
      },
      signIn: (_, { signInInput: { email, password } }) => {
        logger.info(email, password);
      },
    },
  };

  return new ApolloServer({
    typeDefs,
    resolvers,
    extensions: [() => createLoggerExtension(logger)],
  });
};
