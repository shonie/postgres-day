const Koa = require('koa');
const loggerWinston = require('koa-logger-winston');
const http = require('http');
const bodyParser = require('koa-bodyparser');

module.exports = ({ config, logger, apollo }) => {
  const host = config.get('HOST');
  const port = config.get('PORT');

  const app = new Koa()
    .use(loggerWinston(logger))
    .use(bodyParser())
    .on('error', err => {
      logger.error('Application error: ', err);
    });

  apollo.applyMiddleware({ app });

  return {
    app,
    start: () =>
      new Promise(resolve => {
        http.createServer(app.callback()).listen(port, host, function listener() {
          // `this` refers to the http server here
          const { address, port: adressPort } = this.address();
          const hostPort = `http://${address}:${adressPort}`;
          logger.info(`Listening on ${hostPort}...`);
          logger.info(`GraphQL endpoint: ${hostPort}${apollo.graphqlPath}`);
          resolve();
        });
      }),
  };
};
