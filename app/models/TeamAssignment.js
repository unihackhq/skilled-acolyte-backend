/*
 * Represents a Team. A team is associated to an event, and contains many users.
 */
module.exports = (sequelize, DataTypes) => sequelize.define('TeamAssignment', {
  studentId: {
    primaryKey: true,
    type: DataTypes.UUID,
  },
  teamId: {
    primaryKey: true,
    type: DataTypes.UUID,
  },
  // If invited is set to false, this has been confirmed by the user. Otherwise if
  // set to true, then the person shouldn't show up in the team listing. If
  // blank, user is not part of the team.
  invited: DataTypes.BOOLEAN,
});
