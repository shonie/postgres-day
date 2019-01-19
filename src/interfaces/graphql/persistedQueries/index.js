const { invert } = require('lodash');
const idsByQuery = require('./config.json');

const queriesById = invert(idsByQuery);

module.exports = {
  idsByQuery,
  queriesById,
};
