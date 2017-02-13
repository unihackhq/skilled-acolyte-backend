const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const env = require('../../env');

const sequelize = new Sequelize(env.DATABASE_URL, {
  host: env.PG_HOST,
  dialect: 'postgres',
});
const db = {};

fs
  .readdirSync(__dirname)
  .filter(file => (file.indexOf('.') !== 0) && (file !== 'index.js'))
  .forEach((file) => {
    const model = sequelize.import(path.join(__dirname, file));
    db[model.name] = model;
  });

Object.keys(db).forEach((modelName) => {
  if ('associate' in db[modelName]) {
    db[modelName].associate(db);
  }
});

/*
 * Relations
**/

db.User.belongsTo(db.Team);

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
