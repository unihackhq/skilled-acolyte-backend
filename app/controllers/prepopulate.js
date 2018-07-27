const Joi = require('joi');

const service = require('../services/prepopulate');
const constant = require('../constants');

// [POST] /prepopulate/event
exports.event = {
  handler: async (req) => {
    const { eventId, ...data } = req.payload;
    return service.event(eventId, data);
  },
  validate: {
    payload: {
      eventId: Joi.string().required(),
      handbookUrl: Joi.string().uri(),
      logoColor: Joi.string(),
      sponsors: Joi.object().keys({
        summary: Joi.string(),
        url: Joi.string().uri(),
      }),
      prizes: Joi.object().keys({
        summary: Joi.string(),
        url: Joi.string().uri(),
      }),
      judges: Joi.object().keys({
        summary: Joi.string(),
        url: Joi.string().uri(),
      }),
    },
  },
  auth: {
    scope: [constant.adminScope],
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
      }),
    },
  },
  auth: {
    scope: [constant.adminScope],
  },
};
