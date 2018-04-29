const Boom = require('boom');
const { Student, User, Team } = require('../models');

exports.list = async () => {
  return Student.findAll();
};

exports.get = async (id) => {
  const result = await Student.findById(id);
  if (!result) throw Boom.notFound('Could not find the student');
  return result;
};

exports.create = (data) => {
  const createUser = (payload) => {
    const userId = payload.id;
    const userObj = payload.user;

    return new Promise((resolve, reject) => {
      if (userId) {
        return resolve({ id: userId, payload });
      }
      return User.create(userObj)
        .then((result) => {
          const user = result.get({ plain: true });
          return resolve({ id: user.id, payload, user });
        })
        .catch(() => {
          return reject(Boom.internal('Could not create the student (user create failed)'));
        });
    });
  };

  const createStudent = ({ id, payload, user }) => {
    return new Promise((resolve, reject) => {
      payload.id = id;
      return Student.create(payload)
        .then((result) => {
          const student = result.get({ plain: true });
          if (user) {
            student.user = user;
          }
          return resolve(student);
        })
        .catch(() => {
          return reject(Boom.internal('Could not create the student'));
        });
    });
  };

  return createUser(data).then(createStudent);
};

exports.bulkCreate = (payloads, callback) => {
  const results = payloads.map(payload => exports.createStudent(payload));
  return Promise.all(results);
};


exports.update = async (id, payload) => {
  const result = await Student.findById(id);
  if (!result) throw Boom.notFound('Could not find the student');
  return result.updateAttributes(payload);
};

exports.delete = async (id) => {
  const result = await User.findById(id);
  if (!result) throw Boom.notFound('Could not find the student');

  const deactivated = result.updateAttributes({ deactivated: true });
  if (!deactivated) throw Boom.internal('Could not delete the student');

  return {};
};

exports.directory = async () => {
  return Student.findAll({
    include: [{ model: User, as: 'user' }]
  });
};

exports.teams = async (id) => {
  const result = await Student.findById(id);
  if (!result) throw Boom.notFound('Could not find the student');
  return student.getTeams({ joinTableAttributes: ['invited'] });
};

const assignTeam = async (team, studentId) => {
  const results = await team.addMembers(studentId, { invited: false });
  if (results.length === 0) throw Boom.badRequest('The student is already a member of the team');

  return results[0][0];
};

exports.join = async (teamId, studentId) => {
  const team = await Team.findById(teamId);
  if (!team) throw Boom.notFound('Could not find the team');
  const isInvited = await team.hasInvited(studentId)
  if (isInvited) {
    await team.removeInvited(studentId);
    return assignTeam(team, studentId, callback);
  }
  throw Boom.badRequest('The student is not invited to the team');
};

exports.invites = async (id) => {
  const student = Student.findById(id);
  if (!student) throw Boom.notFound('Could not find the student');

  return student.getInvites({ joinTableAttributes: ['invited'] });
};
