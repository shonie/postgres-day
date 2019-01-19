const { src } = require('gulp');
const ava = require('gulp-ava');

module.exports = () => src('../tests/**/*.test.js').pipe(ava({ verbose: true }));
