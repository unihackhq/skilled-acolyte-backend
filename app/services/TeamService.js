const { Team } = require('../models');
const Error = require('../errors');
const Response = require('../responses');

const MODEL_NAME = 'team';

exports.listAll = (callback) => {
  Team.findAll()
    .then(results => callback(null, results))
    .catch(error => callback(error));
};

exports.getTeam = (id, callback) => {
  Team.findById(id)
    .then((result) => {
      if (!result) return callback(Error.notFound.modelNotFound(MODEL_NAME));
      return callback(null, result);
    })
    .catch(error => callback(error));
};

exports.createTeam = (payload, callback) => {
  Team.create(payload)
    .then(result => callback(null, result))
    .catch(() => callback(Error.invalid.failedToCreate(MODEL_NAME)));
};

exports.updateTeam = (id, payload, callback) => {
  Team.findById(id)
    .then((team) => {
      if (!team) return callback(Error.notFound.modelNotFound(MODEL_NAME));
      return team.updateAttributes(payload)
        .then((result) => { callback(null, result); });
    })
    .catch(error => callback(error));
};

exports.deleteTeam = (id, callback) => {
  Team.findById(id)
    .then((team) => {
      if (!team) return callback(Error.notFound.modelNotFound(MODEL_NAME));
      return team.destroy({ where: { id } })
        .then((result) => {
          if (!result) return callback(Error.invalid.failedToDelete(MODEL_NAME));
          return callback(null, Response.successDelete(MODEL_NAME));
        });
    })
    .catch(error => callback(error));
};

exports.getTeamMembers = (id, callback) => {
  Team.findById(id)
    .then((team) => {
      if (!team) return callback(Error.notFound.modelNotFound(MODEL_NAME));
      return team.getMembers()
        .then((results) => {
          return callback(null, results);
        });
    })
    .catch(error => callback(error));
};

exports.getTeamMemberInvites = (id, callback) => {
  Team.findById(id)
    .then((team) => {
      if (!team) return callback(Error.notFound.modelNotFound(MODEL_NAME));
      return team.getInvited()
        .then((results) => {
          return callback(null, results);
        });
    })
    .catch(error => callback(error));
};

exports.inviteTeamMember = (teamId, studentId, callback) => {
  Team.findById(teamId)
    .then((team) => {
      if (!team) return callback(Error.notFound.modelNotFound(MODEL_NAME));
      return team.setInvited(studentId, { invited: true })
        .then((result) => {
          const invitedResult = result[0][0];
          if (!invitedResult || invitedResult === 1) {
            return callback(Error.invalid.failedToCreate('invite'));
          }
          return callback(null, invitedResult);
        });
    });
};
