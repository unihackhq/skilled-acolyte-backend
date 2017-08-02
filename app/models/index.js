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

// =============================================================================
// ASSOCIATION DEFINITIONS
// =============================================================================
// Each student is a user (though not every user is a student). Each student
// also belongs to a University.
db.Student.hasOne(db.User, {
  foreignKey: 'id',
  targetKey: 'id',
  as: 'user',
});

// Each ticket belongs to a student - either as the original or current ticket
// holder
db.Ticket.belongsTo(db.Student, { as: 'originalStudent' });
db.Ticket.belongsTo(db.Student, { as: 'currentStudent' });

// An event can have as many teams. A team can only 'belong' to an event. Hence
// the use of a One-to-many association.
db.Event.hasMany(db.Team, { as: 'Teams' });

// A team can have many students. A student can be in many teams. Hene the
// Belongs to Many association.
// PART A: Members and Teams
db.Team.belongsToMany(db.Student, {
  through: {
    model: db.TeamAssignment,
    scope: {
      invited: false,
    },
    unique: false,
  },
  foreignKey: 'teamId',
  as: 'members',
});
db.Student.belongsToMany(db.Team, {
  through: {
    model: db.TeamAssignment,
    scope: {
      invited: false,
    },
    unique: false,
  },
  foreignKey: 'studentId',
  as: 'teams',
});
// PART B: Invitations Logic
db.Team.belongsToMany(db.Student, {
  through: {
    model: db.TeamAssignment,
    scope: {
      invited: true,
    },
    unique: false,
  },
  foreignKey: 'teamId',
  as: 'invited',
});
db.Student.belongsToMany(db.Team, {
  through: {
    model: db.TeamAssignment,
    scope: {
      invited: true,
    },
    unique: false,
  },
  foreignKey: 'studentId',
  as: 'teams',
});

// =============================================================================
// SCOPES
// =============================================================================
// This reduces displaying the User Information to name and email when displaying
// Student record.
db.Student.addScope('defaultScope', {
  include: [
    {
      model: db.User,
      as: 'userInformation',
      attributes: ['firstName', 'lastName', 'preferredName', 'email'],
    },
  ],
}, { override: true });

// This masks users who are
db.User.addScope('defaultScope', {
  where: {
    deactivated: false,
  },
  attributes: {
    exclude: ['authId', 'accessToken'],
  },
}, { override: true });

// Define Sequelize objects
db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
