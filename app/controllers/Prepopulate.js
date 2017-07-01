const Joi = require('joi');
const Event = require('../models').Event;
const responses = require('../responses');
const ebService = require('../services/eventbrite');

// [POST] /prepopulate/event
exports.prepoulateEvent = {
  handler: (req, res) => {
    const payload = req.payload;
    ebService.getEvent(payload.eventId)
      .then((data) => {
        Event.create(data)
          .then((result) => { res(result); })
          .catch(() => { res(responses.internalError('create', 'event')); });
      });
  },
  validate: {
    payload: {
      eventId: Joi.string().required().error(new Error('Eventbrite ID required')),
    },
  },
};
