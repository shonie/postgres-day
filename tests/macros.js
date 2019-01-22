const fs = require('fs');
const path = require('path');
const util = require('util');
const { query, mutate } = require('./testServer');

const readFile = util.promisify(fs.readFile);

const QUERIES_BASE_PATH = path.resolve('infra/graphql/persistedQueries');

const isMutation = operationBody => operationBody.indexOf('mutation') !== -1;

exports.query = async (t, operationName, options, test, basePath = QUERIES_BASE_PATH) => {
  const opts = options instanceof Function ? options(t) : options;

  const { variables, ...operationOptions } = opts;

  const p = path.join(basePath, `${operationName}.gql`);

  try {
    const operationBody = await readFile(p, 'utf8').catch(err => {
      // eslint-disable-next-line no-console
      console.error(new Error(`Invalid persisted query path - ${p}, file not found`));
      throw err;
    });

    const operationIsMutation = isMutation(operationBody);

    const operation = operationIsMutation ? mutate : query;

    const pendingOperation = operation({
      [operationIsMutation ? 'mutation' : 'query']: operationBody,
      variables,
      ...operationOptions,
    });

    const result = await pendingOperation;

    return test(t, result, pendingOperation);
  } catch (err) {
    throw err;
  }
};
