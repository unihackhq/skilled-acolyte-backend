/*
 * Represents Eventbrite Ticket Order, and keeps track if the ticket type, and
 * of its status (transferred, cancelled).
 *
 * Has foregin key relations with Student table: one as an origina.
 */
module.exports = (sequelize, DataTypes) => sequelize.define('Ticket', {
  id: {
    primaryKey: true,
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
  },
  ticketType: DataTypes.STRING,
  transferred: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
  cancelled: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
}, {
  timestamps: true,
});
