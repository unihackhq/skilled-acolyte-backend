const config = require('konfig')();

const { app, db } = config;

module.exports = {
  // API Information
  API_HOST: app.host,
  API_PORT: app.port,
  API_VERSION: app.version,
  API_URL_VERSION: app.url_version,

  // JWT
  JWT_KEY: app.jwt_key,
  SEND_EMAIL: app.send_email,

  // PG Information
  PG_HOST: db.host,
  PG_PORT: db.port,
  PG_USER: db.username,
  PG_PASSWORD: db.password,
  PG_DATABASE: db.database,
  DATABASE_URL: `postgres://${db.username}:${db.password}@${db.host}:${db.port}/${db.database}`,

  // Keys
  POSTMARK_CLIENT_KEY: app.postmark_client_key,
  EVENTBRITE_TOKEN: app.eventbrite_token,

  // ENV Information
  TESTING: process.env.NODE_ENV === 'test',
  DEV: process.env.NODE_ENV === 'dev',
  PROD: process.env.NODE_ENV === 'docker',

  // Eventbrite
  EVENTBRITE_QUESTION_IDS: app.eventbrite_questions,

  // Postmark
  FROM_EMAIL: app.from_email,
  POSTMARK_TEMPLATE: app.postmark_template,
  FRONTEND_URL: app.frontend_url,
};
