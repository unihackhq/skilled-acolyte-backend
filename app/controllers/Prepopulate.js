const Joi = require('joi');
const Errors = require('../errors');
const PrepopulateService = require('../services/PrepopulateService');

// [POST] /prepopulate/event
exports.prepopulateEvent = {
  handler: (req, res) => {
    const { payload } = req;
    PrepopulateService.prepopulateEvent(payload, (err, result) => {
      if (err) return res(Errors.handler(err));
      return res(result);
    });
  },
  validate: {
    payload: {
      eventId: Joi.string().required(),
    },
  },
};

// [POST] /prepopulate/attendees
exports.prepopulateAttendees = {
  handler: (req, res) => {
    const { payload } = req;
    PrepopulateService.prepopulateAttendees(payload, (err, result) => {
      if (err) return res(Errors.handler(err));
      return res(result);
    });
  },
  validate: {
    payload: {
      eventId: Joi.string().required(),
    },
  },
};
