const config = require('./config');

module.exports = {
  client: {
    service: {
      name: 'postgres-day',
      url: `http://${config.get('HOST')}:${config.get('PORT')}/api`,
    },
  },
};
