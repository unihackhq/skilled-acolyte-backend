/*
 * Represents a Team. A team is associated to an event, and contains many users.
 */
module.exports = (sequelize, DataTypes) => sequelize.define('Team', {
  id: {
    primaryKey: true,
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
  },
  name: DataTypes.STRING,
  shortDescription: DataTypes.STRING,
  devpostLink: DataTypes.STRING,
  stack: DataTypes.STRING,
  longDescription: DataTypes.STRING,
  photoUrl: DataTypes.TEXT,
});
