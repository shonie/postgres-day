const test = require('ava');
const { createTestClient } = require('apollo-server-testing');
const container = require('../../src/container');

const apollo = container.resolve('apollo');

const { mutate } = createTestClient(apollo);

test('Signs up with email and password', async t => {
  const mutation = `
        mutation signUp($signUpInput: AuthInput!) {
            signUp(signUpInput: $signUpInput)
        }      
    `;

  const result = await mutate({
    mutation,
    variables: { signUpInput: { password: 'foo', email: 'nancy3@foo.co' } },
  });

  t.true(!!result.data.signUp, true);
});
