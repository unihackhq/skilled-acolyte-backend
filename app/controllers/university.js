const Joi = require('joi');

const strip = require('../util/strip');
const service = require('../services/university');
const validator = require('../validators/university');
const constant = require('../constants');

// [GET] /universities
exports.list = {
  handler: async (req) => {
    const { scope } = req.auth.credentials;

    const list = await service.list();
    return list.map(uni => strip.university(uni, scope));
  },
  auth: {
    scope: [constant.adminScope, constant.studentScope],
  },
};

// [GET] /universities/{id}
exports.get = {
  handler: async (req) => {
    const { scope } = req.auth.credentials;
    const { id } = req.params;

    const uni = await service.get(id);
    return strip.university(uni, scope);
  },
  validate: {
    params: {
      id: Joi.string().guid({ version: 'uuidv4' }),
    },
  },
  auth: {
    scope: [constant.adminScope, constant.studentScope],
  },
};

// [POST] /universities
exports.create = {
  handler: async (req) => {
    const { scope } = req.auth.credentials;
    const { payload } = req;

    const uni = await service.create(payload);
    return strip.university(uni, scope);
  },
  validate: {
    payload: validator.requiredPayload,
  },
  auth: {
    scope: [constant.adminScope],
  },
};

// [PUT] /universities/{id}
exports.update = {
  handler: async (req) => {
    const { scope } = req.auth.credentials;
    const { id } = req.params;
    const { payload } = req;

    const uni = await service.update(id, payload);
    return strip.university(uni, scope);
  },
  validate: {
    payload: validator.payload,
    params: {
      id: Joi.string().guid({ version: 'uuidv4' }),
    },
  },
  auth: {
    scope: [constant.adminScope],
  },
};

// [DELETE] /universities/{id}
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
