module.exports = (sequelize, DataTypes) => sequelize.define('ScheduleItem', {
  id: {
    primaryKey: true,
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
  },
  name: DataTypes.STRING,
  location: DataTypes.STRING,
  startDate: DataTypes.DATE,
  endDate: DataTypes.DATE,
});
