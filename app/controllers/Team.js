const Joi = require('joi');

const TeamService = require('../services/TeamService');
const Errors = require('../errors');
const validators = require('../validators');

// [GET] /teams
exports.getAllTeams = {
  handler: (req, res) => {
    TeamService.listAll((err, results) => {
      if (err) return res(Errors.handler(err));
      return res({ status: 'Success', results });
    });
  },
};

// [GET] /teams/{id}
exports.getTeamById = {
  handler: (req, res) => {
    const id = req.params.id;
    TeamService.getTeam(id, (err, result) => {
      if (err) return res(Errors.handler(err));
      return res(result);
    });
  },
  validate: {
    params: {
      id: Joi.string().guid({ version: 'uuidv4' }),
    },
  },
};

// [POST] /teams
exports.createTeam = {
  handler: (req, res) => {
    const payload = req.payload;
    TeamService.createTeam(payload, (err, result) => {
      if (err) return res(Errors.handler(err));
      return res(result);
    });
  },
  validate: {
    payload: validators.Team.payload(true),
  },
};

// [PUT] /teams/{id}
exports.updateTeamById = {
  handler: (req, res) => {
    const id = req.params.id;
    const payload = req.payload;
    TeamService.updateTeam(id, payload, (err, result) => {
      if (err) return res(Errors.handler(err));
      return res(result);
    });
  },
  validate: {
    payload: validators.Team.payload(false),
    params: {
      id: Joi.string().guid({ version: 'uuidv4' }),
    },
  },
};

// [DELETE] /teams/{id}
exports.deleteTeamById = {
  handler: (req, res) => {
    const id = req.params.id;
    TeamService.deleteTeam(id, (err, result) => {
      if (err) return res(Errors.handler(err));
      return res(result);
    });
  },
  validate: {
    params: {
      id: Joi.string().guid({ version: 'uuidv4' }),
    },
  },
};

// [GET] /teams/{id}/people
exports.getTeamMembers = {
  handler: (req, res) => {
    const id = req.params.id;
    TeamService.getTeamMembers(id, (err, result) => {
      if (err) return res(Errors.handler(err));
      return res(result);
    });
  },
  validate: {
    params: {
      id: Joi.string().guid({ version: 'uuidv4' }),
    },
  },
};

// [GET] /teams/{id}/invites
exports.getTeamInvitesById = {
  handler: (req, res) => {
    const id = req.params.id;
    TeamService.getTeamMemberInvites(id, (err, result) => {
      if (err) return res(Errors.handler(err));
      return res(result);
    });
  },
  validate: {
    params: {
      id: Joi.string().guid({ version: 'uuidv4' }),
    },
  },
};

// [POST] /teams/{id}/invites
exports.createTeamInvite = {
  handler: (req, res) => {
    const id = req.params.id;
    const userId = req.payload.userId;
    TeamService.inviteTeamMember(id, userId, (err, result) => {
      if (err) return res(Errors.handler(err));
      return res(result);
    });
  },
  validate: {
    payload: {
      userId: Joi.string().guid({ version: 'uuidv4' }).required(),
    },
    params: {
      id: Joi.string().guid({ version: 'uuidv4' }),
    },
  },
};
