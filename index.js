const container = require('./src');

const db = container.resolve('database');
const server = container.resolve('server');

db.authenticate().then(server.start);
