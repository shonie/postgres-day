require('config');
const test = require('ava');
const { query } = require('../macros');

const NEW_USER = { password: 'foo', email: 'foo@bar.co' };

test.serial(
  'Create account with email and password',
  query,
  'createAccount',
  {
    accountInput: NEW_USER,
  },
  (t, res) => {
    // eslint-disable-next-line no-param-reassign
    t.context.token = res.data;

    return t.true(!!res.data);
  }
);

test.serial(
  'Does not create account if it exists',
  query,
  'createAccount',
  {
    accountInput: NEW_USER,
  },
  (t, res) => t.is(res.errors.length, 1)
);

test.serial(
  'Logins with email and password',
  query,
  'login',
  {
    accountInput: NEW_USER,
  },
  (t, res) => t.true(!!res.data)
);

test.serial(
  'Deletes account',
  query,
  'deleteAccount',
  {
    accountInput: NEW_USER,
  },
  (t, res) => t.is(!!res.data, true)
);
