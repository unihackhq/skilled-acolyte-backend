const Joi = require('joi');

const service = require('../services/schedule');
const validator = require('../validators/schedule');
const constant = require('../constants');

// [GET] /schedule/{id}
exports.get = {
  handler: async (req) => {
    const { id } = req.params;
    return service.get(id);
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
    const { payload } = req;

    if (payload instanceof Array) {
      return Promise.all(payload.map(item => service.create(item)));
    }
    return service.create(payload);
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
    const { id } = req.params;
    const { payload } = req;
    return service.update(id, payload);
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
