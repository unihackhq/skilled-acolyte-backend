const Boom = require('boom');
const { Team, Student, sequelize } = require('../models');
const studentService = require('./student');

exports.list = async () => {
  return Team.findAll();
};

exports.get = async (id) => {
  const team = await Team.findById(id, {
    include: [
      { as: 'members', model: Student },
      { as: 'invited', model: Student },
    ]
  });
  if (!team) throw Boom.notFound('Could not find the team');
  return team;
};

exports.createAndJoin = async (studentIds, payload) => {
  return sequelize.transaction(async (t) => {
    const team = await Team.create(payload, { transaction: t });

    const addingMembers = studentIds.map(studentId =>
      studentService._join(team, studentId, { transaction: t }));
    const members = await Promise.all(addingMembers);

    // this is necessary so ...team doesn't pull in sequelize shit
    const teamData = team.get({ plain: true });
    return { ...teamData, members };
  });
};

exports.create = async (payload) => {
  return Team.create(payload);
};

exports.update = async (id, payload) => {
  const team = await Team.findById(id);
  if (!team) throw Boom.notFound('Could not find the team');
  return team.updateAttributes(payload);
};

exports.delete = async (id) => {
  const team = await Team.findById(id);
  if (!team) throw Boom.notFound('Could not find the team');

  const deleted = await team.destroy({ where: { id } });
  if (!deleted) throw Boom.internal('Could not delete the team');

  return {};
};

exports.invite = async (teamId, studentId) => {
  const team = await Team.findById(teamId);
  if (!team) throw Boom.notFound('Could not find the team');

  const isMember = await team.hasMembers(studentId);
  if (isMember) throw Boom.badRequest('The student is already invited to the team');

  const invited = await team.addInvited(studentId);
  if (invited.length === 0) throw Boom.badRequest('The student is already invited to the team');

  return invited[0][0];
};
