const Joi = require('joi');
const service = require('../services/notification');
const constant = require('../constants');

// [POST] /notification
exports.send = {
  handler: async (req) => {
    const { eventId, title, body } = req.payload;
    await service.manual(eventId, title, body);
    return {};
  },
  validate: {
    payload: {
      eventId: Joi.string().guid({ version: 'uuidv4' }),
      title: Joi.string(),
      body: Joi.string(),
    },
  },
  auth: {
    scope: [constant.adminScope],
  },
};

