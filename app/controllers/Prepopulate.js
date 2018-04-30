const Joi = require('joi');
const PrepopulateService = require('../services/PrepopulateService');

// [POST] /prepopulate/event
exports.event = {
  handler: async (req) => {
    const { eventId } = req.payload;
    return PrepopulateService.event(eventId);
  },
  validate: {
    payload: {
      eventId: Joi.string().required(),
    },
  },
};

// [POST] /prepopulate/attendees
exports.attendees = {
  handler: async (req) => {
    const { eventId } = req.payload;
    return PrepopulateService.attendees(eventId);
  },
  validate: {
    payload: {
      eventId: Joi.string().required(),
    },
  },
};
