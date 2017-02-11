const config = require('konfig')();

module.exports = {
  // API Information
  API_HOST: config.app.host,
  API_PORT: config.app.port,
  API_VERSION: config.app.version,
  API_URL_VERSION: config.app.url_version,

  // PG Information
  PG_HOST: config.db.host,
  PG_PORT: config.db.port,
  PG_USER: config.db.username,
  PG_PASSWORD: config.db.password,
  PG_DATABASE: config.db.database,
  DATABASE_URL: `postgres://${exports.PG_USER}:${exports.PG_PASSWORD}@${exports.PG_HOST}:${exports.PG_PORT}/${exports.PG_DATABASE}`,

  // ENV Information
  TESTING: process.env.TESTING === true || process.env.TESTING === 'true',
  DEV: process.env.DEV || false,
};
