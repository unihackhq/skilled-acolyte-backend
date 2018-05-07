/*
 * Represents a UNIHACK event. Contains basic information about the event, such
 * as location, dates and Eventbrite link.
 */
module.exports = (sequelize, DataTypes) => sequelize.define('Event', {
  id: {
    primaryKey: true,
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,

  },
  name: DataTypes.STRING,
  location: DataTypes.STRING,
  startDate: DataTypes.DATE,
  endDate: DataTypes.DATE,
  timezone: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  eventbriteId: {
    type: DataTypes.STRING,
    unique: true,
  },
  eventbriteLink: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  logoUrl: {
    type: DataTypes.STRING(512),
    allowNull: true,
  },
});
