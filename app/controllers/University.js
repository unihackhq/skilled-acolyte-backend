const Joi = require('joi');

const service = require('../services/UniversityService');
const validator = require('../validators').University;

// [GET] /universities
exports.list = {
  handler: async (req, h) => {
    return service.list();
  },
};

// [GET] /universities/{id}
exports.get = {
  handler: async (req, h) => {
    const { id } = req.params;
    return service.get(id);
  },
  validate: {
    params: {
      id: Joi.string().guid({ version: 'uuidv4' }),
    },
  },
};

// [POST] /universities
exports.create = {
  handler: async (req, h) => {
    const { payload } = req;
    return service.create(payload);
  },
  validate: {
    payload: validator.payload(true),
  },
};

// [PUT] /universities/{id}
exports.update = {
  handler: async (req, h) => {
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

// [DELETE] /universities/{id}
exports.delete = {
  handler: async (req, h) => {
    const { id } = req.params;
    return service.delete(id);
  },
  validate: {
    params: {
      id: Joi.string().guid({ version: 'uuidv4' }),
    },
  },
};
