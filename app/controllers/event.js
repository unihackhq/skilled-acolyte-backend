const Joi = require('joi');

const service = require('../services/event');
const validator = require('../validators/event');
const constant = require('../constants');

// [GET] /events
exports.list = {
  handler: async () => {
    return service.list();
  },
  auth: {
    scope: [constant.adminScope],
  },
};

// [GET] /events/{id}
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

// [POST] /events
exports.create = {
  handler: async (req) => {
    const { payload } = req;
    return service.create(payload);
  },
  validate: {
    payload: validator.requiredPayload,
  },
  auth: {
    scope: [constant.adminScope],
  },
};

// [PUT] /events/{id}
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

// [DELETE] /events/{id}
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
