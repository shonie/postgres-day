const winston = require('winston');

const levels = {
  ...winston.config.npm.levels,
  gql: 4,
};

const colors = {
  ...winston.config.npm.colors,
  gql: 'bold magenta',
};

const format = winston.format.combine(
  winston.format.colorize(),
  winston.format.timestamp(),
  winston.format.align(),
  winston.format.printf(info => {
    const { timestamp, level, message } = info;

    const ts = timestamp.slice(0, 19).replace('T', ' ');
    return `${ts} [${level}]: ${message}`;
  })
);

const logger = winston.createLogger({
  levels,
  level: 'info',
  transports: [
    new winston.transports.File({ colors, levels, format, filename: 'logs/error.log', level: 'error' }),
    new winston.transports.File({ colors, levels, format, filename: 'logs/combined.log' }),
  ],
});

if (process.env.NODE_ENV !== 'production') {
  logger.add(
    new winston.transports.Console({
      format,
      colors,
      levels,
      level: 'silly',
    })
  );
}

winston.addColors(colors);

module.exports = () => logger;
