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
  SLACK_WEBHOOK_URL: app.slack_webhook_url,
  BEAMS_INSTANCE_ID: app.beams_instance_id,
  BEAMS_SECRET_KEY: app.beams_secret_key,
  VAPID_PUBLIC_KEY: app.vapid_public_key,
  VAPID_PRIVATE_KEY: app.vapid_private_key,

  // ENV Information
  TESTING: process.env.NODE_ENV === 'test',
  DEV: process.env.NODE_ENV === 'dev',
  PROD: process.env.NODE_ENV === 'docker',

  // Postmark
  FROM_EMAIL: app.from_email,
  POSTMARK_TEMPLATE: app.postmark_template,
  FRONTEND_URL: app.frontend_url,
  ADMIN_EMAIL: app.admin_email,
  IOS_PREFIX: app.ios_prefix,
  VAPID_EMAIL: app.vapid_email,
};
