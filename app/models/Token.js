const FIFTEEN_MINUTES = 900000; // 15 minutes in ms

module.exports = (sequelize, DataTypes) => sequelize.define('Token', {
  id: {
    primaryKey: true,
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
  },
  userId: DataTypes.UUID,
  valid: { 
    type: DataTypes.BOOLEAN,
    defaultValue: true,
  },
  expiry: {
    type: DataTypes.DATE,
    defaultValue: () => {
      return new Date(Date.now() + FIFTEEN_MINUTES);
    }
  }
}, {
  timestamps: true
});
