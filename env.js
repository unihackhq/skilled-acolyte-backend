const config = require('konfig')();

const APP = config.app;
const DB = config.db;

module.exports = {
  // API Information
  API_HOST: APP.host,
  API_PORT: APP.port,
  API_VERSION: APP.version,
  API_URL_VERSION: APP.url_version,

  // JWT
  JWT_KEY: APP.JWT_KEY,
  SEND_EMAIL: APP.send_email,

  // PG Information
  PG_HOST: DB.host,
  PG_PORT: DB.port,
  PG_USER: DB.username,
  PG_PASSWORD: DB.password,
  PG_DATABASE: DB.database,
  DATABASE_URL: `postgres://${DB.username}:${DB.password}@${DB.host}:${DB.port}/${DB.database}`,

  // Keys
  POSTMARK_CLIENT_KEY: APP.POSTMARK_CLIENT_KEY,
  EVENTBRITE_TOKEN: APP.EVENTBRITE_TOKEN,

  // ENV Information
  TESTING: process.env.NODE_ENV === 'test',
  DEV: process.env.NODE_ENV === 'dev' || false,

  // EVENTBRITE
  EVENTBRITE_QUESTION_IDS: APP.eventbrite_questions,
};
