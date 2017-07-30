/*
 * Represents a Student. Has a one-to-one mapping to the User table (i.e. a
 * student must be a user, but a user does not need to be a student).
 */
const User = require('./User');

module.exports = (sequelize, DataTypes) => sequelize.define('Student', {
  id: {
    primaryKey: true,
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
  },
  university: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  studyLevel: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  degree: {
    type: DataTypes.STRING(512),
    allowNull: true,
  },
  dietaryReq: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  medicalReq: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  shirtSize: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  photoUrl: {
    type: DataTypes.STRING(512),
    allowNull: true,
  },
}, {
  timestamps: true,
});
