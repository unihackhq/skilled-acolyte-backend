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
  startDate: DataTypes.DATE,
  endDate: DataTypes.DATE,
  eventbriteLink: DataTypes.STRING,
  location: DataTypes.STRING,
  logoUrl: {
    type: DataTypes.STRING(512),
    allowNull: true,
  },
});
