require('config');
const test = require('ava');
const { query } = require('../macros');

const NEW_USER = { password: 'foo', email: 'foo@bar.baz' };

const variables = {
  accountInput: NEW_USER,
};

test.serial(
  'Create account with email and password',
  query,
  'createAccount',
  {
    variables,
  },
  (t, res) => {
    if (res.data) {
      // eslint-disable-next-line no-param-reassign
      t.context.token = res.data.createAccount;
    }

    return t.true(!!res.data);
  }
);

test.serial(
  'Does not create account if it exists',
  query,
  'createAccount',
  {
    variables,
  },
  (t, res) => t.is(res.errors.length, 1)
);

test.serial(
  'Logins with email and password',
  query,
  'login',
  {
    variables,
  },
  (t, res) => t.true(!!res.data) && t.context.token === res.data.login
);

test.serial(
  'Does not login with incorrect email',
  query,
  'login',
  {
    variables: {
      accountInput: {
        ...NEW_USER,
        email: 'invalid@badmail.co',
      },
    },
  },
  (t, res) => t.is(res.errors.length, 1) && t.is(res.data, null)
);

test.serial(
  'Does not login with incorrect password',
  query,
  'login',
  {
    variables: {
      accountInput: {
        ...NEW_USER,
        password: 'invalid_password',
      },
    },
  },
  (t, res) => t.is(res.errors.length, 1) && t.is(res.data, null)
);

test.serial(
  'Deletes account',
  query,
  'deleteAccount',
  {
    variables,
  },
  (t, res) => t.is(!!res.data, true)
);
