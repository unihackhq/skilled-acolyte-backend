const Joi = require('joi');

const strip = require('../util/strip');
const service = require('../services/schedule');
const validator = require('../validators/schedule');
const constant = require('../constants');

// [GET] /schedule/{id}
exports.get = {
  handler: async (req) => {
    const { scope } = req.auth.credentials;
    const { id } = req.params;

    const item = await service.get(id);
    return strip.schedule(item, scope);
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

// [POST] /schedule
exports.create = {
  handler: async (req) => {
    const { scope } = req.auth.credentials;
    const { payload } = req;

    // accept both arrays and single items
    if (payload instanceof Array) {
      const list = await Promise.all(payload.map(item => service.create(item)));
      return list.map(item => strip.schedule(item, scope));
    }

    const item = await service.create(payload);
    return strip.schedule(item, scope);
  },
  validate: {
    payload: Joi.alternatives().try(
      validator.requiredPayload,
      Joi.array().items(validator.requiredPayload),
    ),
  },
  auth: {
    scope: [constant.adminScope],
  },
};

// [PUT] /schedule/{id}
exports.update = {
  handler: async (req) => {
    const { scope } = req.auth.credentials;
    const { id } = req.params;
    const { payload } = req;

    const item = await service.update(id, payload);
    return strip.schedule(item, scope);
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

// [DELETE] /schedule/{id}
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
