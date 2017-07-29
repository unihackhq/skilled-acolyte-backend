const Team = require('../models').Team;
const Error = require('../errors');
const Response = require('../responses');

exports.listAll = (callback) => {
  Team.findAll()
    .then(results => callback(null, results))
    .catch(error => callback(error));
};

exports.getTeam = (id, callback) => {
  Team.findbyId(id)
    .then((result) => {
      if (!result) return callback(Error.notFound.modelNotFound('team'));
      return callback(null, result);
    })
    .catch(error => callback(error));
};

exports.createTeam = (payload, callback) => {
  Team.create(payload)
    .then(result => callback(null, result))
    .catch(() => callback(Error.internalError.failedToCreate('team')));
};

exports.updateTeam = (id, payload, callback) => {
  Team.findById(id)
    .then((team) => {
      if (!team) return callback(Error.notFound.modelNotFound('team'));
      return team.updateAttributes(payload)
        .then((result) => { callback(null, result); });
    })
    .catch(error => callback(error));
};

exports.deleteTeam = (id, callback) => {
  Team.findById(id)
    .then((team) => {
      if (!team) return callback(Error.notFound.modelNotFound('team'));
      return team.destroy({ where: { id } })
        .then((result) => {
          if (!result) return callback(Error.internalError.failedToDelete('team'));
          return callback(null, Response.successDelete('team'));
        });
    })
    .catch(error => callback(error));
};
