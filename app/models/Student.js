/*
 * Represents a Student. Has a one-to-one mapping to the User table (i.e. a
 * student must be a user, but a user does not need to be a student).
 */
module.exports = (sequelize, DataTypes) => sequelize.define('Student', {
  id: {
    primaryKey: true,
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
  },
  university: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
  },
  dietaryReq: DataTypes.STRING,
  photoUrl: DataTypes.STRING,
}, {
  timestamps: true,
});
