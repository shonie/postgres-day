const { task } = require('gulp');
const bootstrap = require('./tasks/bootstrap');
const tests = require('./tasks/tests');

task('bootstrap', bootstrap);

task('tests', tests);
