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
  dateOfBirth: DataTypes.DATEONLY,
  gender: DataTypes.STRING,
  mobile: DataTypes.STRING,

  // We do not delete accounts for data integrity. We deactivate accounts if no
  // longer used.
  deactivated: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
}, {
  timestamps: true,
});
