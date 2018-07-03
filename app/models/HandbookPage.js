module.exports = (sequelize, DataTypes) => sequelize.define('HandbookPage', {
  id: {
    primaryKey: true,
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
  },
  name: DataTypes.STRING,
  path: DataTypes.STRING,
  content: DataTypes.STRING,
});
