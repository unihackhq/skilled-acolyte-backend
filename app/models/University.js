/*
 * Represents a University
 */
module.exports = (sequelize, DataTypes) => sequelize.define('University', {
  id: {
    primaryKey: true,
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
  },
  name: DataTypes.STRING,
});
