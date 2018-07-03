const Joi = require('joi');

const service = require('../services/handbook');
const validator = require('../validators/handbook');
const constant = require('../constants');

// [GET] /handbook/{id}
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

// [POST] /handbook
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

// [PUT] /handbook/{id}
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

// [DELETE] /handbook/{id}
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
