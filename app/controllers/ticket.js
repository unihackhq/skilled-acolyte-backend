const Joi = require('joi');

const service = require('../services/ticket');

// [GET] /tickets
exports.list = {
  handler: async () => {
    return service.list();
  },
};

// [GET] /tickets/{id}
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

// [POST] /tickets/{id}/transfer
exports.transfer = {
  handler: async (req) => {
    const { id } = req.params;
    const { email } = req.payload;
    return service.transfer(id, email);
  },
  validate: {
    payload: {
      email: Joi.string().email(),
    },
    params: {
      id: Joi.string().guid({ version: 'uuidv4' }),
    },
  },
};
