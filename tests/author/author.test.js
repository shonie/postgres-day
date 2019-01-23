const test = require('ava');
const { query } = require('../macros');

test(
  'Author can save the article',
  query,
  'saveArticle',
  {
    variables: {
      title: 'An article on programming',
    },
  },
  (t, result) => t.is(!!result.data, true)
);
