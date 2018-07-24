const _ = require('lodash');

const {
  User,
  Student,
  Ticket,
  Team,
  NotificationSubscription,
} = require('../models');
const constant = require('../constants');

const populateAdmin = async () => [constant.adminScope];

const populateStudent = async (decoded) => {
  const { userId } = decoded;
  const student = await Student.findById(userId, {
    include: [
      { model: Ticket, as: 'tickets' },
      { model: Team, as: 'teams', required: false },
      { model: NotificationSubscription, as: 'notificationSubscriptions', required: false },
    ]
  });
  if (!student) return false;

  let scope = [constant.userScope, constant.studentScope, `${constant.userScope}-${student.id}`];
  scope = _.concat(scope, student.tickets.map(ticket => `${constant.ticketScope}-${ticket.id}`));
  scope = _.concat(scope, student.tickets.map(ticket => `${constant.eventScope}-${ticket.eventId}`));
  scope = _.concat(scope, student.teams.map(team => `${constant.teamScope}-${team.id}`));
  scope = _.concat(scope, student.notificationSubscriptions.map(sub => `${constant.subscriptionScope}-${sub.id}`));

  return scope;
};

const populateUser = async (decoded) => {
  const { userId } = decoded;
  const user = await User.findById(userId);
  if (!user) return false;

  return [constant.userScope, `${constant.userScope}-${user.id}`];
};

module.exports = async (decoded) => {
  const { type } = decoded;

  const populateType = {
    [constant.adminType]: populateAdmin,
    [constant.userType]: populateUser,
    [constant.studentType]: populateStudent,
  };
  if (!populateType[type]) return { isValid: false };

  const scope = await populateType[type](decoded);
  if (!scope) return { isValid: false };

  const id = decoded.userId || '';

  return {
    isValid: true,
    credentials: {
      id,
      type,
      scope
    }
  };
};
