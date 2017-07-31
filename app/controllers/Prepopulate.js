const Joi = require('joi');
const Event = require('../models').Event;
const responses = require('../responses');
const ebService = require('../services/Eventbrite');

// [POST] /prepopulate/event
exports.prepoulateEvent = {
  handler: (req, res) => {
    const payload = req.payload;
    ebService.prepopulateEvent(payload.eventId)
      .then((data) => {
        Event.create(data)
          .then((result) => { res(result); })
          .catch(() => { res(responses.internalError('create', 'event')); });
      })
      .catch((error) => {
        // print essential error info (also the response if it's http error)
        console.log(error.message, error.stack, error.response);
        res(responses.internalError('create', 'event'));
      });
  },
  validate: {
    payload: {
      eventId: Joi.string().required(),
    },
  },
};
