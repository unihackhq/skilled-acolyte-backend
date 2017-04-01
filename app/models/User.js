/*
 * Represents a User of the application.
 */
module.exports = (sequelize, DataTypes) => sequelize.define('User', {
  id: {
    primaryKey: true,
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
  },
  firstName: DataTypes.STRING,
  lastName: DataTypes.STRING,
  email: DataTypes.STRING,
  authType: DataTypes.STRING,
  authId: {
    type: DataTypes.BIGINT,
    unique: true,
  },
  photoUrl: DataTypes.STRING,
  accessToken: DataTypes.STRING,
}, {
  timestamps: true,
});
