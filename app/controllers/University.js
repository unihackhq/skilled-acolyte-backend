const Joi = require('joi');

const UniversityService = require('../services/UniversityService');
const validators = require('../validators');

// [GET] /universities
exports.list = {
  handler: async (req, h) => {
    return UniversityService.list();
  },
};

// [GET] /universities/{id}
exports.get = {
  handler: async (req, h) => {
    const { id } = req.params;
    return UniversityService.get(id);
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
    return UniversityService.create(payload);
  },
  validate: {
    payload: validators.University.payload(true),
  },
};

// [PUT] /universities/{id}
exports.update = {
  handler: async (req, h) => {
    const { id } = req.params;
    const { payload } = req;
    return UniversityService.update(id, payload);
  },
  validate: {
    payload: validators.University.payload(false),
    params: {
      id: Joi.string().guid({ version: 'uuidv4' }),
    },
  },
};

// [DELETE] /universities/{id}
exports.delete = {
  handler: async (req, h) => {
    const { id } = req.params;
    return UniversityService.delete(id);
  },
  validate: {
    params: {
      id: Joi.string().guid({ version: 'uuidv4' }),
    },
  },
};
