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
  preferredName: DataTypes.STRING,
  email: DataTypes.STRING(512),
  authType: DataTypes.STRING,
  dateOfBirth: DataTypes.DATEONLY,
  gender: DataTypes.STRING,
  mobile: DataTypes.STRING,

  // Authentication Information
  authId: {
    type: DataTypes.BIGINT,
    unique: true,
  },
  accessToken: DataTypes.STRING,

  // We do not delete accounts for data integrity. We deactivate accounts if no
  // longer used.
  deactivated: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
}, {
  timestamps: true,
});
