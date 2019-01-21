const { pick } = require('ramda');

const formatResponse = res => JSON.stringify(pick(['data'], res), null, 2);

module.exports = logger => ({
  parsingDidStart({ queryString }) {
    logger.gql(`Request:\n${queryString}`);
  },
  willSendResponse({ graphqlResponse }) {
    logger.gql(`Response:\n${formatResponse(graphqlResponse)}}`);
  },
});
