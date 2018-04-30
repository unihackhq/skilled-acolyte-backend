const Joi = require('joi');

const service = require('../services/event');
const validator = require('../validators/event');

// [GET] /events
exports.list = {
  handler: async () => {
    return service.list();
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
};

// [POST] /events
exports.create = {
  handler: async (req) => {
    const { payload } = req;
    return service.create(payload);
  },
  validate: {
    payload: validator.payload(true),
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
    payload: validator.payload(false),
    params: {
      id: Joi.string().guid({ version: 'uuidv4' }),
    },
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
};
