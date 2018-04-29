const Boom = require('boom');
const { Team } = require('../models');

exports.list = async () => {
  return Team.findAll();
};

exports.get = async (id) => {
  const result = await Team.findById(id);
  if (!result) throw Boom.notFound('Could not find the team');
  return result;
};

exports.create = async (payload) => {
  try {
    const result = await Team.create(payload);
    return result;
  } catch (err) {
    throw Boom.internal('Could not create the team');
  }
};

exports.update = async (id, payload) => {
  const result = await Team.findById(id);
  if (!result) throw Boom.notFound('Could not find the team');
  return result.updateAttributes(payload);
};

exports.delete = async (id) => {
  const result = await Team.findById(id);
  if (!result) throw Boom.notFound('Could not find the team');

  const deleted = await result.destroy({ where: { id } });
  if (!deleted) throw Boom.internal('Could not delete the team');

  return {};
};

exports.members = async (id) => {
  const team = await Team.findById(id);
  if (!team) throw Boom.notFound('Could not find the team');
  return team.getMembers({ joinTableAttributes: [] });
};

exports.invites = async (id) => {
  const team = await Team.findById(id);
  if (!team) throw Boom.notFound('Could not find the team');
  return team.getInvited({ joinTableAttributes: [] });
};

exports.invite = async (teamId, studentId) => {
  const team = await Team.findById(teamId);
  if (!team) return callback(Errors.notFound.modelNotFound(MODEL_NAME));

  const isMember = await team.hasMembers(studentId);
  if (isMember) throw Boom.badRequest('The student is already invited to the team');

  const results = await team.addInvited(studentId, { invited: true });
  if (results.length === 0) throw Boom.badRequest('The student is already invited to the team');

  return results[0][0];
};
