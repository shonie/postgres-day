const { spawn } = require('child_process');
const { resolve } = require('path');
const { parallel } = require('gulp');

const bootstrap = done => {
  process.env.NODE_PATH = resolve(__dirname, '..', 'src');

  const server = spawn('node', [resolve(__dirname, '..', 'index.js')]);

  server.stdout.pipe(process.stdout);

  server.stderr.pipe(process.stderr);

  server.on('error', err => {
    console.error('Server error:', err);
    done(err);
  });

  server.on('close', code => {
    console.log(`Server process exited with code ${code}`);
    done();
  });

  server.on('message', msg => {
    console.log(msg);
    if (msg === 'ready') {
      done();
    }
  });
};

module.exports = parallel(bootstrap);
