module.exports = logger => ({
  parsingDidStart({ queryString }) {
    logger.gql(`Request:\n${queryString}`);
  },
  willSendResponse({ graphqlResponse }) {
    logger.gql(`Response:\n${graphqlResponse}}`);
  },
});
