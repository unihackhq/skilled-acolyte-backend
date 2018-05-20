const _ = require('lodash');

const {
  User,
  Student,
  Ticket,
  Team
} = require('../models');

const populateAdmin = async () => [];

const populateStudent = async (decoded) => {
  const { userId } = decoded;
  const student = await Student.findById(userId, {
    include: [
      { model: Ticket, as: 'tickets' },
      { model: Team, as: 'teams', required: false },
    ]
  });
  if (!student) return false;

  let scope = ['user', 'student', `user-${student.id}`];
  scope = _.concat(scope, student.tickets.map(ticket => `ticket-${ticket.id}`));
  scope = _.concat(scope, student.teams.map(team => `team-${team.id}`));

  return scope;
};

const populateUser = async (decoded) => {
  const { userId } = decoded;
  const user = await User.findById(userId);
  if (!user) return false;

  return ['user', `user-${user.id}`];
};

module.exports = async (decoded) => {
  const { type } = decoded;

  const populateType = {
    admin: populateAdmin,
    user: populateUser,
    student: populateStudent,
  };
  if (!populateType[type]) return { isValid: false };

  const scope = await populateType[type](decoded);
  if (!scope) return { isValid: false };
  scope.push(type);

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
