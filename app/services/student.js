const Boom = require('boom');
const {
  Student,
  User,
  Team
} = require('../models');

exports.list = async () => {
  return Student.findAll();
};

exports.get = async (id) => {
  const student = await Student.findById(id);
  if (!student) throw Boom.notFound('Could not find the student');
  return student;
};

exports.create = (data) => {
  const createUser = async (payload) => {
    const { id, user: userPayload } = payload;
    if (id && !userPayload) {
      return { id, payload };
    }

    const userInstance = await User.create({ ...userPayload, id });
    const user = userInstance.get({ plain: true });
    return { id: user.id, payload, user };
  };

  const createStudent = async ({ id, payload, user }) => {
    const studentPayload = { id, ...payload };
    const studentInstance = await Student.create(studentPayload);
    const student = studentInstance.get({ plain: true });
    if (user) {
      student.user = user;
    }
    return student;
  };

  return createUser(data).then(createStudent);
};

exports.bulkCreate = (payloads) => {
  const students = payloads.map(payload => exports.create(payload));
  return Promise.all(students);
};


exports.update = async (id, payload) => {
  const student = await Student.findById(id);
  if (!student) throw Boom.notFound('Could not find the student');
  return student.updateAttributes(payload);
};

exports.delete = async (id) => {
  const student = await User.findById(id);
  if (!student) throw Boom.notFound('Could not find the student');

  const deactivated = student.updateAttributes({ deactivated: true });
  if (!deactivated) throw Boom.internal('Could not delete the student');

  return {};
};

exports.directory = async () => {
  return Student.findAll({
    include: [{ model: User, as: 'user' }]
  });
};

exports.teams = async (id) => {
  const student = await Student.findById(id);
  if (!student) throw Boom.notFound('Could not find the student');
  return student.getTeams();
};

exports.invites = async (id) => {
  const student = await Student.findById(id);
  if (!student) throw Boom.notFound('Could not find the student');
  return student.getInvites();
};

exports._join = async (team, studentId) => {
  const added = await team.addMembers(studentId, { invited: false });
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
