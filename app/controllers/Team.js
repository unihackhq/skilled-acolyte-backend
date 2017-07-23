const Joi = require('joi');

const Team = require('../models').Team;
const validators = require('../validators');
const responses = require('../responses');

// [GET] /team
exports.getAllTeams = {
  handler: (req, res) => {
    Team.findAll()
      .then((result) => {
        res({
          status: 'Success',
          data: result,
        });
      });
  },
};

// [GET] /team/{id}
exports.getTeamById = {
  handler: (req, res) => {
    const id = req.params.id;

    Team.findById(id)
      .then((result) => {
        if (!result) {
          return res(responses.notFound('team'));
        }
        return res(result);
      });
  },
  validate: {
    params: {
      id: Joi.string().guid({ version: 'uuidv4' }).error(new Error('Not a valid id')),
    },
  },
};

// [POST] /team
exports.createTeam = {
  handler: (req, res) => {
    const payload = req.payload;
    return Team.create(payload)
      .then((result) => { res(result); })
      .catch(() => { res(responses.internalError('create', 'team')); });
  },
  validate: {
    payload: validators.Team.payload,
  },
};

// [PUT] /team/{id}
exports.updateTeamById = {
  handler: (req, res) => {
    const id = req.params.id;
    const payload = req.payload;

    Team.findById(id)
      .then((team) => {
        if (!team) {
          return res(responses.notFound('team'));
        }

        return team.updateAttributes(payload)
          .then((result) => { res(result); });
      });
  },
  validate: {
    payload: validators.Team.payload,
    params: {
      id: Joi.string().guid({ version: 'uuidv4' }).error(new Error('Not a valid id')),
    },
  },
};

// [DELETE] /team/{id}
exports.deleteTeamById = {
  handler: (req, res) => {
    const id = req.params.id;

    Team.findById(id)
      .then((team) => {
        if (!team) {
          return res(responses.notFound('team'));
        }

        return team.destroy({
          where: { id },
        }).then((result) => {
          if (!result) {
            return res(responses.internalError('delete', 'team'));
          }

          return res(responses.successDelete('team'));
        });
      });
  },
  validate: {
    payload: validators.Team.payload,
    params: {
      id: Joi.string().guid({ version: 'uuidv4' }).error(new Error('Not a valid id')),
    },
  },
};
