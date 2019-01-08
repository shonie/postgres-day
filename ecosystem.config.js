module.exports = {
  apps: [
    {
      name: 'postgres-day',
      script: 'index.js',
      mode: 'cluster',
      instances: 'max',
      autorestart: true,
      watch: ['src'],
      watchIgnore: ['node_modules'],
      max_memory_restart: '1G',
      env: {
        NODE_ENV: 'development',
      },
      env_production: {
        NODE_ENV: 'production',
      },
    },
  ],
};
