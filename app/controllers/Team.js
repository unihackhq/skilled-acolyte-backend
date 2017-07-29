const Joi = require('joi');

const TeamService = require('../services/TeamService');
const SkilledError = require('../errors');
const validators = require('../validators');

// [GET] /team
exports.getAllTeams = {
  handler: (req, res) => {
    TeamService.listAll((err, results) => {
      if (err) return res(SkilledError.handler(err));
      return res({ status: 'Success', results });
    });
  },
};

// [GET] /team/{id}
exports.getTeamById = {
  handler: (req, res) => {
    const id = req.params.id;
    TeamService.getTeam(id, (err, result) => {
      if (err) return res(SkilledError.handler(err));
      return res({ result });
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
    TeamService.createTeam(payload, (err, result) => {
      if (err) return res(SkilledError.handler(err));
      return res(result);
    });
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
    TeamService.updateTeam(id, payload, (err, result) => {
      if (err) return res(SkilledError.handler(err));
      return res(result);
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
    TeamService.deleteTeam(id, (err, result) => {
      if (err) return res(SkilledError.handler(err));
      return res(result);
    });
  },
  validate: {
    payload: validators.Team.payload,
    params: {
      id: Joi.string().guid({ version: 'uuidv4' }).error(new Error('Not a valid id')),
    },
  },
};
