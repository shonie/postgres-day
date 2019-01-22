const Koa = require('koa');
const loggerWinston = require('koa-logger-winston');
const http = require('http');
const bodyParser = require('koa-bodyparser');
const persistedQueriesMiddleware = require('./middlewares/persistedQueries');

module.exports = ({ config, logger, apollo: apolloFactory, database }) => {
  const host = config.get('HOST');
  const port = config.get('PORT');

  const app = new Koa()
    .use(loggerWinston(logger))
    .use(bodyParser())
    .use(persistedQueriesMiddleware)
    .on('error', err => {
      logger.error(err);
    });

  const apollo = apolloFactory();

  apollo.applyMiddleware({ app, path: '/api' });

  return {
    app,
    start: () =>
      new Promise(resolve => {
        const server = http.createServer(app.callback()).listen(port, host, () => {
          // `this` refers to the http server here
          const { address, port: adressPort } = server.address();

          const hostPort = `http://${address}:${adressPort}`;

          logger.info(`Listening on ${hostPort}...`);

          logger.info(`GraphQL endpoint: ${hostPort}${apollo.graphqlPath}`);

          if (process.send) {
            // notify master about readiness
            process.send('ready');
          }

          process.on('message', msg => {
            if (msg === 'shutdown') {
              logger.info('Closing all connections...');
              setTimeout(() => {
                logger.info('Finished closing connections');
                process.exit(0);
              }, 1500);
            }
          });

          process.on('SIGINT', () => {
            logger.info('SIGINT signal received.');

            // Stops the server from accepting new connections and finishes existing connections.
            server.close(async err => {
              // if error, log and exit with error (1 code)
              if (err) {
                logger.error(err);
                process.exit(1);
              }

              logger.info('Closing database connections...');
              // close database connection and exit with success (0 code)
              await database.close();

              process.exit(0);
            });
          });
          resolve();
        });
      }),
  };
};
