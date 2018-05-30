const Joi = require('joi');
const service = require('../services/prepopulate');

// [POST] /prepopulate/event
exports.event = {
  handler: async (req) => {
    const { eventId } = req.payload;
    return service.event(eventId);
  },
  validate: {
    payload: {
      eventId: Joi.string().required(),
    },
  },
  auth: {
    scope: ['admin'],
  },
};

// [POST] /prepopulate/attendees
exports.attendees = {
  handler: async (req) => {
    const { eventId, questions } = req.payload;
    return service.attendees(eventId, questions);
  },
  validate: {
    payload: {
      eventId: Joi.string().required(),
      questions: Joi.object().keys({
        uni: Joi.string(),
        studyLevel: Joi.string(),
        degree: Joi.string(),
        shirtSize: Joi.string(),
        dietaryReq: Joi.string(),
        medicalReq: Joi.string(),
      }),
    },
  },
  auth: {
    scope: ['admin'],
  },
};
