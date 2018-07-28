module.exports = (sequelize, DataTypes) => sequelize.define('NotificationSubscription', {
  id: {
    primaryKey: true,
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
  },
  endpoint: {
    type: DataTypes.TEXT,
    unique: true,
  },
  auth: DataTypes.TEXT,
  p256dh: DataTypes.TEXT,
});
