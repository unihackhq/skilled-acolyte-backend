const Joi = require('joi');

const strip = require('../util/strip');
const service = require('../services/user');
const validator = require('../validators/user');
const constant = require('../constants');

// [GET] /users
exports.list = {
  handler: async (req) => {
    const { scope } = req.auth.credentials;

    const list = await service.list();
    return list.map(user => strip.user(user, scope));
  },
  auth: {
    scope: [constant.adminScope],
  },
};

// [GET] /users/{id}
exports.get = {
  handler: async (req) => {
    const { scope } = req.auth.credentials;
    const { id } = req.params;

    const user = await service.get(id);
    return strip.user(user, scope);
  },
  validate: {
    params: {
      id: Joi.string().guid({ version: 'uuidv4' }),
    },
  },
  auth: {
    scope: [constant.adminScope, `${constant.userScope}-{params.id}`],
  },
};

// [POST] /users
exports.create = {
  handler: async (req) => {
    const { scope } = req.auth.credentials;
    const { payload } = req;

    const user = await service.create(payload);
    return strip.user(user, scope);
  },
  validate: {
    payload: validator.requiredPayload,
  },
  auth: {
    scope: [constant.adminScope],
  },
};

// [PUT] /users/{id}
exports.update = {
  handler: async (req) => {
    const { scope } = req.auth.credentials;
    const { id } = req.params;
    const { payload } = req;

    const user = await service.update(id, payload);
    return strip.user(user, scope);
  },
  validate: {
    payload: validator.payload,
    params: {
      id: Joi.string().guid({ version: 'uuidv4' }),
    },
  },
  auth: {
    scope: [constant.adminScope, `${constant.userScope}-{params.id}`],
  },
};

// [DELETE] /users/{id}
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
