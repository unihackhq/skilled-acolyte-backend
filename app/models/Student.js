/*
 * Represents a Student. Has a one-to-one mapping to the User table (i.e. a
 * student must be a user, but a user does not need to be a student).
 */

const University = require('./University');
const User = require('./User');

module.exports = (sequelize, DataTypes) => sequelize.define('Student', {
  id: {
    primaryKey: true,
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    references: {
      model: User,
      key: 'id',
    },
  },
  university: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    references: {
      model: University,
      key: 'id',
    },
  },
  dietaryReq: DataTypes.STRING,
  photoUrl: DataTypes.STRING,
}, {
  timestamps: true,
});
