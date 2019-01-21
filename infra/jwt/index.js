const jwt = require('jsonwebtoken');
const { compose, trim, replace, partialRight } = require('lodash');

module.exports = ({ config }) => ({
  verify: (options = {}) => token => jwt.verify(token, config.get('JWT_SECRET'), options),
  signin: (options = {}) => payload => {
    const opt = {
      ...options,
      expiresIn: '1h',
    };

    return jwt.sign(payload, config.get('JWT_SECRET'), opt);
  },
  decode: (options = {}) => token => {
    const decodeToken = compose(
      partialRight(jwt.decode, [options]),
      trim,
      replace(/JWT|jwt/g, '')
    );

    return decodeToken(token);
  },
});
