const Joi = require('joi');

const strip = require('../util/strip');
const service = require('../services/team');
const validator = require('../validators/team');
const constant = require('../constants');

// [GET] /teams
exports.list = {
  handler: async (req) => {
    const { scope } = req.auth.credentials;

    const list = await service.list();
    return list.map(team => strip.team(team, scope));
  },
  auth: {
    scope: [constant.adminScope],
  },
};

// [GET] /teams/{id}
exports.get = {
  handler: async (req) => {
    const { scope } = req.auth.credentials;
    const { id } = req.params;

    const team = await service.get(id);
    return strip.team(team, scope);
  },
  validate: {
    params: {
      id: Joi.string().guid({ version: 'uuidv4' }),
    },
  },
  auth: {
    scope: [constant.adminScope, `${constant.teamScope}-{params.id}`],
  },
};

// [POST] /teams
exports.create = {
  handler: async (req) => {
    const { scope } = req.auth.credentials;
    const { type, id } = req.auth.credentials;
    const { addMembers, ...payload } = req.payload;

    // add student's own id
    if (type === constant.studentType) {
      addMembers.push(id);
    }

    let team;
    // create and add members
    if (addMembers.length > 0) {
      team = await service.createAndJoin(addMembers, payload);
    } else {
      team = await service.create(payload);
    }

    return strip.team(team, scope);
  },
  validate: {
    payload: {
      addMembers: Joi.array().items(Joi.string().guid({ version: 'uuidv4' })).default([]),
      ...validator.requiredPayload,
    }
  },
  auth: {
    scope: [constant.adminScope, constant.studentScope],
  },
};

// [PUT] /teams/{id}
exports.update = {
  handler: async (req) => {
    const { scope } = req.auth.credentials;
    const { id } = req.params;
    const { payload } = req;

    const team = await service.update(id, payload);
    return strip.team(team, scope);
  },
  validate: {
    payload: validator.payload,
    params: {
      id: Joi.string().guid({ version: 'uuidv4' }),
    },
  },
  auth: {
    scope: [constant.adminScope, `${constant.teamScope}-{params.id}`],
  },
};

// [DELETE] /teams/{id}
exports.delete = {
  handler: async (req) => {
    const { id } = req.params;
    return service.delete(id);
  },
  validate: {
    params: {
      id: Joi.string().guid({ version: 'uuidv4' }),
    },
  },
  auth: {
    scope: [constant.adminScope],
  },
};

// [POST] /teams/{id}/invites
exports.invite = {
  handler: async (req) => {
    const { id } = req.params;
    const { userId } = req.payload;

    return service.invite(id, userId);
  },
  validate: {
    payload: {
      userId: Joi.string().guid({ version: 'uuidv4' }).required(),
    },
    params: {
      id: Joi.string().guid({ version: 'uuidv4' }),
    },
  },
  auth: {
    scope: [constant.adminScope, `${constant.teamScope}-{params.id}`],
  },
};
