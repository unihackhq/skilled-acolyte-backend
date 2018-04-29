const Joi = require('joi');

const service = require('../services/UserService');
const validator = require('../validators').User;

// [GET] /users
exports.list = {
  handler: async (req, h) => {
    return service.list();
  },
};

// [GET] /users/{id}
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

// [POST] /users
exports.create = {
  handler: async (req, h) => {
    const { payload } = req;
    return service.create(payload);
  },
  validate: {
    payload: validator.payload(true),
  },
};

// [PUT] /users/{id}
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

// [DELETE] /users/{id}
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
