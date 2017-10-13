const { Team } = require('../models');
const Errors = require('../errors');

const MODEL_NAME = 'team';

exports.listAll = (callback) => {
  Team.findAll()
    .then(results => callback(null, results))
    .catch(error => callback(error));
};

exports.getTeam = (id, callback) => {
  Team.findById(id)
    .then((result) => {
      if (!result) return callback(Errors.notFound.modelNotFound(MODEL_NAME));
      return callback(null, result);
    })
    .catch(error => callback(error));
};

exports.createTeam = (payload, callback) => {
  Team.create(payload)
    .then(result => callback(null, result))
    .catch(() => callback(Errors.invalid.failedToCreate(MODEL_NAME)));
};

exports.updateTeam = (id, payload, callback) => {
  Team.findById(id)
    .then((team) => {
      if (!team) return callback(Errors.notFound.modelNotFound(MODEL_NAME));
      return team.updateAttributes(payload)
        .then((result) => { callback(null, result); });
    })
    .catch(error => callback(error));
};

exports.deleteTeam = (id, callback) => {
  Team.findById(id)
    .then((team) => {
      if (!team) return callback(Errors.notFound.modelNotFound(MODEL_NAME));
      return team.destroy({ where: { id } })
        .then((result) => {
          if (!result) return callback(Errors.invalid.failedToDelete(MODEL_NAME));
          return callback(null, {
            status: 'SUCCESS',
            message: `Successfully deleted ${MODEL_NAME}`,
          });
        });
    })
    .catch(error => callback(error));
};

exports.getTeamMembers = (id, callback) => {
  Team.findById(id)
    .then((team) => {
      if (!team) return callback(Errors.notFound.modelNotFound(MODEL_NAME));
      return team.getMembers({ joinTableAttributes: [] })
        .then((results) => {
          return callback(null, results);
        });
    })
    .catch(error => callback(error));
};

exports.getTeamMemberInvites = (id, callback) => {
  Team.findById(id)
    .then((team) => {
      if (!team) return callback(Errors.notFound.modelNotFound(MODEL_NAME));
      return team.getInvited({ joinTableAttributes: [] })
        .then((results) => {
          return callback(null, results);
        });
    })
    .catch(error => callback(error));
};

exports.inviteTeamMember = (teamId, studentId, callback) => {
  Team.findById(teamId)
    .then((team) => {
      if (!team) return callback(Errors.notFound.modelNotFound(MODEL_NAME));
      return team.hasMembers(studentId)
        .then((isMember) => {
          if (isMember) {
            return callback(Errors.invalid.alreadyMember());
          }

          return team.addInvited(studentId, { invited: true })
            .then((results) => {
              if (results.length === 0) {
                return callback(Errors.invalid.alreadyInvited());
              }

              const result = results[0][0];
              return callback(null, result);
            })
            .catch(() => {
              return callback(Errors.invalid.failedToCreate(MODEL_NAME));
            });
        });
    });
};
