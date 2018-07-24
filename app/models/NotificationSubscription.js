module.exports = (sequelize, DataTypes) => sequelize.define('NotificationSubscription', {
  id: {
    primaryKey: true,
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
  },
  endpoint: {
    type: DataTypes.STRING(1024),
    unique: true,
  },
  auth: DataTypes.STRING(1024),
  p256dh: DataTypes.STRING(1024),
});
