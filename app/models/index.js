const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const env = require('../../env');

const sequelize = new Sequelize(env.DATABASE_URL, {
  host: env.PG_HOST,
  dialect: 'postgres',
  logging: env.DEV ? console.log : false,
  // to get rid of the annoying message on startup
  operatorsAliases: false,
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
// Each student is a user (though not every user is a student).
db.Student.belongsTo(db.User, {
  foreignKey: 'id',
  targetKey: 'id',
  as: 'user'
});
// Each student also belongs to a University.
db.Student.belongsTo(db.University, { as: 'university', foreignKey: 'universityId' });

// Users get tokens for login
db.Token.belongsTo(db.User, { as: 'user', foreignKey: 'userId' });
db.User.hasMany(db.Token, { as: 'tokens', foreignKey: 'userId' });

// Each ticket belongs to a student
db.Ticket.belongsTo(db.Student, { as: 'student', foreignKey: 'studentId' });
db.Student.hasMany(db.Ticket, { as: 'tickets', foreignKey: 'studentId' });

// Each ticket is for an event
db.Ticket.belongsTo(db.Event, { as: 'event', foreignKey: 'eventId' });
db.Event.hasMany(db.Ticket, { as: 'tickets', foreignKey: 'eventId' });

// An event can have as many teams. A team can only 'belong' to an event. Hence
// the use of a One-to-many association.
db.Event.hasMany(db.Team, { as: 'teams', foreignKey: 'eventId' });

// A team can have many students. A student can be in many teams. Hence the
// Belongs to Many association.
// PART A: Members and Teams
db.Team.belongsToMany(db.Student, {
  through: {
    model: db.TeamAssignment,
    scope: { invited: false },
    unique: false
  },
  foreignKey: 'teamId',
  as: 'members'
});
db.Student.belongsToMany(db.Team, {
  through: {
    model: db.TeamAssignment,
    scope: { invited: false },
    unique: false
  },
  foreignKey: 'studentId',
  as: 'teams'
});
// PART B: Invitations Logic
db.Team.belongsToMany(db.Student, {
  through: {
    model: db.TeamAssignment,
    scope: { invited: true },
    unique: false
  },
  foreignKey: 'teamId',
  as: 'invited'
});
db.Student.belongsToMany(db.Team, {
  through: {
    model: db.TeamAssignment,
    scope: { invited: true },
    unique: false
  },
  foreignKey: 'studentId',
  as: 'invites'
});

// Events have many schedule items
db.Event.hasMany(db.ScheduleItem, { as: 'schedule', foreignKey: 'eventId' });
db.ScheduleItem.belongsTo(db.Event, { as: 'event', foreignKey: 'eventId' });

// Events have notification subscriptions
db.Event.hasMany(db.NotificationSubscription, { as: 'notificationSubscriptions', foreignKey: 'eventId' });
db.NotificationSubscription.belongsTo(db.Event, { as: 'event', foreignKey: 'eventId' });
// Notification subscriptions belongs to a studnet
db.Student.hasMany(db.NotificationSubscription, { as: 'notificationSubscriptions', foreignKey: 'studentId' });
db.NotificationSubscription.belongsTo(db.Student, { as: 'student', foreignKey: 'studentId' });

// =============================================================================
// SCOPES
// =============================================================================
// Exclude deactivated students
db.Student.addScope('defaultScope', {
  include: [
    {
      model: db.User,
      as: 'user',
      where: { deactivated: false },
    },
    { model: db.University, as: 'university' },
  ],
}, { override: true });
// Exclude deactivated users
db.User.addScope('defaultScope', {
  where: { deactivated: false },
}, { override: true });

// Some default nestings
db.Ticket.addScope('defaultScope', {
  include: [
    { model: db.Event, as: 'event' },
    { model: db.Student, as: 'student' },
  ],
}, { override: true });
db.Team.addScope('defaultScope', {
  include: [
    { as: 'members', model: db.Student },
    { as: 'invited', model: db.Student },
  ],
}, { override: true });
db.ScheduleItem.addScope('defaultScope', {
  include: [{ as: 'event', model: db.Event }],
}, { override: true });

db.sequelize = sequelize;
module.exports = db;
