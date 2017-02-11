exports.API_HOST = 'localhost';
exports.API_PORT = "3000";
exports.API_VERSION = '1.0.0';
exports.API_URL_VERSION = '1';
exports.TESTING = process.env.TESTING === true || process.env.TESTING === 'true';
exports.PG_HOST = process.env.PG_HOST || 'localhost';
exports.PG_PORT = process.env.PG_PORT || '5432';
exports.PG_PASSWORD = process.env.PG_PASSWORD || '';
exports.PG_USER = process.env.PG_USER || '';
exports.PG_DATABASE = process.env.PG_DATABASE || 'skilled_acolyte_db';

exports.DATABASE_URL = `postgres://${exports.PG_USER}:${exports.PG_PASSWORD}@${exports.PG_HOST}:${exports.PG_PORT}/${exports.PG_DATABASE}`;

exports.DEV = process.env.DEV || false;
