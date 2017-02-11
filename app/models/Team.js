module.exports = (sequelize, DataTypes) => sequelize.define('Team', {
  id: {
    primaryKey: true,
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
  },
  name: DataTypes.STRING,
  description: DataTypes.STRING,
  photoUrl: DataTypes.STRING,
});
