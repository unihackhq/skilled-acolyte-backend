const Boom = require('boom');
const uuidv4 = require('uuid/v4');
const {
  Student,
  User,
  Team,
  Ticket,
  Event,
  sequelize,
} = require('../models');

exports.list = async () => {
  return Student.findAll({
    include: [{ model: User, as: 'user' }]
  });
};

exports.get = async (id) => {
  const student = await Student.findById(id);
  if (!student) throw Boom.notFound('Could not find the student');
  return student;
};

const createHelper = (payload, include) => {
  const id = payload.id || uuidv4();
  const data = {
    id,
    ...payload,
    user: {
      id,
      type: 'student',
      ...payload.user,
    },
  };
  return sequelize.transaction(t =>
    Student.create(data, { include, transaction: t }));
};

exports.create = async (payload) => {
  const include = [
    { model: Ticket, as: 'tickets' },
    { model: User, as: 'user' },
  ];
  return createHelper(payload, include);
};

exports.createWithoutTicket = async (payload) => {
  const include = [
    { model: Ticket, as: 'tickets' },
    { model: User, as: 'user' },
  ];
  return createHelper(payload, include);
};

exports.update = async (id, payload) => {
  const { user: userPayload, ...studentRawPayload } = payload;
  const studentPayload = {
    // firstLaunch is used for onboarding
    // we need to flip it as soon as user verifies their info
    firstLaunch: false,
    ...studentRawPayload,
  };

  const student = await Student.findById(id);
  if (!student) throw Boom.notFound('Could not find the student');

  return sequelize.transaction(async (t) => {
    await student.user.updateAttributes(userPayload, { transaction: t });
    return student.updateAttributes(studentPayload, { transaction: t });
  });
};

exports.delete = async (id) => {
  const student = await User.findById(id);
  if (!student) throw Boom.notFound('Could not find the student');

  const deactivated = student.updateAttributes({ deactivated: true });
  if (!deactivated) throw Boom.internal('Could not delete the student');

  return {};
};

exports.teams = async (id) => {
  const student = await Student.findById(id);
  if (!student) throw Boom.notFound('Could not find the student');
  return student.getTeams();
};

exports.leaveTeam = async (studentId, teamId) => {
  const team = await Team.findById(teamId);
  if (!team) throw Boom.notFound('Could not find the team');

  const isMember = await team.hasMember(studentId);
  if (!isMember) throw Boom.badRequest('The student is not a member of the team');

  await team.removeMember(studentId);
  return {};
};

exports.invites = async (id) => {
  const student = await Student.findById(id);
  if (!student) throw Boom.notFound('Could not find the student');
  return student.getInvites();
};

exports._join = async (team, studentId, options = {}) => {
  const added = await team.addMembers(studentId, options);
  if (added.length === 0) throw Boom.badRequest('The student is already a member of the team');
  return added[0][0];
};

const _removeInvite = async (studentId, teamId) => {
  const team = await Team.findById(teamId);
  if (!team) throw Boom.notFound('Could not find the team');

  const isInvited = await team.hasInvited(studentId);
  if (!isInvited) throw Boom.badRequest('The student is not invited to the team');

  await team.removeInvited(studentId);
  return team;
};

exports.acceptInvite = async (studentId, teamId) => {
  const team = await _removeInvite(studentId, teamId);
  return exports._join(team, studentId);
};

exports.rejectInvite = async (studentId, teamId) => {
  await _removeInvite(studentId, teamId);
  return {};
};

exports.tickets = async (studentId) => {
  const student = await Student.findById(studentId, {
    include: [{
      model: Ticket,
      as: 'tickets'
    }]
  });
  if (!student) throw Boom.notFound('Could not find the student');
  return student.tickets;
};

exports.events = async (studentId) => {
  const student = await Student.findById(studentId, {
    include: [{
      model: Ticket,
      as: 'tickets',
      include: [{
        model: Event,
        as: 'event'
      }]
    }]
  });
  if (!student) throw Boom.notFound('Could not find the student');
  return student.tickets.map(ticket => ticket.event);
};
