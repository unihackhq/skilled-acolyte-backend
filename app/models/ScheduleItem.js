module.exports = (sequelize, DataTypes) => sequelize.define('ScheduleItem', {
  id: {
    primaryKey: true,
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
  },
  name: DataTypes.STRING,
  description: DataTypes.TEXT,
  type: DataTypes.ENUM('session', 'techTalk', 'mealsRafflesEtc', 'event'),
  location: DataTypes.STRING,
  startDate: DataTypes.DATE,
  endDate: DataTypes.DATE,
  notificationSent: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
});
