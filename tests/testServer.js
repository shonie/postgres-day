const { createTestClient } = require('apollo-server-testing');
const container = require('../src/container');

const apollo = container.resolve('apollo');

module.exports = createTestClient(apollo);
