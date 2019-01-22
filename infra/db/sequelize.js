const Sequelize = require('sequelize');
const fs = require('fs');
const path = require('path');

module.exports = ({ logger, config, basePath }) => {
  const URL = config.get('DATABASE_URL');

  const sequelize = new Sequelize(URL, {
    dialect: 'postgres',
    dialectOptions: {
      ssl: true,
    },
    logging: logger.info,
    operatorsAliases: Sequelize.Op,
  });

  const models = {};

  const dir = path.join(basePath, './models');

  fs.readdirSync(dir).forEach(file => {
    const modelDir = path.join(dir, file);
    const model = sequelize.import(modelDir);
    models[model.name] = model;
  });

  Object.keys(models).forEach(key => {
    if ('associate' in models[key]) {
      models[key].associate(models);
    }
  });

  return {
    models,
    Sequelize,
    authenticate: () =>
      sequelize
        .authenticate()
        .then(() => {
          logger.info(`PostgreSQL connection established: ${URL}`);
        })
        .catch(err => {
          logger.error(`PostgreSQL connection error: ${err}`);
          throw err;
        })
        .then(() => sequelize.sync())
        .catch(err => {
          logger.error(`PostgreSQL failed to create tables: ${err}`);
        }),
  };
};
