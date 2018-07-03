module.exports = (sequelize, DataTypes) => sequelize.define('ScheduleItem', {
  id: {
    primaryKey: true,
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
  },
  name: DataTypes.STRING,
  description: DataTypes.STRING(1024),
  type: DataTypes.STRING,
  location: DataTypes.STRING,
  startDate: DataTypes.DATE,
  endDate: DataTypes.DATE,
  notificationSent: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
});
