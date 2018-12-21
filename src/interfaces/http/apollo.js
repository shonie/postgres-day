const { ApolloServer } = require('apollo-server-koa');
const fs = require('fs');
const path = require('path');

const typeDefs = fs.readFileSync(path.join(__dirname, 'schema.gql'), {
  encoding: 'utf-8',
});

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
    author: () => 'Vasya pupkin!',
    authors: () => ['Vasya pupkin'],
  },
};

module.exports = () => new ApolloServer({ typeDefs, resolvers });
