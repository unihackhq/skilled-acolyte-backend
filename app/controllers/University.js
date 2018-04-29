const Joi = require('joi');

const UniversityService = require('../services/UniversityService');
const validators = require('../validators');

// [GET] /universities
exports.getAllUniversities = {
  handler: async (req, h) => {
    return UniversityService.listAll();
  },
};

// [GET] /universities/{id}
exports.getUniversityById = {
  handler: async (req, h) => {
    const { id } = req.params;
    return UniversityService.getUniversity(id);
  },
  validate: {
    params: {
      id: Joi.string().guid({ version: 'uuidv4' }),
    },
  },
};

// [POST] /universities
exports.createUniversity = {
  handler: async (req, h) => {
    const { payload } = req;
    return UniversityService.createUniversity(payload);
  },
  validate: {
    payload: validators.University.payload(true),
  },
};

// [PUT] /universities/{id}
exports.updateUniversityById = {
  handler: async (req, h) => {
    const { id } = req.params;
    const { payload } = req;
    return UniversityService.updateUniversity(id, payload);
  },
  validate: {
    payload: validators.University.payload(false),
    params: {
      id: Joi.string().guid({ version: 'uuidv4' }),
    },
  },
};

// [DELETE] /universities/{id}
exports.deleteUniversityById = {
  handler: async (req, h) => {
    const { id } = req.params;
    return UniversityService.deleteUniversity(id);
  },
  validate: {
    params: {
      id: Joi.string().guid({ version: 'uuidv4' }),
    },
  },
};
