const test = require('ava');
const { mutate } = require('../testServer');

test('Signs up with email and password', async t => {
  const mutation = `
        mutation signUp($signUpInput: AuthInput!) {
            signUp(signUpInput: $signUpInput)
        }      
    `;

  const result = await mutate({
    mutation: {
      id: '1',
    },
    variables: { signUpInput: { password: 'foo', email: 'nancy3@foo.co' } },
  });

  t.true(!!result.data.signUp);
});
